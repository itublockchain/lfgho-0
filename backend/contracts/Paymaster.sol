//SPDX-License-Idetifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Paymaster is IPaymaster {

    uint256 constant public ETHER_TO_GHO = 2500;
    IERC20 public token;
    mapping(address => uint256) public stakes;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) external returns (bytes memory context, uint256 validationData) 
    {
        token.transferFrom(userOp.sender, address(this), 1);
        context = new bytes(0);
        validationData = 0;
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) external {}
}
