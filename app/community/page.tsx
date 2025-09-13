// app/community/page.tsx  (Next.js 13+ with App Router)
// or pages/community.tsx (Next.js <=12)

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
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <h1 className="text-2xl font-bold">Community Docs</h1>
        <a
          href="#"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Post a Doc
        </a>
      </header>

      {/* Docs List */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Latest Docs</h2>
        <div className="space-y-6">
          {docs.map((doc, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{doc.title}</h3>
              <p className="text-gray-500 text-sm mb-2">By {doc.author}</p>
              <p className="text-gray-700 mb-4">{doc.excerpt}</p>
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
