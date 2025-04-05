"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { useMessage } from "@/context/GeminiOutput";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogOverlay } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SaveButton() {
  const { message } = useMessage("");
  const [open, setOpen] = useState(false);
  const [fileType, setFileType] = useState("md");
  const [filename, setFilename] = useState("content");

  const isEmpty = message.trim().length === 0;

  const fileSize = useMemo(() => {
    if (isEmpty) return 0;
    const content = fileType === "json" ? JSON.stringify({ content: message }, null, 2) : message;
    return new Blob([content]).size;
  }, [message, fileType, isEmpty]);

  const handleDownload = () => {
    if (isEmpty) {
      toast.error("Cannot save empty content.");
      return;
    }

    let mimeType = "text/plain";
    let extension = "txt";
    let content: string | Blob = message;

    switch (fileType) {
      case "md":
        mimeType = "text/markdown";
        extension = "md";
        break;
      case "json":
        mimeType = "application/json";
        content = JSON.stringify({ content: message }, null, 2);
        extension = "json";
        break;
      case "html":
        mimeType = "text/html";
        content = `<html><body><pre>${message.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</pre></body></html>`;
        extension = "html";
        break;
    }

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename || "content"}.${extension}`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("File saved!");
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
          <DialogTitle>Save File</DialogTitle>
          <DialogDescription>Select a file type and save the content.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Filename</label>
            <Input placeholder="Enter filename" value={filename} onChange={(e) => setFilename(e.target.value)} className="bg-slate-700 text-white border border-white/20" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">File type</label>
            <Select value={fileType} onValueChange={setFileType}>
              <SelectTrigger className="w-full bg-slate-700 text-white border border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 text-white">
                <SelectItem value="md">📝 Markdown (.md)</SelectItem>
                <SelectItem value="txt">📄 Text (.txt)</SelectItem>
                <SelectItem value="json">🧾 JSON (.json)</SelectItem>
                <SelectItem value="html">🌐 HTML (.html)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!isEmpty && <p className="text-sm text-slate-400">Estimated file size: {(fileSize / 1024).toFixed(2)} KB</p>}

          {isEmpty && <p className="text-sm text-red-400">Editor is empty. Please add content to save.</p>}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleDownload} disabled={isEmpty}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
