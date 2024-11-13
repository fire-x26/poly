//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract PolyProxy {
    address public owner;
    address public target;

    event ProxyTargetSet(address target);
    event ProxyOwnerChanged(address owner);

    constructor() {
        owner = msg.sender;
    }

    /**
   * @dev Throws if called by any account other than the owner.
   */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function setTarget(address _implementation) public onlyOwner {
        target = _implementation;
        emit ProxyTargetSet(_implementation);
    }
    function setOwner(address _owner) external onlyOwner {
        owner = _owner;
        emit ProxyOwnerChanged(_owner);
    }

    fallback() external {
        address _impl = target;
        require(_impl != address(0), "Target not set");
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)

            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }
}