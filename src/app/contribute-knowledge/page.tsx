"use client";

import ChatArea from "@/components/Chatarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { workingConfig } from "@/utils/utils";
import { readContract } from "@wagmi/core";

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
import FileUpload from "@/components/FileUpload";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, abi } from "@/constants/constants";
import { queryClient } from "../providers";

export default function Home() {
  const [modelId, setModelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [theFile, setTheFile] = useState<File>();
  const [submitted, setSubmitted] = useState(false);
  const [tokenId, setTokenId] = useState();
  //handle change function below

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const callGetResponse = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("theFile", theFile as Blob);
    formData.append("modelId", modelId);
    const response = await fetch("/contribute-knowledge/api/", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.submitted);
      setSubmitted(true);
      setLoading(false);
    } else {
      console.log("Error");
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Make sure we have a file
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    // Update the state variable accordingly
    setTheFile(file);

    console.log(file);
  };

  useEffect(() => {
    console.log(hash);
    console.log(isLoading);
    console.log(isSuccess);
    console.log(isPending)
  }, []);

  const claimNFT = async () => {
    const result = await readContract(workingConfig, {
      abi,
      address: CONTRACT_ADDRESS,
      functionName: "totalSupply",
    });

    console.log(result);

    //@ts-ignore
    setTokenId(Number(result) + 1);

    writeContract({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: "mint",
    });
    console.log(hash);
    console.log(isPending)
    console.log(isLoading);
    console.log(isSuccess);
    queryClient.invalidateQueries();
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

      <div className="text-4xl pt-24">Submit knowledge</div>

      <div className="flex  pt-4 mb-5 flex-col w-full items-center  ">
        {submitted ? (
          <div className="  bg-gray-900 mt-24  self-center flex flex-col  items-center gap-4 px-5 py-12 rounded-md ">
            <div className="text-xl">
              {" "}
              {hash ? (
                <div>
                  NFT claimed successfully! You will soon be able to view it {" "}
                  <Link
                    href={`https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${tokenId}`}
                  >
                    <span className="text-[#88aaff]">here</span>
                  </Link>
                </div>
              ) : (
                "Thank you for contributing! You can claim your NFT here:"
              )}
            </div>

            {!hash && (
              <Button
                className="bg-[#283d73] text-md w-20 self-center hover:bg-[#1f2f58] disabled:cursor-not-allowed"
                onClick={claimNFT}
                disabled={isPending}
              >
                <div className="max-h-6 flex justify-center w-16">
                  {isPending || isLoading ? <Loader /> : "Claim"}
                </div>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid min-w-[32rem] pb- max-w-sm  items-center gap-1.5 p-5 rounded-md ">
            <div className="flex flex-col justify-center items-center gap-4">
              <div>
                <Label>Model ID</Label>

                <Input
                  type="text"
                  id="model-id"
                  placeholder="ID"
                  value={modelId}
                  onChange={(event) => {
                    setModelId(event.target.value);
                  }}
                  className="px-1 py-1 w-96 mt-2 rounded-md bg-opacity-45 bg-gray-700 placeholder:text-gray-500 outline-none border-0"
                />
              </div>

              <div className="w-[25rem]">
                <FileUpload uploaded={theFile ? true : false} />
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <Button
                className="bg-[#283d73] text-md w-20 self-center hover:bg-[#1f2f58] disabled:cursor-not-allowed"
                onClick={callGetResponse}
                disabled={loading}
              >
                <div className="max-h-6 flex justify-center w-16">
                  {loading || isPending ? <Loader /> : "Submit"}
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
