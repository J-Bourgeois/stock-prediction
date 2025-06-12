"use server"

import { ChangeUserInfoForm } from "@/components/ChangeUserInfoForm";
import { verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function User({ params }: { params: { user: string } }) {
  const { user } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const session = await verifyJwt(token);

  if (!session) redirect("/login");
  
  const { email } = session as { email: string};

  const dbUser = await prisma.user.findUnique({
    where: { email }
  })

  return (
    <div className="flex flex-col items-center mt-6 w-full">
      <h1 className="pb-12">{`${dbUser?.name}'s Account Page`}</h1>
      <h3 className="pb-12">Use forms below to change account information</h3>
      <ChangeUserInfoForm userName={dbUser?.name} userEmail={dbUser?.email}/>
    </div>
  );
}
