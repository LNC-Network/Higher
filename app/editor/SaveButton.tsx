"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { useMessage } from "@/context/GeminiOutput";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogOverlay } from "@/components/ui/dialog";

export default function SaveButton() {
  const { message } = useMessage("");
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "message.txt";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md">
          <ArrowDownToLine size={18} />
          Save
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
      <DialogContent className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-white">
        <DialogHeader>
          <DialogTitle>Save to File</DialogTitle>
          <DialogDescription>Do you want to save the current message to a `.txt` file?</DialogDescription>
        </DialogHeader>

        <div className="bg-gray-100 rounded-md p-4 mt-4 max-h-40 overflow-auto text-sm text-gray-700">{message || "No content available."}</div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleDownload}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
