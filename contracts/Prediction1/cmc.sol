// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMC is ERC20, Ownable {
    constructor(address initialOwner, uint256 initialSupply) 
        ERC20("CMC", "CMC")
        Ownable(initialOwner) 
    {
        // Mint the initial supply to the owner
        _mint(initialOwner, initialSupply); 
    }
    // Event to log minting action
    event Mint(address indexed to, uint256 amount);

    // Event to log burning action
    event Burn(address indexed from, uint256 amount);

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
    // Minting function, only callable by the contract owner
    // Minting function, only callable by the contract owner
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "CMC: mint to the zero address");
        require(amount > 0, "CMC: amount must be greater than zero");
        
        _mint(to, amount);

        // Emit the Mint event
        emit Mint(to, amount);
    }
    // Burning function, only callable by the contract owner
    // Burning function, only callable by the contract owner
    function burn(address from, uint256 amount) external onlyOwner {
        require(from != address(0), "CMC: burn from the zero address");
        require(amount > 0, "CMC: amount must be greater than zero");
        require(balanceOf(from) >= amount, "CMC: burn amount exceeds balance");

        _burn(from, amount);

        // Emit the Burn event
        emit Burn(from, amount);
    }
}
