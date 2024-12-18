// SPDX-License-Identifier: MIT
// author: @0xAA_Science from wtf.academy

pragma solidity ^0.8.0;

import "./Ownable.sol";
/// A signature-based multisignature wallet, simplified from the Gnosis Safe contract, for educational purposes.
contract Execution is Ownable {
    event ExecutionSuccess(bytes32 txHash); // Event for successful execution of a transaction
    event ExecutionFailure(bytes32 txHash); // Event for failed execution of a transaction

    uint256 public nonce; // Nonce to prevent replay attacks on signatures

    receive() external payable {}

    // Constructor to initialize the owner
    constructor() {
        initializeOwner();
    }

    // Executes a transaction on behalf of the owner
    function execTransaction(
        address to,
        uint256 value,
        bytes memory data,
        bytes memory signatures
    ) public payable virtual onlyOwner returns (bool success) {
        // Encode the transaction data and compute the transaction hash
        bytes32 txHash = encodeTransactionData(to, value, data, block.chainid);
        nonce++; // Increment nonce
        checkSignature(txHash, signatures); // Check the validity of the signature
        // Use call to execute the transaction and retrieve the result
        (success, ) = to.call{value: value}(data);
       
        if (success) {
            emit ExecutionSuccess(txHash); // Emit success event
        } else {
            emit ExecutionFailure(txHash); // Emit failure event
            revert("fail"); // Revert transaction on failure
        }
        return success;
    }

    // Verifies the validity of the provided signature
    function checkSignature(
        bytes32 dataHash,
        bytes memory signature
    ) public pure returns (address signer) {
        // Ensure the signature length is 65 bytes (r, s, v)
        require(signature.length == 65, "WTF5006");

        uint8 v;
        bytes32 r;
        bytes32 s;

        // Split the signature
        (v, r, s) = signatureSplit(signature);

        // Use ecrecover to verify the signature is valid
        signer = ecrecover(
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", dataHash)
            ),
            v,
            r,
            s
        );
        require(signer != address(0), "Invalid signature"); // Ensure a valid signer address
    }

    /// Splits a single signature from the packed signature
    function signatureSplit(
        bytes memory _signature
    ) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        assembly {
            r := mload(add(_signature, 0x20)) // Read the first 32 bytes (r)
            s := mload(add(_signature, 0x40)) // Read the next 32 bytes (s)
            v := byte(0, mload(add(_signature, 0x60))) // Read the last byte (v)
        }
    }

    /// Encodes the transaction data for creating a transaction hash
    function encodeTransactionData(
        address to,
        uint256 value,
        bytes memory data,
        uint256 chainid
    ) public view returns (bytes32) {
        bytes32 safeTxHash = keccak256(
            abi.encode(to, value, keccak256(data), nonce, chainid)
        );
        return safeTxHash;
    }

    function getNonce() external view returns (uint256){
        return nonce;
    }
}
