"use server"

import { TabsDemo } from "@/components/ChangeUserInfoForm";
import UserDataProvider from "@/lib/UserDataProvider";

export default async function User({ params }: { params: { user: string } }) {
  const { user } = await params;

  const userInfo = await UserDataProvider();
  
  return (
    <div className="flex flex-col items-center mt-6 w-full">
      <h1 className="pb-4">{`Welcome ${user}`}</h1>
      <TabsDemo />
    </div>
  );
}
