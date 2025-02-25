"use client";

import { useState } from "react";

function Banner({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-700"
      : "bg-red-100 border-red-500 text-red-700";

  return (
    <div className={`p-4 mb-4 border-l-4 ${bgColor}`} role="alert">
      {message}
    </div>
  );
}

export default function AddUserForm() {
  const [banner, setBanner] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      // Clear the form
      (event.target as HTMLFormElement).reset();
      setBanner({ message: "User added successfully", type: "success" });

      // Clear success message after 3 seconds
      setTimeout(() => setBanner(null), 3000);
    } catch (error) {
      console.error("Error adding user:", error);
      setBanner({ message: "Failed to add user", type: "error" });

      // Clear error message after 3 seconds
      setTimeout(() => setBanner(null), 3000);
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {banner && <Banner message={banner.message} type={banner.type} />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="my-email@email.com"
            className="text-black"
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Add User
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
