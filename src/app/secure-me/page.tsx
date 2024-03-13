"use client";

import ChatArea from "@/components/Chatarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export default function Home() {
  const [addressType, setAddressType] = useState("User");
  const [theAddress, setTheAddress] = useState("");
  const [isSafe, setIsSafe] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [value, setValue] = useState(0);
  const [returnedAddress, setReturnedAddress] = useState();

  const {data:hash, sendTransaction} = useSendTransaction()

  //handle change function below
  const handleValueChange = (value: string) => {
    setAddressType(value);
  };

  useEffect(() => {
    console.log(addressType);
  }, [addressType]);

  const callGetResponse = async () => {
    setLoading(true)
    setExecuted(false);
    const response = await fetch("/secure-me/api/", {
      method: "POST",
      body: JSON.stringify({
        addressType: addressType,
        theAddress: theAddress,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.safe);
      setExecuted(true);
      setIsSafe(data.safe);
      setReturnedAddress(data.returnedAddress);
      console.log(data.returnedAddress)
      setLoading(false)
    } else {
      console.log("Error");
    }
  };


  return (
    <main className="flex h-screen flex-col items-center justify-start text-white  gap-1">
      <Image
        className="absolute h-full w-full overflow-hidden hue-rotate-[187deg] -z-30 brightness-[0.1] dark:invert-0 dark:opacity-5"
        src="/bg.png"
        width={"1920"}
        height="0"
        alt="background"
      />

      <div className="text-4xl pt-24">Check address here</div>
      <div className="flex justify-center flex-col items-center mt-8 gap-3">
        <Label>Address type</Label>
        <Select value={addressType} onValueChange={handleValueChange}>
          <SelectTrigger className="w-[250px] bg-gray-800 outline-none border-none">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Smart Contract">Smart Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex  pt-5 mb-5 flex-col w-full items-center  ">
        <div className="grid min-w-[32rem] pb- max-w-sm  items-center gap-1.5 p-5 rounded-md ">
          <div className="flex justify-center items-center gap-4">
            <Input
              type="text"
              id="address"
              placeholder="Address"
              value={theAddress}
              onChange={(event) => {
                setTheAddress(event.target.value);
              }}
              className="px-1 py-1 rounded-md bg-opacity-45 bg-gray-700 placeholder:text-gray-500 outline-none border-0"
            />
            <Button
              className="bg-[#283d73] text-md w-20 self-center hover:bg-[#1f2f58] disabled:cursor-not-allowed"
              onClick={callGetResponse}
              disabled={loading}
            >
              <div className="max-h-6 flex justify-center w-16">{loading?(<Loader />):"Check"}</div>
            </Button>
          </div>
        </div>
      </div>
      {executed && isSafe ? (
        <div className="text-2xl mt-6 py-1 px-12 flex flex-col gap-4">
          <div className="bg-green-700 bg-opacity-40 text-center rounded-md p-3">✅ The address {addressType==="Smart Contract"&&"of the owner of the contract address "} you entered is safe to interact with. You can send {addressType==="User"?"it":"them"} ETH below</div>
          <div className="flex gap-2 justify-center">
          <Input
                type="number"
                placeholder="amount "
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="text-lg  bg-gray-900 w-40 h- outline-none border-0"
              />
            <Button
              className="bg-[#283d73] text-md w-20 self-center text-base hover:bg-[#1f2f58] disabled:cursor-not-allowed"
              onClick={() => {sendTransaction({to:`${returnedAddress! as `0x${string}`}`, value:parseEther(value.toString())})}}
              disabled={loading}
            >Send</Button></div>
        </div>
      ) : executed && !isSafe ? (
        <div className="text-2xl mt-6 p-5 bg-red-700 rounded-md opacity-40">
          ❌ This address is not safe to interact with, be very cautious!"
        </div>
      ) : (
        ""
      )}

      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
