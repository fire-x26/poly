// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMC is ERC20, Ownable {
    constructor( address initialOwner,uint256 initialSupply) 
        ERC20("CMC", "CMC")
        Ownable(initialOwner) 
    {
        _mint(initialOwner, initialSupply); // 将初始供应量分配给拥有者
    }
    mapping(string => uint256) public balances;

    function decimals() public view virtual override  returns (uint8) {
        return 2;
    }
    // 代币增发功能，仅限合约拥有者调用
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // 代币销毁功能，仅限合约拥有者调用
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
    // 写入方法：设置某个用户的余额
    function setBalance(string memory _user, uint256 _amount) public {
        balances[_user] = _amount;
    }

    // 读取方法：获取某个用户的余额
    function getBalance(string memory _user) public view returns (uint256) {
        return balances[_user];
    }
}
