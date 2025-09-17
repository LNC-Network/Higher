// app/page.tsx (Next.js 13+ with App Router)
// or pages/index.tsx (Next.js <=12)

import { ThemeToggle } from "@/components/shared/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow bg-secondary">
        <h1 className="text-3xl">Higher</h1>
        <nav className="space-x-4 flex justify-center items-center">
          <a href="/community" className="hover:text-blue-600">Community</a>
          <a href="/profile" className="hover:text-blue-600">Profile</a>
          <ThemeToggle />
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to My Writing Space ✍️</h2>
        <p className="text-lg text-foreground max-w-xl mx-auto">
          A place where I share my thoughts, essays, and stories.
          Simple, clean, and focused on words.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Start Reading
        </button>
      </section>

      {/* Posts Preview */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Recent Posts</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {["Why I Write", "Minimalism in Coding", "Thoughts on Creativity"].map(
            (title, idx) => (
              <div key={idx} className="p-6 bg-card rounded-xl shadow hover:shadow-md transition">
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-foreground text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a metus ac nulla.
                </p>
                <a href="#" className="text-blue-600 hover:underline text-sm">Read more →</a>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t mt-12">
        © {new Date().getFullYear()} My Writings. All rights reserved.
      </footer>
    </main >
  );
}
