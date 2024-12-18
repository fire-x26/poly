// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract BlackList is Ownable {

    mapping(address => bool) public isBlackListed;

    event AddedBlackList(address indexed _user);
    event RemovedBlackList(address indexed _user);

    function initBlackList() internal {
        initialize();
    }
    
    /**
     * @dev Add an address to the blacklist.
     * @param _evilUser The address to blacklist.
     */
    function addBlackList(address _evilUser) external onlyOwner {
        isBlackListed[_evilUser] = true;
        emit AddedBlackList(_evilUser);
    }

    /**
     * @dev Remove an address from the blacklist.
     * @param _clearedUser The address to remove from blacklist.
     */
    function removeBlackList(address _clearedUser) external onlyOwner {
        isBlackListed[_clearedUser] = false;
        emit RemovedBlackList(_clearedUser);
    }

}
