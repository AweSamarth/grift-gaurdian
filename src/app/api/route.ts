import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


// Load environment variables from .env file

async function main(prompt: string) {

}

// Example call to the main function
main("Can you figure out how to make a chatbot?");



export async function POST(req:NextRequest, res:NextResponse) {
    const body   = await req.json()
    console.log(body)

    
    const prompt = body.prompt
    console.log("Prompt:", prompt);

    try {
      // Construct the request payload
      const payload = {
        question: prompt,
        chat_history: body.messages,
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
      
      return NextResponse.json({output:response.data}, {status:200})

    } catch (error) {
      console.error("Error:", error);
      return new NextResponse(null, { status: 500 })
    }


}