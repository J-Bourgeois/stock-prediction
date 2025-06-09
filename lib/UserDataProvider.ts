import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";

export default async function UserDataProvider() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const session = await verifyJwt(token);

    if (!session) return null;

    const { email } = session as { email: string };

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return { id: user?.id, name: user?.name }

  } catch (error) {
    console.log("Failed to get user ID from token:", error);
  }
}
