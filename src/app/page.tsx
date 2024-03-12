'use client'

import ChatArea from "@/components/Chatarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {



  return (
    <main className=" flex min-h-screen flex-col items-center justify-center p-24 gap-1">
    <Navbar />
    <Image
      className="absolute h-full w-full overflow-hidden hue-rotate-[187deg] -z-30 brightness-[0.1] dark:invert-0 dark:opacity-5"
      src="/bg.png"
      width={"1920"}
      height="0"
      alt="background"
    />

    <div
      className={
        "headingDiv text-[2.5rem] text-center flex font-semibold leading-tight mt-8 text-white "
      }
    >
      <span className="text-white">Just Don't Get{""}</span><span className=" ml-3 text-[#5882ee]"> Scammed</span>.</div>

    <div className="border- border-white px-4 py-2 text-center text-[1.07rem] w-[34rem] text-gray-200 opacity-80 ">
      Let GriftGuardian's knowledge base on FLock help you avoid interacting with blacklisted addresses and keep your funds safe without worrying.
      Get NFTs for contributing knowledge and helping other stay safe.
    </div>

    <div className="flex gap-6 mt-2">
      <Link href="/secure-me">
        <Button className="text-[0.96rem] mt-2 py- px-8 flex gap-1 bg-[#283d73] hover:bg-[#1f2f58]">
          <span>Check security</span>{" "}
        </Button>
      </Link>

      <ChatArea />

      <Link href="/explore">
        <Button className="text-[0.96rem] mt-2 py- flex gap-1 bg-white hover:bg-gray-200 text-black">
          <span>Contribute knowledge{"  "}</span>{" "}
        </Button>
      </Link>
    </div>
    {/* <SignInButton mode="modal" />
  <div>
    <Authenticated>Logged in</Authenticated>
    <Unauthenticated>Logged out</Unauthenticated>

    <AuthLoading>Still loading</AuthLoading>
  </div> */}
    <div className="absolute bottom-0 w-full">
      <Footer />
    </div>
  </main>
  );
}
