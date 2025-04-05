"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export function TeamSection() {
  const team = [
    {
      name: "Jit Debnath",
      role: "Developer",
      bio: "Web2 from heart ",
      image:
        "https://oagsprvqqc.ufs.sh/f/UfD2xF6GnX2EcfL01UJlA8B2dm9fC0gPJsvMEn6zkheIaXpO",
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
      ens: "",
    },
    {
      name: "Pratham Jaiswal",
      role: "Developer",
      bio: "web3 expert",
      image:
        "https://oagsprvqqc.ufs.sh/f/UfD2xF6GnX2EI9FpHcecz612d4SKJMTHQyU370YronPkNapj",

      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
      ens: "",
    },
    {
      name: "Krish Gupta",
      role: "Developer",
      bio: "Web3 UX specialist",
      image:
        "https://oagsprvqqc.ufs.sh/f/UfD2xF6GnX2EdslccVBUZ879gYx1z3d0IabJOQcrH5BtpuTW",
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
      ens: "",
    },
    {
      name: "Rohit Kundu",
      role: "Developer",
      bio: "Bug fixer",
      image:
        "https://oagsprvqqc.ufs.sh/f/UfD2xF6GnX2ESBUo4HUg2GnitkYa9ybdIZxgCUjQHvzoBF0e",
      socials: {
        twitter: "#",
        github: "#",
        linkedin: "#",
      },
      ens: "",
    },
  ];

  return (
    <section id="team" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          Meet Our Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Industry experts building the future of decentralized finance
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#00f3ff]/30 transition-all duration-300 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={250}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-lg">{member.name}</p>
                  <p className="text-[#00f3ff]">{member.role}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-400 text-sm mb-3">{member.bio}</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <a
                      href={member.socials.twitter}
                      className="text-gray-400 hover:text-[#00f3ff] transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href={member.socials.github}
                      className="text-gray-400 hover:text-[#00f3ff] transition-colors"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      className="text-gray-400 hover:text-[#00f3ff] transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                  <div className="text-[#bc00ff] text-sm font-mono">
                    {member.ens}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
