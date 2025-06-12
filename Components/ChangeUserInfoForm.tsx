"use client";

export const dynamic = 'force-dynamic';

import { changeName, changeEmail, changePassword } from "@/actions";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActionState, useEffect } from "react";

import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface UserInfoProps {
  userName: string | undefined;
  userEmail: string | undefined;
}

export function ChangeUserInfoForm({ userName, userEmail }: UserInfoProps) {
  const [nameState, nameAction] = useActionState(changeName, undefined);
  const [emailState, emailAction] = useActionState(changeEmail, undefined);
  const [passwordState, passwordAction] = useActionState(
    changePassword,
    undefined
  );

  const searchParams = useSearchParams();
  const nameChangeSuccess = searchParams.get("nameChange") === "success";

  useEffect(() => {
    if (nameChangeSuccess) {
      toast("Name succesfully changed!");
    }
  }, [nameChangeSuccess]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <Tabs defaultValue="name">
        <TabsList>
          <TabsTrigger value="name">Name</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="name">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={nameAction} autoComplete="on">
                <div className="grid gap-6 p-2">
                  <div className="grid gap-3">
                    <Label htmlFor="currentName">Current Name</Label>
                    <Input
                      id="currentName"
                      name="currentName"
                      defaultValue={userName}
                      readOnly
                    />
                    {nameState?.errors?.currentName && (
                      <p className="text-sm text-red-500">
                        {nameState.errors.currentName}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newName">New Name</Label>
                    <Input id="newName" name="newName" defaultValue="" />
                    {nameState?.errors?.newName && (
                      <p className="text-sm text-red-500">
                        {nameState.errors.newName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex pt-6 -mr-6">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Change your email here. After saving, you&apos;ll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={emailAction} autoComplete="on">
                <div className="grid gap-6 p-2">
                  <div className="grid gap-3">
                    <Label htmlFor="currentEmail">Current Email</Label>
                    <Input
                      id="currentEmail"
                      name="currentEmail"
                      defaultValue={userEmail}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newEmail">New Email</Label>
                    <Input id="newEmail" name="newEmail" defaultValue="" />
                  </div>
                </div>
                <div className="flex pt-6 -mr-6">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={passwordAction} autoComplete="on">
                <div className="grid gap-6 p-2">
                  <div className="grid gap-3">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      defaultValue=""
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="flex pt-6 -mr-6">
                  <SubmitButton />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="m-auto bg-slate-800 rounded-xl text-center p-2 w-6/12"
    >
      Save changes
    </button>
  );
}
