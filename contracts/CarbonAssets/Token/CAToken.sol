// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

import "../interface/ICAToken.sol";
import "../utils/BlackList.sol";
import "../utils/proxyTarget.sol";

contract CAToken is ProxyTarget,BlackList,ERC20Upgradeable,PausableUpgradeable{

    string public constant Version = "4";

    error InsufficientBalance(uint256 requested, uint256 available);

    // Called when new token are issued
    event Issue(address indexed  addr1,uint256 amount);

    // Called when tokens are redeemed
    event Redeem(address indexed addr1,uint256 amount);
    
    function decimals() public pure  override  returns (uint8) {
        return 6;
    }

    // Issue tokens
    // @param account owner of token to be issued
    // @param amount Number of tokens to be issued
    function issue(address account, uint256 amount) external  virtual  {}

    // Redeem tokens.
    // @param account owner of token to be redeemed   
    // @param amount Number of tokens to be redeemed
    function redeem(address account ,uint256 amount) external  onlyOwner{
        require(balanceOf(account) >= amount,"Insufficient token");
        _burn(account, amount);
        emit Redeem(account,amount);
    }

    // pause/unpause the transfer
    function pause() external onlyOwner {
        _pause();
    }
    function unpause() external onlyOwner {
        _unpause();
    }

    // Override the transferFrom method of ERC20.
    function transferFrom(address sender, address recipient, uint256 amount) public override  returns (bool) {
            revert("not support");   
    }
}
