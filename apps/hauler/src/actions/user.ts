"use server";

import { PrismaClient } from "@repo/db";

const prisma = new PrismaClient();

export async function submitAddUser(formData: FormData) {
  await prisma.user.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    },
  });
}
