#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use alloy_primitives::Address;
use alloy_sol_types::sol;
use stylus_sdk::stylus_core::log;
use stylus_sdk::{alloy_primitives::U256, prelude::*};

sol_storage! {
    #[entrypoint]
    pub struct GasFreeSimulator {
        uint256 number;
    }
}

sol! {
    event Log(address indexed sender, string message);
}

#[public]
impl GasFreeSimulator {
    pub fn simulate_tx(&mut self, caller: Address, tx_type: u8) {
        let gas_before = self.vm().evm_gas_left();

        match tx_type {
            1 => self.dummy_transfer(),
            2 => self.dummy_swap(),
            3 => self.dummy_contract_interaction(),
            _ => {
                log(
                    self.vm(),
                    Log {
                        sender: caller,
                        message: "Invalid transaction type".to_string(),
                    },
                );
                return; // Early return for invalid tx_type
            }
        }

        let gas_after = self.vm().evm_gas_left();
        let gas_used = gas_before - gas_after;

        log(
            self.vm(),
            Log {
                sender: caller,
                message: format!("Tx Type: {}, Gas used: {} by {}", tx_type, gas_used, caller),
            },
        );
    }

    fn dummy_transfer(&mut self) {
        self.number.set(self.number.get() + U256::from(1));
        let _ = self.vm().evm_gas_left() / 2;
    }

    fn dummy_swap(&mut self) {
        self.number.set(self.number.get() + U256::from(2));
        let _ = self.vm().evm_gas_left() / 3;
    }

    fn dummy_contract_interaction(&mut self) {
        self.number.set(self.number.get() + U256::from(3));
        let _ = self.vm().evm_gas_left() / 4;
    }

    pub fn estimate_paymaster_cost(&self, tx_type: u8, num_txs: u32) {
        let base_gas_cost = match tx_type {
            1 => 21000, // Approx for transfers
            2 => 45000, // Approx for swaps
            3 => 60000, // Approx for contract calls
            _ => {
                log(
                    self.vm(),
                    Log {
                        sender: Address::default(),
                        message: "Invalid transaction type for estimation".to_string(),
                    },
                );
                return;
            }
        };

        let total_gas = U256::from(base_gas_cost) * U256::from(num_txs);

        let gas_price = U256::from(1_000_000_000_u64); // Example: 1 Gwei
        let wei_required = total_gas * gas_price; // No floating-point needed

        log(
            self.vm(),
            Log {
                sender: Address::default(),
                message: format!(
                    "Estimated cost for {} transactions of type {}: {} wei",
                    num_txs, tx_type, wei_required
                ),
            },
        );
    }

    pub fn get_number(&self) -> U256 {
        return self.number.get();
    }
}
