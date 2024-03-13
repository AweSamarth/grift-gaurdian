import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);

  const addressType = body.addressType;
  const theAddress = body.theAddress;

  var prompt;
  var returnedAddress
  console.log(addressType);
  console.log(theAddress);

  try {
    // Construct the request payload
    if (addressType === "Smart Contract") {
        console.log("yes");
        const response = await fetch(
          `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${theAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        returnedAddress = data.result[0].contractCreator;
        prompt = `Is this address present in the blacklist: ${data.result[0].contractCreator}? (Y/N)`;
        console.log(prompt);
      }
  
      else{
        prompt = `Is this address present in the blacklist: ${theAddress}? (Y/N)`;
        returnedAddress = theAddress;
      }

      console.log(prompt);
      const payload = {
        question: prompt,
        chat_history: [],
        knowledge_source_id: "cltn7tmnq002kixrz61amcs7y", // replace with your model id
      };
  
      // Set the headers
      const headers = {
        "x-api-key": process.env.FLOCK_BOT_API_KEY, // Ensure API key is set in .env
      };
  
      // Send POST request using axios
      const response = await axios.post(
        `${process.env.FLOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`,
        payload,
        {
          headers,
        }
      );
  
      // Output the response data
      console.log(response.data);
      const safe = true
  
      // return NextResponse.json({ output: response.data }, { status: 200 });
      return NextResponse.json({ safe: safe, returnedAddress: returnedAddress }, { status: 200 });

    } catch (error) {
      console.error("Error:", error);
      return new NextResponse(null, { status: 500 });
    }
  }
