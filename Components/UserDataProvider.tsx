
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";
import AppNavbar from "./app-sidebar";

export default async function UserDataProvider() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const session = await verifyJwt(token);

  let userId = null;

  if (!session) return;

  const { email } = session as { email: string };

  const user = await prisma.user.findUnique({
    where: { email },
  });

  userId = user?.id ?? null;


  return <AppNavbar userId={userId}/>
}
