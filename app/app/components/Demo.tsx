// "use client";

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Send } from "lucide-react"
// import { useTheme } from "../contexts/ThemeContext"

// export default function Demo() {
//   const { isDarkMode } = useTheme()
//   const [amount, setAmount] = useState("")
//   const [recipient, setRecipient] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [result, setResult] = useState<string | null>(null)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     // Simulate transaction
//     setTimeout(() => {
//       setResult(`Successfully sent ${amount} ETH to ${recipient} without gas fees!`)
//       setIsLoading(false)
//     }, 2000)
//   }

//   const contractABI = [
//     {
//       "inputs": [],
//       "name": "dummyContractInteraction",
//       "outputs": [],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "dummySwap",
//       "outputs": [],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "dummyTransfer",
//       "outputs": [],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         { "internalType": "uint8", "name": "tx_type", "type": "uint8" },
//         { "internalType": "uint32", "name": "num_txs", "type": "uint32" }
//       ],
//       "name": "estimatePaymasterCost",
//       "outputs": [{ "internalType": "uint256", "name": "cost", "type": "uint256" }],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];
  
//   const CA = "0xc7c553f9031b2cf0fd15603a0e39685c86a1a457";

// //    const { isDarkMode } = useTheme();
//     const [transactionType, setTransactionType] = useState("transfer");
//     const [contract, setContract] = useState(null);
  
//     useEffect(() => {
//       if (typeof window.ethereum !== "undefined") {
//         const web3 = new Web3(window.ethereum);
//         const contractInstance = new web3.eth.Contract(contractABI, CA);
//         setContract(contractInstance);
//       }
//     }, []);
  
//     const executeFunction = async (methodName, params = []) => {
//       if (!contract) {
//         toast.error("Contract not loaded yet");
//         return;
//       }
//       try {
//         const result = await contract.methods[methodName](...params).call();
//         toast.success(`${methodName} executed successfully`);
//         console.log(`${methodName} result:`, result);
//       } catch (error) {
//         toast.error(`Error executing ${methodName}`);
//         console.error(`Error executing ${methodName}:`, error);
//       }
//     };
  
//     const estimatePaymasterCost = async () => {
//       const txTypeMapping = { transfer: 0, swap: 1, contractInteraction: 2 };
//       const txType = txTypeMapping[transactionType];
//       if (txType === undefined) {
//         toast.error("Invalid transaction type");
//         return;
//       }
//       try {
//         const cost = await contract.methods.estimatePaymasterCost(txType, 10).call();
//         toast.success(`Estimated Paymaster Cost: ${cost}`);
//         console.log("Estimated Paymaster Cost:", cost);
//       } catch (error) {
//         toast.error("Error estimating Paymaster Cost");
//         console.error("Error estimating Paymaster Cost:", error);
//       }
//     };

//   return (
//     <section id="demo" className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-300`}>
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-12">Estimate Paymaster Fee or Cost</h2>
//         <div
//           className={`max-w-md mx-auto ${isDarkMode ? "bg-gray-700" : "bg-white"} rounded-lg p-6 shadow-md transition-colors duration-300`}
//         >
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//             <div className="mb-4">
//           <label htmlFor="transactionType" className="block mb-2">Transaction Type</label>
//           <select
//             id="transactionType"
//             value={transactionType}
//             onChange={(e) => setTransactionType(e.target.value)}
//             className={`w-full px-3 py-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-100"} rounded transition-colors duration-300`}
//           >
//             <option value="transfer">Transfer</option>
//             <option value="swap">Swap</option>
//             <option value="contractInteraction">Contract Interaction</option>
//           </select>
//         </div>


//               <label htmlFor="amount of transactions" className="block mb-2">
//                 Amount 
//               </label>
//               <input
//                 type="number"
//                 id="amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className={`w-full px-3 py-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-100"} rounded transition-colors duration-300`}
//                 required
//               />
//             </div>
            

//             <button
//               type="submit"
//               className={`w-full ${isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded flex items-center justify-center transition-colors duration-300`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 "Processing..."
//               ) : (
//                 <>
//                   Estimate Gas Fee
//                   <Send className="ml-2" />
//                 </>
//               )}
//             </button>
//           </form>
//           {result && (
//             <div className="mt-4 p-3 bg-green-600 text-white rounded transition-colors duration-300">{result}</div>
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }



"use client";

import { useState, useEffect } from "react";
import Web3 from "web3";
import { toast } from "sonner";
import { useTheme } from "../contexts/ThemeContext"


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
      { "internalType": "uint8", "name": "tx_type", "type": "uint8" },
      { "internalType": "uint32", "name": "num_txs", "type": "uint32" }
    ],
    "name": "estimatePaymasterCost",
    "outputs": [{ "internalType": "uint256", "name": "cost", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "";

export default function WalletForm() {
  const [transactionType, setTransactionType] = useState("transfer");
  const [contract, setContract] = useState(null);
  const { isDarkMode } = useTheme()
     const [amount, setAmount] = useState("")
     const [recipient, setRecipient] = useState("")
     const [isLoading, setIsLoading] = useState(false)
     const [result, setResult] = useState<string | null>(null)
  


  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setContract(new web3.eth.Contract(contractABI, CONTRACT_ADDRESS));
    }
  }, []);

  const executeFunction = async (methodName: any) => {
    if (!contract) return toast.error("Contract not loaded yet");
    try {
      const result = await contract.methods[methodName]().call();
      toast.success(`${methodName} executed successfully`);
      console.log(`${methodName} result:`, result);
    } catch (error) {
      toast.error(`Error executing ${methodName}`);
      console.error(`Error executing ${methodName}:`, error);
    }
  };

  const estimatePaymasterCost = async () => {
    const txTypeMapping = { transfer: 0, swap: 1, contractInteraction: 2 };
    const txType = txTypeMapping[transactionType];
    if (txType === undefined) return toast.error("Invalid transaction type");
    try {
      const cost = await contract.methods.estimatePaymasterCost(txType, 10).call();
      toast.success(`Estimated Paymaster Cost: ${cost}`);
      console.log("Estimated Paymaster Cost:", cost);
    } catch (error) {
      toast.error("Error estimating Paymaster Cost");
      console.error("Error estimating Paymaster Cost:", error);
    }
  };

  return (
    <form className={`p-6 ${isDarkMode ? "bg-gray-700" : "bg-white"} w-1/2 mx-auto px-10 my-10 shadow-md rounded transition-colors duration-300`}>
        <h2 className="text-2xl font-bold mb-4">Estimate Paymaster Fee or Cost</h2>
        <div className="mb-4">
            
      <label htmlFor="transactionType" className="block mb-2">Transaction Type</label>
      <select
        id="transactionType"
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
        className={`w-full px-3 py-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-100"} border rounded mb-4 transition-colors duration-300`}
      >
        <option value="transfer">Transfer</option>
        <option value="swap">Swap</option>
        <option value="contractInteraction">Contract Interaction</option>
      </select>
        

<label htmlFor="amount" className="block mb-2">Amount</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full px-3 py-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-100"} border rounded transition-colors duration-300`}
                required
            />
            </div>
            <button
              type="button"
              onClick={estimatePaymasterCost}
              className={`w-full ${isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
            >
              Estimate Gas Fee
            </button>
    </form>
  );
}
