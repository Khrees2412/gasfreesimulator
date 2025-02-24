"use client";

import { ArrowRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { toast } from "sonner";

const contractABI = [
    {
        inputs: [],
        name: "dummyContractInteraction",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "dummySwap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "dummyTransfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "tx_type",
                type: "uint8",
            },
            {
                internalType: "uint32",
                name: "num_txs",
                type: "uint32",
            },
        ],
        name: "estimatePaymasterCost",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNumber",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "caller",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "tx_type",
                type: "uint8",
            },
        ],
        name: "simulateTx",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const CA = "0x4af567288e68cad4aa93a272fe6139ca53859c70";

export default function Hero() {
    const { isDarkMode } = useTheme();
    const [walletAddress, setWalletAddress] = useState("");
    const [contract, setContract] = useState<any | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            const web3 = new Web3(window.ethereum);

            web3.eth
                .getAccounts()
                .then((accounts) => {
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                    }
                })
                .catch((err) => console.error("Error fetching accounts:", err));

            // Listen for account changes
            window.ethereum.on("accountsChanged", (accounts: any) => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                } else {
                    setWalletAddress("");
                }
            });

            // Listen for network changes
            window.ethereum.on("chainChanged", () => {
                window.location.reload(); // Optional: Reload only on network change
            });
        }
    }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum === "undefined") {
            console.error("MetaMask is not installed");
            return;
        }

        try {
            const web3 = new Web3(window.ethereum);

            // Check if a request is already pending in MetaMask
            if (
                window.ethereum._metamask &&
                !(await window.ethereum._metamask.isUnlocked())
            ) {
                alert(
                    "A wallet request is already pending. Please approve it in MetaMask."
                );
                return;
            }

            // Request accounts if not already connected
            let accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
            }

            // Small delay to ensure MetaMask updates account state
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Get current chain ID and switch if necessary
            const currentChainId = await window.ethereum.request({
                method: "eth_chainId",
            });
            const targetChainId = "0x66eee"; // Hexadecimal representation of 421614

            if (currentChainId !== targetChainId) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: targetChainId }],
                    });
                } catch (switchError: any) {
                    // Handle errors during chain switch
                    if (switchError.code === 4902) {
                        // Chain not added, attempt to add it
                        try {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        chainId: targetChainId,
                                        chainName: "Arbitrum Sepolia",
                                        nativeCurrency: {
                                            name: "Ether",
                                            symbol: "ETH",
                                            decimals: 18,
                                        },
                                        rpcUrls: ["http://localhost:8547"],
                                    },
                                ],
                            });
                        } catch (addError) {
                            console.error(
                                "Failed to add Arbitrum Sepolia:",
                                addError
                            );
                            throw addError; // rethrow error to be caught in the outer catch block
                        }
                    } else {
                        console.error("Failed to switch network:", switchError);
                        throw switchError; // rethrow error to be caught in the outer catch block
                    }
                }
            }

            // Verify accounts after chain switch
            const newAccounts = await web3.eth.getAccounts();
            if (newAccounts.length > 0) {
                setWalletAddress(newAccounts[0]);
                console.log("Connected account:", newAccounts[0]);
            } else {
                throw new Error("No accounts found after chain switch");
            }
        } catch (error: any) {
            // Handle pending request error
            if (error.code === -32002) {
                alert(
                    "A request is already pending. Please approve or reject it in MetaMask."
                );
            } else {
                // General error handling
                console.error("Wallet connection error:", error);
                alert(
                    "An error occurred connecting to your wallet. Please check the console for details."
                );
            }
        }
    };

    const getContract = async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, CA);
        setContract(contract);
        return contract;
    };

    useEffect(() => {
        getContract();
    }, []);

    const handleContractInteraction = async () => {
        if (!contract) {
            return toast.error("Contract not found");
        }
        try {
            // Assuming dummyContractInteraction is a view/pure function
            const result = await contract.methods
                .dummyContractInteraction()
                .call();
            console.log("Contract interaction result:", result);
        } catch (error) {
            console.error("Contract interaction error:", error);
            toast.error("Contract interaction failed");
        }
    };

    const handleSwap = async () => {
        if (!contract) {
            return toast.error("Contract not found");
        }
        try {
            // Assuming dummySwap modifies state, use .send()
            await contract.methods.dummySwap().send({ from: walletAddress }); // Replace walletAddress
            console.log("Swap successful");
            toast.success("Swap successful");
        } catch (error) {
            console.error("Swap error:", error);
            toast.error("Swap failed");
        }
    };

    const handleTransfer = async () => {
        if (!contract) {
            return toast.error("Contract not found");
        }
        try {
            // Assuming dummyTransfer modifies state, use .send()
            await contract.methods
                .dummyTransfer()
                .send({ from: walletAddress }); // Replace walletAddress
            console.log("Transfer successful");
            toast.success("Transfer successful");
        } catch (error) {
            console.error("Transfer error:", error);
            toast.error("Transfer failed");
        }
    };

    return (
        <section
            className={`py-20 text-center ${
                isDarkMode ? "bg-gray-800" : "bg-white"
            } transition-colors duration-300`}
        >
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Gasless Wallet on Arbitrum
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                    Experience seamless transactions without the hassle of gas
                    fees.
                </p>
                <div>
                    <button
                        onClick={connectWallet}
                        disabled={isConnecting}
                        className={`${
                            isDarkMode
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        } p-10 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300 border border-red-600  cursor-pointer`}
                    >
                        {isConnecting ? "Connecting..." : "Connect Wallet"}
                        <ArrowRight className="ml-2" />
                    </button>
                </div>

                <button
                    onClick={handleTransfer}
                    className="m-2 p-4 bg-green-600 text-white rounded"
                >
                    Transfer
                </button>
                <button
                    onClick={handleSwap}
                    className="m-2 p-4 bg-yellow-600 text-white rounded"
                >
                    Swap
                </button>
                <button
                    onClick={handleContractInteraction}
                    className="m-2 p-4 bg-purple-600 text-white rounded"
                >
                    Contract Interaction
                </button>
            </div>
        </section>
    );
}
