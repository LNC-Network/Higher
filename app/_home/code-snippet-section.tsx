"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CodeSnippetSection() {
  const [activeTab, setActiveTab] = useState("solidity");

  const codeSnippets = {
    solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DecentraHubNFT {
    uint256 private _tokenIds;
    mapping(uint256 => address) private _owners;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    
    function mint() external returns (uint256) {
        _tokenIds++;
        _owners[_tokenIds] = msg.sender;
        
        emit Transfer(address(0), msg.sender, _tokenIds);
        return _tokenIds;
    }
}`,
    rust: `use anchor_lang::prelude::*;

#[program]
pub mod decentra_hub {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}`,
    typescript: `import { ethers } from 'ethers';

async function connectWallet() {
  if (window.ethereum) {
    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      console.log("Connected to wallet:", accounts[0]);
      return { provider, signer, account: accounts[0] };
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.error("Please install MetaMask or another Web3 wallet");
  }
}`,
  };

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Build with Web3
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our smart contract templates and code snippets to jumpstart
          your dApp development
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="bg-black/40 backdrop-blur-lg border border-[#00f3ff]/20 overflow-hidden">
          <Tabs
            defaultValue="solidity"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="border-b border-white/10 px-4">
              <TabsList className="bg-transparent h-14">
                <TabsTrigger
                  value="solidity"
                  className={`data-[state=active]:text-[#00f3ff] data-[state=active]:border-b-2 data-[state=active]:border-[#00f3ff] transition-all duration-200 rounded-none ${
                    activeTab === "solidity"
                      ? "text-[#00f3ff]"
                      : "text-gray-400"
                  }`}
                >
                  Solidity
                </TabsTrigger>
                <TabsTrigger
                  value="rust"
                  className={`data-[state=active]:text-[#bc00ff] data-[state=active]:border-b-2 data-[state=active]:border-[#bc00ff] transition-all duration-200 rounded-none ${
                    activeTab === "rust" ? "text-[#bc00ff]" : "text-gray-400"
                  }`}
                >
                  Rust (Solana)
                </TabsTrigger>
                <TabsTrigger
                  value="typescript"
                  className={`data-[state=active]:text-[#00f3ff] data-[state=active]:border-b-2 data-[state=active]:border-[#00f3ff] transition-all duration-200 rounded-none ${
                    activeTab === "typescript"
                      ? "text-[#00f3ff]"
                      : "text-gray-400"
                  }`}
                >
                  TypeScript
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="solidity" className="p-6 mt-0">
              <pre className="font-mono text-sm text-gray-300 overflow-x-auto p-4 bg-black/60 rounded-md">
                <code>{codeSnippets.solidity}</code>
              </pre>
            </TabsContent>

            <TabsContent value="rust" className="p-6 mt-0">
              <pre className="font-mono text-sm text-gray-300 overflow-x-auto p-4 bg-black/60 rounded-md">
                <code>{codeSnippets.rust}</code>
              </pre>
            </TabsContent>

            <TabsContent value="typescript" className="p-6 mt-0">
              <pre className="font-mono text-sm text-gray-300 overflow-x-auto p-4 bg-black/60 rounded-md">
                <code>{codeSnippets.typescript}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </section>
  );
}
