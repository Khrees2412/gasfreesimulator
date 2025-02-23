import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./contexts/ThemeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gasless Wallet on Arbitrum",
  description: "Experience seamless transactions with our Gasless Wallet on Arbitrum using ERC-4337 and Stylus",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.className} transition-colors duration-300`}>{children}</body>
      </ThemeProvider>
    </html>
  )
}

