// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token/CAToken.sol";

contract CCT is CAToken{

    // CDC contract address
    address public _CDC; 
    // PCC contract address
    address public _PCC;

    //initialize the token contract 
    //include the token name,token symbol and owner
    //and the addresses of CDC and PCC
    function initialize(string memory name, string memory symbol,address initOwner,address _cdc,address _pcc)
    public initializer forceInitializeFromProxy {
        initBlackList();
        __ERC20_init(name, symbol);
        _transferOwnership(initOwner);
        _CDC = _cdc;
        _PCC = _pcc;
    }

    modifier onlyAuthed(){
        require(msg.sender == contractOwner() || msg.sender == _CDC || msg.sender == _PCC,"issue CCT must be authorized");
        _;
    }

    // configure the address of CDC and PCC
    function setAuthedContractAddress(
        address _cdc,
        address _pcc
    ) external onlyOwner {
        _CDC = _cdc;
        _PCC = _pcc;
    }

    // @param account owner of token to be issued
    // @param amount Number of tokens to be issued
    function issue(address account, uint256 amount) external override  onlyAuthed  {
        _mint(account, amount);
        emit Issue(account,amount);
    }

    // Override the transfer method of ERC20.
    function transfer(address recipient, uint256 amount) public override whenNotPaused returns (bool) {
        require(isBlackListed[msg.sender] == false,"cant be the blackList");
        return  super.transfer(recipient, amount);
    }
}
