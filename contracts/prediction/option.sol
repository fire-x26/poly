//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./proxyTarget.sol";

contract Option is ProxyTarget,Ownable{

    // Mapping to store all order details for each condition
    mapping(string => uint256[]) public payoutNumerators;

    // Mapping to track the total bet amount for each condition
    mapping(string => uint256) public totalAmountBet;

    // Mapping to store the winner's address for each condition
    mapping(string => address) public payoutPosition;

    mapping(string => uint256) public optionStatus;

    address public casinoChips; 
    address public feeTo; 
    uint256 public _feeAmount;

    // Struct to store the bet amount and the potential win for each condition
    struct conditionInfo {
        uint256 amount;
        uint256 toWin;
    }

    event ConditionPreparation(
        string indexed conditionId,
        uint outcomeSlotCount
    );
    event ConditionPlace(
        string indexed conditionId,
        uint256 indexed position,
        uint256 amount
    );
    event ConditionPayout(
        string indexed conditionId,
        uint256 indexed position,
        address payoutAddress
    );
    event optionCanceled(
         string indexed conditionId
    );
    event casinoChipsChanged(
        address olderToken,
        address newToken
    );
    event feeAmountChanged(
        uint256 feeAmount
    );
    event feeReceiverChanged(
        address olderReceiver,
        address newReceiver
    );

    error UnauthorizedAccount(address account);

    function initialize(address token, address _feeTo) public  forceInitializeFromProxy {
        initializeOwner();
        casinoChips = token;
        feeTo = _feeTo;
    }

    // get the total bet amount, individual bet amounts, and odds for a specific condition
    function getOrderInfo(string calldata conditionId) public view returns( uint256 total , conditionInfo[] memory details){
        total = totalAmountBet[conditionId];
        uint256[] memory betDetail = payoutNumerators[conditionId];
        details = new conditionInfo[](betDetail.length);

        // Calculate the odds for each option.
        for (uint256 i = 0; i < betDetail.length; i++){
            if(betDetail[i] != 0){
                details[i].amount = betDetail[i];
                details[i].toWin  = total * 1e6 / betDetail[i]; 
            }
        }
        return (total,details);
    }

    function prepareCondition(string calldata conditionId, uint outcomeSlotCount) external onlyOwner{
        require(outcomeSlotCount <= 256, "too many outcome slots");
        require(outcomeSlotCount > 1, "there should be more than one outcome slot");
        require(payoutNumerators[conditionId].length == 0 && optionStatus[conditionId] == 0, "condition already prepared");

        optionStatus[conditionId] = 1;
        payoutNumerators[conditionId] = new uint[](outcomeSlotCount);

        emit ConditionPreparation(conditionId, outcomeSlotCount);
    }

    // place a bet on a specific condition (from a KYC-approved address)
    function placeOrder(string calldata conditionId,uint256 position ,uint256 amount) external onlyOwner{
        require( optionStatus[conditionId] == 1,"not prepared");
        require(IERC20(casinoChips).balanceOf(_owner) >= amount, "Insufficient token balance");
        require(IERC20(casinoChips).transferFrom(_owner,address(this), amount), "Token transfer failed");
        // Increase the total bet amount for this condition
        totalAmountBet[conditionId] += amount;
        // Increase the individual bet amount for the chosen position
        payoutNumerators[conditionId][position] += amount;
        emit ConditionPlace(conditionId,position,amount);
    }
    
    // report the payout position (winner's address) for a specific condition
    function reportPayouts(string calldata conditionId,uint256 position) external onlyOwner{
        require(payoutNumerators[conditionId].length != 0 && optionStatus[conditionId] == 1, "condition not prepared");
        optionStatus[conditionId] = 2;

        payoutPosition[conditionId] =_owner;
        _redeemPositions(conditionId,_owner,position);
    }
    // handle the payout redemption, distributing the bet amounts
    function _redeemPositions(string calldata conditionId,address winer,uint256 position) internal {
        
        uint256 feeAmount = totalAmountBet[conditionId] * _feeAmount / 100;
        uint256 remainingAmount = totalAmountBet[conditionId] - feeAmount;
        // Transfer the fee (5%) to the feeTo address
        require(IERC20(casinoChips).transfer(feeTo, feeAmount), "Fee transfer failed");
        
        // Transfer the remaining amount to the winner
        require(IERC20(casinoChips).transfer(winer, remainingAmount), "Withdraw transfer failed");
        emit ConditionPayout(conditionId,position,winer);
    }   
    // Cancellation means that the corresponding subject's final outcome is deemed a draw.
    function cancelOption(string calldata conditionId) external onlyOwner{
        require(optionStatus[conditionId] == 1, "condition not prepared");
        optionStatus[conditionId] = 3;

        uint256 totalBet = totalAmountBet[conditionId];
        require(IERC20(casinoChips).transfer(feeTo, totalBet), "Transfer failed");
        emit optionCanceled(conditionId);
    }

// --------------- config setter Function --------------------------
    function setFeeAmount(uint256 _fee) external onlyOwner{
        require(_fee >= 0,"Fee cannot be less than 0");

        _feeAmount = _fee;
    }   
    
    function setCasinoChips(address _newTokenAddr) external onlyOwner{
        require(_newTokenAddr != address(0), "Invalid address: zero address");

        address oldToken = casinoChips;
        casinoChips = _newTokenAddr;
        emit feeReceiverChanged(oldToken, _newTokenAddr);
    }

    function changeFeeReceiver(address _newFeeReceiver) external onlyOwner {
        // Ensure the new fee receiver address is not the zero address
        require(_newFeeReceiver != address(0), "Invalid address: zero address");

        address oldFeeReceiver = feeTo;
        feeTo = _newFeeReceiver;

        // Emit event to log the change of fee receiver
        emit feeReceiverChanged(oldFeeReceiver, _newFeeReceiver);
    }

 }
