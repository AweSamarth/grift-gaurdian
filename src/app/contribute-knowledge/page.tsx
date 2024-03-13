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
import FileUpload from "@/components/FileUpload";

export default function Home() {
  const [addressType, setAddressType] = useState("User");
  const [modelId, setModelId] = useState("");
  const [isSafe, setIsSafe] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [theFile, setTheFile] = useState<File>();
  //handle change function below
  

  useEffect(() => {
    console.log(addressType);
  }, [addressType]);

  const callGetResponse = async () => {
    setLoading(true)
    setExecuted(false);

    const formData = new FormData();
    formData.append("theFile", theFile as Blob);
    formData.append("modelId", modelId);
    const response = await fetch("/contribute-knowledge/api/", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.safe);
      setExecuted(true);
      setIsSafe(data.safe);
      setLoading(false)
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

    console.log(file)
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

      <div className="flex  pt-5 mb-5 flex-col w-full items-center  ">
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
              <FileUpload uploaded={theFile?true:false} />
              <input id="dropzone-file" type="file" className="hidden"  onChange={handleFileChange} />

            </div>

            <Button
              className="bg-[#283d73] text-md w-20 self-center hover:bg-[#1f2f58] disabled:cursor-not-allowed"
              onClick={callGetResponse}
              disabled={loading}
            >
              
              <div className="max-h-6 flex justify-center w-16">{loading?(<Loader />):"Submit"}</div>
            </Button>
          </div>
        </div>
      </div>
      


      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
