"use client"

//import { Wallet } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "../contexts/ThemeContext"
import Image from "next/image";


export default function Header() {
  const { isDarkMode } = useTheme()

  return (
    <header
      className={`py-4 px-6 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* <Wallet
            className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
          /> */}
          <Image src="/smartphone.png" alt="image" width={50} height={50} />
          <span className="text-xl font-bold">Gasless Wallet</span>
        </div>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className={`hover:${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className={`hover:${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#demo"
                className={`hover:${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}
              >
                Demo
              </a>
            </li>
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

