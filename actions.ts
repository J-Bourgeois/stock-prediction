"use server";

import prisma from "./lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/session";
import { redirect } from "next/navigation";

const signupLoginSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim(),
});

export async function signUp(prevState: any, formdata: FormData) {
  
  const parsed = signupLoginSchema.safeParse(Object.fromEntries(formdata));

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      errors: {
        email: ["A user with this email already exists"],
      },
    };
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword: hashedPassword,
    },
  });

  redirect("/login");
}

export async function logIn(prevState: any, formdata: FormData) {
  const result = signupLoginSchema.safeParse(Object.fromEntries(formdata));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.hashedPassword))) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = await encrypt({ sub: user.id, email: user.email });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt
  });

  redirect("/[user]/portfolio");
}

export async function logOut() {
  (await cookies()).delete("token");
  redirect("/login")
}
