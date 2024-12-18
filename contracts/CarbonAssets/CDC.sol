// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Token/CAToken.sol";

contract CDC is CAToken{

    // PCC contract address
    address public _PCC;
    // CCT contract address
    address public _CCT;

    // CDC min balance
    uint128 public Min_Balance;

    //This ratio is used to represent how many PCCs/CCTs each CDC can be turned into during a certain monetization process.
    //If in a certain monetization process, 500,000 CDC -> 110,000 CCT + 1,900,000 PCC, 
    //the calculation method of Ratio_CCT is 110，000/500，000 * 99% and  Ratio_PCC is 1,900，000/500，000 * 99%
    //99% is as an example supposed a 1% handling fee will be deducted.
    //The last 6 digits are decimal numbers, if converting CCT ratio is 1.23, then Ratio_CCT is 1,230,000
    uint64 public Ratio_PCC;
    uint64 public Ratio_CCT;

    error SenderLessThanMinBalance(uint256 minBalance, uint256 senderAfterTransfer);
    error RecipientLessThanMinBalance(uint256 minBalance, uint256 recipientAfterTransfer);

    // Called when CDC convert to PCC and CCT
    event TokenConvert(address indexed addr1,uint256 amount);

    //initialize the token contract 
    //include the token name,token symbol and owner
    //and the addresses of PCC and CCT
    //modifier used to restrict the invocation of initialize functions.
    function initialize(string memory name, string memory symbol,address initOwner,address _pcc,address _cct)
     public initializer forceInitializeFromProxy {
        initBlackList();
        __ERC20_init(name, symbol);
        _transferOwnership(initOwner);
        _PCC = _pcc;
        _CCT = _cct;
    }

    // configure the address of CCT and PCC
    function setAuthedContractAddress(
        address _pcc,
        address _cct
    ) external onlyOwner {
        _PCC = _pcc;
        _CCT = _cct;
    }

    // config ratios
    function setRatio(uint64 _pccRatio,uint64 _cctRatio) external onlyOwner{
        Ratio_PCC = _pccRatio;
        Ratio_CCT = _cctRatio;
    }

    // set transfer minimal balance
    function setMinBalance(uint128 _minBalance) external  onlyOwner {
        Min_Balance = _minBalance;
    }

    // @param account owner of token to be issued
    // @param amount number of tokens to be issued
    function issue(address account, uint256 amount) external override  onlyOwner  {
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
             isSuccess =  super.transfer(recipient, amount);
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
    *@notice Convert a specified amount of CDC tokens into CCT and PCC tokens according to a predefined conversion rate.
    *@param recipient The address of the recipient who will convert the CDC tokens.
    *@param amount The quantity of CDC tokens to be converted. This value should be greater than 0 and not exceed the balance of the recipient.
    */
    function convert(address recipient,uint256 amount) external onlyOwner {
        // burn CDC
        _burn(recipient, amount);

        // calculate PCC and CCT for CDC holder to create income
        // /1000000 is used to eliminate the influence of decimal places when inputting the ratio.
        uint256  amountPCC = amount * Ratio_PCC / 1000000;
        uint256  amountCCT = amount * Ratio_CCT / 1000000;

        // issue PCC and CCT for CDC holder to create income
        ICAToken(_PCC).issue(recipient, amountPCC);
        ICAToken(_CCT).issue(recipient, amountCCT);

        emit TokenConvert(recipient,amount);
    }

}