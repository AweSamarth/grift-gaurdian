import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function Navbar() {
  return (
    <div className="flex h-16    w-full bg-[#283d73] items-center justify-between  fixed top-0 px-3 py-2">
      <Link href="/"><div className={"text-2xl self font-bold text-white"}>GriftGaurdian</div></Link>
      <div className="flex justify-center items-center px-8 h-[3.4rem] rounded-md  gap-8 bg-[#283d73]">
        <Link href="/secure-me"><Button className="bg-[#283d73] text-white hover:bg-[#1e2e56]">
          Check Security
        </Button></Link>
        <Link href="/contribute-knowledge"><Button className="bg-[#283d73] text-white hover:bg-[#1e2e56]">
          Contribute Knowledge
        </Button></Link>


        <div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
