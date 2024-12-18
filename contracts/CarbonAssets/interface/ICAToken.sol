// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICAToken {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);

    function transfer(address to, uint value) external returns (bool);
    function issue(address account, uint256 amount) external;
    function redeem(address account, uint256 amount) external;

}