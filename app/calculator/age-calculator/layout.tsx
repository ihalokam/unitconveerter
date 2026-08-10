import type { ReactNode } from "react";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

export default function AgeCalculatorLayout({ children }: { children: ReactNode }) {
    return (
        <div className="font-sans min-h-screen flex flex-col bg-[#f9f8f6] text-stone-800 overflow-x-hidden">
            <Navbar />
            <div className="flex-grow w-full">
                {children}
            </div>
            <Footer />
        </div>
    );
}
