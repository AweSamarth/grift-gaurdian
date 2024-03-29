import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, moonbaseAlpha } from 'wagmi/chains'
import {injected} from 'wagmi/connectors'

export const workingConfig = createConfig({
    chains: [sepolia],
    connectors: [injected()], 
    transports: {
      // the above is to be replaced by GetBlock's RPC provider links. However, shared nodes are not available for moonbase alpha and it
      // wasn't possible to get in touch with team GetBlock to get a free API key for the moonbase alpha network. The process of 
      // using GetBlock's RPC provider links is the same as the one used for sepolia, as shown below.
      [sepolia.id]: http("https://1rpc.io/sepolia"),
    },
  
  }); 