"use client";

import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
    const { isDarkMode } = useTheme();

    return (
        <footer
            className={`py-6 ${
                isDarkMode ? "bg-gray-800" : "bg-white"
            } text-center transition-colors duration-300`}
        >
            <div className="container mx-auto px-6">
                <p>&copy; 2025 GasFree Wallet. All rights reserved.</p>
            </div>
        </footer>
    );
}
