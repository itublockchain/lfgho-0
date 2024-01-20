// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/EntryPoint.sol";
import "@account-abstraction/contracts/interfaces/IAccount.sol";

contract Account is IAccount {

    uint256 public count;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external pure returns (uint256 validationData) {
        return 0;
    }

    function increment() external {
        count++;
    }
}

contract AccountFactory {
    function createAccount(address _owner) external returns (address) {
        return address(new Account(_owner));
    }
}