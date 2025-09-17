"use client"
import { ThemeToggle } from "@/components/shared/theme-toggle"
export default function CommunityDocs() {
  const docs = [
    {
      title: "Getting Started with Web Development",
      author: "Alice",
      excerpt: "A beginner’s guide to HTML, CSS, and JavaScript basics.",
    },
    {
      title: "Understanding Async/Await in JavaScript",
      author: "Bob",
      excerpt: "Simplify handling of promises with async/await syntax.",
    },
    {
      title: "Intro to Machine Learning",
      author: "Charlie",
      excerpt: "An overview of ML concepts and how they are applied in real-world problems.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-secondary">
        <h1 className="text-2xl font-bold">Community Docs</h1>
        <div className="flex justify-center items-center gap-4">
          <a
            href="/editor"
            className="hover:text-blue-600 text-white rounded-lg transition text-sm"
          >
            Post a Doc
          </a>
          <ThemeToggle />
        </div>

      </header>

      {/* Docs List */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Latest Docs</h2>
        <div className="space-y-6">
          {docs.map((doc, idx) => (
            <div
              key={idx}
              className="p-6  rounded-xl hover:bg-card/80 transition bg-card"
            >
              <h3 className="text-xl font-semibold">{doc.title}</h3>
              <p className="text-foreground text-sm mb-2">By {doc.author}</p>
              <p className="text-foreground/50 mb-4">{doc.excerpt}</p>
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Read full doc →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
