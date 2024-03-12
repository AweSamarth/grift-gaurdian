'use client'
import { useState } from "react"
export default function SecureMe(){
    const [messages, setMessages] = useState<any>([])

    const callGetResponse = async()=>{

        setIsLoading(true);
        let temp = messages;
        temp.push({ role: "user", content: theInput });
        setMessages(temp)
        setTheInput("");
      const response = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify({messages}),
      })
      if(response.ok){
       const data = await response.json()
       console.log(data)
       const {output} = data
       setMessages((prevMessages:any) => [...prevMessages, output]);
       setIsLoading(false);
      }
      else{
        console.log("Error")
      
      }
    }
    

    const [theInput, setTheInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
  
  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        callGetResponse();
      }
    };
    
    
    
    
    
    
    <button onClick={callGetResponse} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Get </button>


}