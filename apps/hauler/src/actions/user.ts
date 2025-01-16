"use server";

import { prisma } from "@repo/db";

export async function submitAddUser(formData: FormData) {
  await prisma.user.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    },
  });
}
