// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./proxyTarget.sol";
//升级为代理
//erc20Permit,省去一次链上调用
contract Poly is ProxyTarget,OwnableUpgradeable{

    //存储所有订单
    mapping(string => uint256[]) public payoutNumerators;
    //订单对应的可投票地址
    // mapping(string => mapping(address => bool)) IsKYCAddress;
    mapping(string => address[])  public KYCAddress;
    //订单总下注金额记录
    mapping(string => uint256) public totalAmountBet;
    //订单结果设定
    mapping(string => address) public payoutPosition;


    address public casinoChips; 
    address public feeTo; 

    struct conditionInfo {
        uint256 amount;
        uint256 toWin;
    }

    event ConditionPreparation(
        string indexed conditionId,
        uint outcomeSlotCount
    );

    error UnauthorizedAccount(address account);

    // 在构造函数中计算并存储哈希
    // constructor(address initialOwner,address token,address _feeTo) Ownable(initialOwner) {
    //     casinoChips = token;
    //     feeTo = _feeTo;
    // }
    function initialize(address initialOwner, address token, address _feeTo) public initializer forceInitializeFromProxy {
        __Ownable_init(initialOwner);
        casinoChips = token;
        feeTo = _feeTo;
    }

    // modifier onlyKYCAddress(string calldata conditionId){
    //     if (IsKYCAddress[conditionId][msg.sender] == false){
    //         revert UnauthorizedAccount(msg.sender);
    //     }
    //     _;
    // }

    function prepareCondition(string calldata conditionId, uint outcomeSlotCount) external {
        require(outcomeSlotCount <= 256, "too many outcome slots");
        require(outcomeSlotCount > 1, "there should be more than one outcome slot");
        require(payoutNumerators[conditionId].length == 0, "condition already prepared");

        payoutNumerators[conditionId] = new uint[](outcomeSlotCount);
        emit ConditionPreparation(conditionId, outcomeSlotCount);
    }

    // function addKYCAddress(string calldata conditonId,address[] calldata  _addrs) external onlyOwner{
    //     require(_addrs.length == payoutNumerators[conditonId].length);
    //     for(uint256 i =0;i < _addrs.length;i++){
    //         IsKYCAddress[conditonId][msg.sender] = true;
    //     }
    // }
    function addKYCAddress(string calldata conditonId,address[] calldata  _addrs) external onlyOwner{
        require(_addrs.length == payoutNumerators[conditonId].length);
        KYCAddress[conditonId] = _addrs;
    }

    function reportPayouts(string calldata conditionId,address position) external onlyOwner{
        require(payoutNumerators[conditionId].length != 0, "condition not prepared");

        payoutPosition[conditionId] = position;
    }

    function redeemPositions(string calldata conditionId) external {
        require(msg.sender == payoutPosition[conditionId]);
        
        uint256 feeAmount = totalAmountBet[conditionId] * 5 / 100;
        uint256 remainingAmount = totalAmountBet[conditionId] - feeAmount;
        // 将 5% 的手续费转账至_feeTo
        require(IERC20(casinoChips).transfer(feeTo, feeAmount), "Fee transfer failed");
        
        // 将剩余的金额转账至调用者地址
        require(IERC20(casinoChips).transfer(msg.sender, remainingAmount), "Withdraw transfer failed");
    }   

    function placeOrder(string calldata conditionId,uint256 position ,uint256 amount) external{
        //一个地址下一边
        require(msg.sender == KYCAddress[conditionId][position]);
        require(IERC20(casinoChips).balanceOf(msg.sender) >= amount, "Insufficient token balance");
        require(IERC20(casinoChips).transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        
        //总订单金额增加
        totalAmountBet[conditionId] += amount;
        //单边下注额增加
        payoutNumerators[conditionId][position] += amount;
    }

    //总下注额，各个单边下注额，赔率
    function getOrderiInfo(string calldata conditionId) public view returns( uint256 total , conditionInfo[] memory details){
        total = totalAmountBet[conditionId];
        uint256[] memory betDetail = payoutNumerators[conditionId];
        details = new conditionInfo[](betDetail.length);

        for (uint256 i = 0; i < betDetail.length; i++){
            if(betDetail[i] != 0){
                details[i].amount = betDetail[i];
                details[i].toWin  = total * 1e6 / betDetail[i]; 
            }
        }
        return (total,details);
    }
 }
