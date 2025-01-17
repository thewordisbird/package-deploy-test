import { prisma } from "@repo/db";

export default async function Page() {
  const users = await prisma.user.findMany();

  console.log("user", users);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {users.map((user) => (
          <div key={user.id} className="flex gap-4 items-center">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
