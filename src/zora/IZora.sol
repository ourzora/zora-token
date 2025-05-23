// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC7572} from "../interfaces/IERC7572.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IZora is IERC7572, IERC20 {
    /// @notice Used once during deploy to mint and allocate the initial and total supply of the ERC20
    /// @param tos Addresses to allocate tokens to by the deployer
    /// @param amounts Amounts of tokens to allocate alongside the tos address array
    /// @param uri Contract URI to set for the token metadata
    function initialize(address[] calldata tos, uint256[] calldata amounts, string memory uri) external;

    /// @notice Invalid input lengths when the tos and amounts array lengths do not match
    error InvalidInputLengths();

    /// @notice Error when any user other than the admin attempts to mint the initial and final supply
    error OnlyAdmin();

    /// @notice Error when URI is not provided during initialization
    error URINeedsToBeSet();

    /// @notice Error when a zero address is used as the initializer account
    error InitializerCannotBeAddressZero();
}
