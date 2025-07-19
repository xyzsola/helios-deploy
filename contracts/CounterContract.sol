// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CounterContract {
    uint256 public count;

    // Add 1 to count
    function increment() external {
        count += 1;
    }
}
