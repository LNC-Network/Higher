"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Code, Quote, PenLine, Eye, Columns } from "lucide-react";
import { useMessage } from "@/context/GeminiOutput";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const { message } = useMessage("");

  useEffect(() => {
    setMarkdown(message);
  }, [message]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const insertMarkdown = (tag: string): void => {
    const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const selectedText = markdown.substring(start, end);
    let replacement = "";

    switch (tag) {
      case "bold":
        replacement = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        replacement = `*${selectedText || "italic text"}*`;
        break;
      case "h1":
        replacement = `\n# ${selectedText || "Heading 1"}\n`;
        break;
      case "h2":
        replacement = `\n## ${selectedText || "Heading 2"}\n`;
        break;
      case "ul":
        replacement = `\n- ${selectedText || "List item"}\n`;
        break;
      case "ol":
        replacement = `\n1. ${selectedText || "List item"}\n`;
        break;
      case "code":
        replacement = selectedText ? `\`${selectedText}\`` : "```\ncode block\n```";
        break;
      case "blockquote":
        replacement = `\n> ${selectedText || "Blockquote"}\n`;
        break;
      default:
        replacement = selectedText;
    }

    const newMarkdown = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(newMarkdown);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + replacement.length;
      textarea.selectionEnd = start + replacement.length;
    }, 0);
  };

  const renderMarkdown = (content: string) => {
    const components: Components = {
      h1: ({ children }: React.PropsWithChildren<{}>) => <h1 className="text-2xl font-bold my-4 dark:text-gray-100">{children}</h1>,
      h2: ({ children }: React.PropsWithChildren<{}>) => <h2 className="text-xl font-bold my-3 dark:text-gray-100">{children}</h2>,
      h3: ({ children }: React.PropsWithChildren<{}>) => <h3 className="text-lg font-bold my-2 dark:text-gray-100">{children}</h3>,
      p: ({ children }: React.PropsWithChildren<{}>) => <p className="my-2 dark:text-gray-200">{children}</p>,
      ul: ({ children }: React.PropsWithChildren<{}>) => <ul className="list-disc pl-6 my-2 dark:text-gray-200">{children}</ul>,
      ol: ({ children }: React.PropsWithChildren<{}>) => <ol className="list-decimal pl-6 my-2 dark:text-gray-200">{children}</ol>,
      blockquote: ({ children }: React.PropsWithChildren<{}>) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 dark:border-gray-600 dark:text-gray-300">{children}</blockquote>,
      code: ({ inline, className, children }: { inline?: boolean; className?: string; children: React.ReactNode }) =>
        inline ? (
          <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm dark:text-cyan-300">{children}</code>
        ) : (
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded my-2 overflow-x-auto border dark:border-gray-700">
            <code className={`${className} dark:text-cyan-300`}>{children}</code>
          </pre>
        ),
      a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
        <a href={href} className="text-blue-600 hover:underline dark:text-blue-400">
          {children}
        </a>
      ),
      table: ({ children }: React.PropsWithChildren<{}>) => (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">{children}</table>
        </div>
      ),
      thead: ({ children }: React.PropsWithChildren<{}>) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>,
      tbody: ({ children }: React.PropsWithChildren<{}>) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>,
      tr: ({ children }: React.PropsWithChildren<{}>) => <tr className="dark:border-gray-700">{children}</tr>,
      th: ({ children }: React.PropsWithChildren<{}>) => <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700 dark:text-gray-200">{children}</th>,
      td: ({ children }: React.PropsWithChildren<{}>) => <td className="px-4 py-2 border border-gray-300 dark:border-gray-700 dark:text-gray-300">{children}</td>,
      hr: () => <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />,
      img: (props) => <img {...props} className="max-w-full h-auto my-4 rounded" />,
    };

    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]} components={components}>
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <Tabs defaultValue="edit" className={`w-full h-screen flex flex-col`}>
      <div className="border rounded-lg shadow-sm dark:border-gray-700 flex flex-col flex-1 dark:bg-gray-900">
        {/* Toolbar */}
        <div className="border-b p-2 bg-muted/30 flex items-center gap-1 overflow-x-auto dark:bg-gray-800 dark:border-gray-700">
          {[
            ["bold", Bold],
            ["italic", Italic],
            ["h1", Heading1],
            ["h2", Heading2],
            ["ul", List],
            ["ol", ListOrdered],
            ["code", Code],
            ["blockquote", Quote],
          ].map(([tag, Icon]) => {
            const TagIcon = Icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
            return (
              <Button key={tag as string} variant="ghost" size="icon" onClick={() => insertMarkdown(tag as string)} title={tag as string} className="dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                <TagIcon className="h-4 w-4" />
              </Button>
            );
          })}
          <div className="h-6 w-px bg-border mx-2 dark:bg-gray-600" />

          <TabsList className="h-8 bg-transparent dark:bg-gray-800">
            <TabsTrigger value="edit" className="flex items-center gap-1 px-2 h-8 data-[state=active]:bg-background dark:text-gray-300 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white">
              <PenLine className="h-4 w-4" />
              <span>Edit</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-1 px-2 h-8 data-[state=active]:bg-background dark:text-gray-300 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger value="split" className="flex items-center gap-1 px-2 h-8 data-[state=active]:bg-background dark:text-gray-300 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white">
              <Columns className="h-4 w-4" />
              <span>Split</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="edit" className="h-full">
            <textarea id="markdown-textarea" value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none dark:bg-gray-900 dark:text-gray-100 dark:caret-cyan-400" placeholder="Type your markdown here..." />
          </TabsContent>

          <TabsContent value="preview" className="h-full overflow-auto dark:bg-gray-900">
            <div className="max-w-none p-4 min-h-full">{renderMarkdown(markdown)}</div>
          </TabsContent>

          <TabsContent value="split" className="h-full">
            <div className="grid grid-cols-2 h-full">
              <textarea
                id="markdown-textarea-split"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none border-r dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:caret-cyan-400"
                placeholder="Type your markdown here..."
              />
              <div className="max-w-none p-4 overflow-auto dark:bg-gray-900">{renderMarkdown(markdown)}</div>
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
