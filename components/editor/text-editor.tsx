// TODO: This is a very basic implementation.

"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Writer() {
    const [content, setContent] = useState("");
    const editorRef = useRef<HTMLDivElement>(null);

    // Convert Markdown-like syntax to HTML
    const parseContentToHTML = (text: string) => {
        const lines = text.split("\n");
        return lines
            .map((line) => {
                if (line.startsWith("### ")) return `<h3>${line.substring(4)}</h3>`;
                if (line.startsWith("## ")) return `<h2>${line.substring(3)}</h2>`;
                if (line.startsWith("# ")) return `<h1>${line.substring(2)}</h1>`;
                if (line.trim() === "") return "<div style='height:1em'></div>";
                return `<p>${line}</p>`;
            })
            .join("");
    };

    // Save cursor position
    const saveSelection = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return null;
        return sel.getRangeAt(0);
    };

    // Restore cursor position
    const restoreSelection = (range: Range | null) => {
        if (!range) return;
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    const handleInput = () => {
        if (editorRef.current) {
            const text = editorRef.current.innerText;
            setContent(text);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            document.execCommand("insertText", false, "  ");
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            const range = saveSelection(); // save cursor
            editorRef.current.innerHTML = parseContentToHTML(content); // render HTML
            restoreSelection(range); // restore cursor
        }
    }, [content]);

    return (
        <div className="mx-auto min-h-screen w-full p-4">
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className="w-full p-4 rounded-lg border focus:outline-none min-h-[200px]"
            ></div>
        </div>
    );
}
