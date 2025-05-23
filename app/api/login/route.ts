import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/session";

export async function POST(req: Response) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await compare(password, user.password))) {
    return new Response(
      JSON.stringify({ error: "Invalid email or password" }),
      {
        status: 401,
      }
    );
  }

  const token = await encrypt({ sub: user.id, email: user.email });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600,
    path: "/",
  });

  return new Response(JSON.stringify({ success: true }));
}
