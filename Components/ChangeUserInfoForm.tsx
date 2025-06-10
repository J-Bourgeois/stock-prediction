"use client";

import { changeName, changeEmail, changePassword } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActionState } from "react";

import {  useFormStatus } from "react-dom";

interface UserInfoProps {
  userName: string | undefined,
};

export function ChangeUserInfoForm({ userName }: UserInfoProps) {

  const [nameState, nameAction] = useActionState(changeName, undefined);
  const [emailState, emailAction] = useActionState(changeEmail, undefined);
  const [passwordState, passwordAction] = useActionState(changePassword, undefined);

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
              <form action="">

              </form>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
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
            <CardContent className="grid gap-6 p-2">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current Email</Label>
                <Input id="tabs-demo-name" defaultValue="" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New Email</Label>
                <Input id="tabs-demo-username" defaultValue="" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
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
            <CardContent className="grid gap-6 p-2">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current Password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New Password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
