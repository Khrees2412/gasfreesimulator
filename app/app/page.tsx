"use client";

import { useTheme } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import Footer from "./components/Footer";

export default function Home() {
    const { isDarkMode } = useTheme();

    return (
        <main
            className={`min-h-screen ${
                isDarkMode
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800"
            } transition-colors duration-300`}
        >
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            {/* <Demo /> */}
            <Footer />
        </main>
    );
}
