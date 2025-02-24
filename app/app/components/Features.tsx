"use client";

import { Zap, Shield, Coins } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Features() {
    const { isDarkMode } = useTheme();

    const features = [
        {
            icon: (
                <Zap
                    className={`w-12 h-12 ${
                        isDarkMode ? "text-yellow-400" : "text-yellow-500"
                    } transition-colors duration-300`}
                />
            ),
            title: "Gasless Transactions",
            description:
                "No need to worry about gas fees for every transaction",
        },
        {
            icon: (
                <Shield
                    className={`w-12 h-12 ${
                        isDarkMode ? "text-green-400" : "text-green-500"
                    } transition-colors duration-300`}
                />
            ),
            title: "Enhanced Security",
            description: "Leveraging ERC-4337 for improved wallet security",
        },
        {
            icon: (
                <Coins
                    className={`w-12 h-12 ${
                        isDarkMode ? "text-purple-400" : "text-purple-500"
                    } transition-colors duration-300`}
                />
            ),
            title: "Arbitrum Powered",
            description: "Fast and low-cost transactions on Arbitrum network",
        },
    ];

    return (
        <section
            id="features"
            className={`py-20 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
            } transition-colors duration-300`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${
                                isDarkMode ? "bg-gray-700" : "bg-white"
                            } rounded-lg p-6 text-center shadow-md transition-colors duration-300`}
                        >
                            <div className="mb-4 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
