"use client"

import { useTheme } from "../contexts/ThemeContext"

export default function HowItWorks() {
  const { isDarkMode } = useTheme()

  const steps = [
    {
      number: 1,
      title: "User Initiates Transaction",
      description: "User sends a transaction request through the Gasless Wallet",
    },
    { number: 2, title: "Paymaster Intercepts", description: "The paymaster service intercepts the transaction" },
    { number: 3, title: "Gas Fee Covered", description: "Paymaster covers the gas fee on behalf of the user" },
    { number: 4, title: "Transaction Executed", description: "The transaction is executed on the Arbitrum network" },
  ]

  return (
    <section
      id="how-it-works"
      className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-white"} transition-colors duration-300`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-6 shadow-md transition-colors duration-300`}
            >
              <div
                className={`text-3xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"} mb-4 transition-colors duration-300`}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

