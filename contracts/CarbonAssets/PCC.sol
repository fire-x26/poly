// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token/CAToken.sol";

contract PCC is CAToken{

    // CDC contract address
    address public _CDC; 
    // CCT contract address
    address public _CCT;

    //This ratio is used to represent how many CCTs each PCC can be turned into during a certain monetization process.
    //If in a certain monetization process,71,527 PCC -> 80,000 CCT
    //the calculation method of Ratio_CCT is 80,000 /71,527  * 99% 
    //99% is because a 1% handling fee will be deducted.
    //The last 6 digits are decimal numbers, if converting CCT ratio is 1.23, then Ratio_CCT is 1,230,000
    uint128 public Ratio_CCT;
    uint128 public Min_Balance;

    error SenderLessThanMinBalance(uint256 minBalance, uint256 senderAfterTransfer);
    error RecipientLessThanMinBalance(uint256 minBalance, uint256 recipientAfterTransfer);

    //Called when PCC convert to CCT
    event TokenConvert(address indexed addr1,uint256 amount);

    //initialize the token contract 
    //include the token name,token symbol and owner
    //and the addresses of CDC and CCT
    //modifier used to restrict the invocation of initialize functions.
    function initialize(string memory name, string memory symbol,address initOwner,address _cdc,address _cct)
    public initializer forceInitializeFromProxy {
        initBlackList();
        __ERC20_init(name, symbol);
         _transferOwnership(initOwner);
        _CDC = _cdc;
        _CCT = _cct;
    }

    modifier onlyAuthed(){
        require(msg.sender == contractOwner() || msg.sender == _CDC,"issue PCC must be authorized");
        _;
    }
 
    // configure the address of CCT and CDC
    function setAuthedContractAddress(
        address _cdc,
        address _cct
    ) external onlyOwner {
        _CDC = _cdc;
        _CCT = _cct;
    }

    // config ratio
    function setRatio(uint128 _cctRatio) external onlyOwner{
        Ratio_CCT = _cctRatio;
    }

    // set transfer minimal balance
    function setMinBalance(uint128 _minBalance) external  onlyOwner {
        Min_Balance = _minBalance;
    }

    // @param account owner of token to be issued
    // @param amount number of tokens to be issued
    function issue(address account, uint256 amount) external override  onlyAuthed  {
        _mint(account, amount);
        emit Issue(account,amount);
    }

    // Override the transfer method of ERC20.
    function transfer(address recipient, uint256 amount) public override whenNotPaused returns (bool) {
        require(isBlackListed[msg.sender] == false,"cant be the blackList");
        uint256 balanceFrom = balanceOf(msg.sender);

        if(balanceFrom < amount) revert InsufficientBalance(amount,balanceFrom);

        uint256 finalBalanceFrom = balanceFrom - amount;
        uint256 finalBalanceTo = balanceOf(recipient) + amount;
        // Ensure the user's account balance is greater than a certain minimum value, or zero
        bool isSuccess;
        if(finalBalanceFrom == 0){
             isSuccess = super.transfer(recipient, amount);
             require(isSuccess,"transfer fail,unKnown error");
             return  isSuccess;
        }
        if (finalBalanceFrom < Min_Balance) revert SenderLessThanMinBalance(Min_Balance,finalBalanceFrom);
        else if (finalBalanceTo < Min_Balance) revert  RecipientLessThanMinBalance(Min_Balance,finalBalanceTo);
        isSuccess = super.transfer(recipient, amount);
        require(isSuccess,"unKnown error");
        return isSuccess;
    }

    /**
    *@notice Convert a specified amount of PCC tokens into CCT tokens according to a predefined conversion rate.
    *@param recipient The address of the recipient who will convert the PCC tokens.
    *@param amount The quantity of PCC tokens to be converted. This value should be greater than 0 and not exceed the balance of the recipient.
    */
    function convert(address recipient,uint256 amount) external onlyOwner {
        // burn PCC
        _burn(recipient, amount);

        // calculate CCT for PCC holder to create income
        // /1000000 is used to eliminate the influence of decimal places when inputting the ratio.
        uint256 amountCCT = amount * Ratio_CCT / 1000000;

        // issue CCT for PCC holder to create income
        ICAToken(_CCT).issue(recipient,amountCCT);    
        
        emit TokenConvert(recipient,amount);

     }

}
