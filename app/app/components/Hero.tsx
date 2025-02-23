"use client";

import { ArrowRight } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { useState, useEffect } from "react";
import Web3 from "web3";
import { toast } from "sonner";


 const contractABI = [
 {
     "inputs": [],
     "name": "dummyContractInteraction",
     "outputs": [],
     "stateMutability": "view",
     "type": "function"
 },
 {
     "inputs": [],
     "name": "dummySwap",
     "outputs": [],
     "stateMutability": "view",
     "type": "function"
 },
 {
     "inputs": [],
     "name": "dummyTransfer",
     "outputs": [],
     "stateMutability": "view",
     "type": "function"
 },
 {
     "inputs": [
         {
             "internalType": "uint8",
             "name": "tx_type",
             "type": "uint8"
         },
         {
             "internalType": "uint32",
             "name": "num_txs",
             "type": "uint32"
         }
     ],
     "name": "estimatePaymasterCost",
     "outputs": [],
     "stateMutability": "view",
     "type": "function"
 },
 {
     "inputs": [
         {
             "internalType": "address",
             "name": "caller",
             "type": "address"
         },
         {
             "internalType": "uint8",
             "name": "tx_type",
             "type": "uint8"
         }
     ],
     "name": "simulateTx",
     "outputs": [],
     "stateMutability": "view",
     "type": "function"
 }
];

const CA = "0xc7c553f9031b2cf0fd15603a0e39685c86a1a457";

export default function Hero() {
  const { isDarkMode } = useTheme()
   const [walletAddress, setWalletAddress] = useState("");
   const [contract, setContract] = useState<any | null>(null);
   const [isConnecting, setIsConnecting] = useState(false);


   useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);

        web3.eth.getAccounts()
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

        if (window.ethereum._metamask && (await window.ethereum._metamask.isUnlocked()) === false) {
            alert("A wallet request is already pending. Please approve it in MetaMask.");
            return;
        }

        let accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
        if (currentChainId !== "421614") {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "421614" }],
            });
        }

        const newAccounts = await web3.eth.getAccounts();
        if (newAccounts.length > 0) {
            setWalletAddress(newAccounts[0]);
            console.log("Connected account:", newAccounts[0]);
        } else {
            throw new Error("No accounts found");
        }
    } catch (error: any) {
        if (error.code === -32002) {
            alert("A request is already pending. Please approve or reject it in MetaMask.");
        } else if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: "0x66eee",
                        chainName: "Arbitrum Sepolia",
                        nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                        rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
                        blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
                    }],
                });
            } catch (addError) {
                console.error("Failed to add Arbitrum Sepolia:", addError);
            }
        } else {
            console.error("Failed to switch network:", error);
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
        const result = await contract.methods.dummyContractInteraction().call();
        console.log("Contract interaction result:", result);
    }catch (error) {
        console.error("Contract interaction error:", error);
    }
};

const handleSwap = async () => {
    if (!contract) {
        return toast.error("Contract not found");
    }
    try {
        const result = await contract.methods.dummySwap().call();
        console.log("Swap result:", result);
        toast.success("Swap successful");
    } catch (error) {
        console.error("Swap error:", error);
    }
}

const handleTransfer = async () => {
    if (!contract) {
        return toast.error("Contract not found");
    }
    try {
        const result = await contract.methods.dummyTransfer().call();
        console.log("Transfer result:", result);
        toast.success("Transfer successful");
    } catch (error) {
        console.error("Transfer error:", error);
    }
}


  return (

    <section className={`py-20 text-center ${isDarkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Gasless Wallet on Arbitrum</h1>
        <p className="text-xl md:text-2xl mb-8">Experience seamless transactions without the hassle of gas fees.</p>
        <div>
            
        
        
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className={`${isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} p-10 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300 border border-red-600  cursor-pointer`}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
          <ArrowRight className="ml-2" />
        </button>

        </div>
            


        <button onClick={handleTransfer} className="m-2 p-4 bg-green-600 text-white rounded">Transfer</button>
        <button onClick={handleSwap} className="m-2 p-4 bg-yellow-600 text-white rounded">Swap</button>
        <button onClick={handleContractInteraction} className="m-2 p-4 bg-purple-600 text-white rounded">Contract Interaction</button>

      </div>
    </section>
  )
}

