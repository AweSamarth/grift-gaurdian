import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";
import ChatArea from "@/components/Chatarea";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GriftGaurdian",
  description: "Don't get scammed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-white h-screen">
      <body className={inter.className + " "}>
      <Providers >
        <Navbar />
        <ChatArea />
        {children}
        </Providers>
      </body>
    </html>
  );
}
