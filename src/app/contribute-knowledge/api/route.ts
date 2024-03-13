import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

async function fileToBinaryString(file: File): Promise<string> {
  try {
    const fileBuffer = await file.arrayBuffer();
    const binaryString = Buffer.from(fileBuffer).toString("binary");
    return binaryString;
  } catch (error) {
    console.error("Error converting file to binary string:", error);
    throw error;
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("ye");
  const formData = await req.formData();
  console.log(formData);
  const theFile = formData.get("theFile") as File;
  fileToBinaryString(theFile)
    .then((binaryString) => {
      console.log("Binary String:", binaryString);
    })
    .catch((error) => {
      console.error("Error:", error);
    }); 
  console.log(theFile);
  const fs = require("fs");

  try {
    const payload = {
      file: theFile,
    };

    // Set the headers
    const headers = {
      "x-api-key": process.env.FLOCK_BOT_API_KEY, // Ensure API key is set in .env
    };
    console.log(headers);

    // Send POST request using axios
    const response = await axios.post(
      `${process.env.FLOCK_BOT_ENDPOINT}/contribute/submit_file`,

      {
        payload,
        headers,
        params: {
          file_type: "pdf",
          model_id: "cltn7tmnq002kixrz61amcs7y",
        },
      }
    );

    console.log(response.data);
    const safe = true;

    // return NextResponse.json({ output: response.data }, { status: 200 });
    return NextResponse.json({ safe: safe }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(null, { status: 500 });
  }
}
