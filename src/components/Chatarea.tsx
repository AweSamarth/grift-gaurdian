"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SiChatbot, } from "react-icons/si";

export default function ChatArea() {
    const [messages, setMessages] = useState([
        {
          role: "assistant",
          content: "Yo, this is GuardBot! How can I help you today?",
        },
      ]);
  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = messages;
    temp.push({ role: "user", content: theInput });
    setMessages(temp);
    setTheInput("");
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify({ messages, prompt: theInput}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.output);
      const { output } = data;
      setMessages((prevMessages: any) => [...prevMessages, {role:"assistant", content:output.answer}]);
      setIsLoading(false);
    } else {
      console.log("Error");
    }
  };

  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callGetResponse();
    }
  };

  <button
    onClick={callGetResponse}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {" "}
    Get{" "}
  </button>;

  return (
    <div className="absolute bottom-0 right-12   mb-16 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <SiChatbot className=" text-xl text-[#354e8d]" /> 
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[20rem] overflow-x-hidden mr-12 px-0 py-0 rounded-xl border-gray-600 border bg-gray-600">
          <div className="flex overflow-x-hidden h-[30rem] w-[20rem] flex-col items-center  bg-gray-600 rounded-xl">
            <div className=" h-full flex overflow-x-hidden flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
              {messages.map((e: any) => {
                return (
                  <div
                    key={e.content}
                    className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                      e.role === "assistant"
                        ? "self-start  bg-gray-200 text-gray-800"
                        : "self-end  bg-gray-800 text-gray-50"
                    } `}
                  >
                    {e.content}
                  </div>
                );
              })}

              {isLoading ? (
                <div className="self-start  bg-gray-200 text-gray-800 w-max max-w-[18rem] rounded-md px-4 py-3 h-min">
                  *loading*
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="relative  w-[80%] bottom-4 flex justify-center">
              <textarea
                value={theInput}
                onChange={(event) => setTheInput(event.target.value)}
                className="w-[85%] h-10 px-3 rounded-l-md py-2 resize-none overflow-y-auto text-black bg-gray-300 rouded"
                onKeyDown={Submit}
              />
              <button
                onClick={callGetResponse}
                className=" bg-[#1f3878] rounded-r-md text-white px-4 py-2 rounded-sm "
              >
                send
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
