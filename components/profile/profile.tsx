// app/profile/page.tsx  (Next.js 13+ with App Router)
// or pages/profile.tsx (Next.js <=12)
"use client"

import Image from "next/image";

export default function ProfilePage() {
  const user = {
    name: "Jit Debnath",
    bio: "Engineering student, web developer, and writer. I love coding and sharing thoughts.",
    avatar:
      "https://ui-avatars.com/api/?name=Jit+Debnath&background=0D8ABC&color=fff",
  };

  const posts = [
    {
      title: "My First Writing Journey",
      date: "Sept 5, 2025",
      excerpt: "How I started writing and why I decided to share my thoughts online.",
    },
    {
      title: "Learning Next.js with Tailwind",
      date: "Aug 28, 2025",
      excerpt: "Quick guide on setting up a project with Next.js and Tailwind CSS.",
    },
    {
      title: "Balancing Coding and Writing",
      date: "Aug 10, 2025",
      excerpt: "Thoughts on managing time between software development and creative writing.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Profile Header */}
      <section className="bg-secondary shadow py-10 px-6 text-center">
        <Image
          src={user.avatar}
          alt={user.name}
          height={24}
          width={24}
          className=" rounded-full mx-auto mb-4 shadow"
        />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className=" mt-2 max-w-md mx-auto">{user.bio}</p>
      </section>

      {/* Posts */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Posts</h2>
        {posts.length === 0 ? (
          <p className="">You haven’t written any posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm  mb-2">{post.date}</p>
                <p className=" mb-4">{post.excerpt}</p>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Read more →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
