/**
 * ChangeUserInfoForm Component
 * 
 * A comprehensive form component that allows users to update their account information
 * through a tabbed interface. Handles three types of user information updates:
 * - Name change
 * - Email change (requires re-authentication)
 * - Password change (requires re-authentication)
 * 
 * Features:
 * - Tabbed interface for organized form sections
 * - Form validation with error display
 * - Server actions integration for each update type
 * - Loading states during form submission
 * - Success notifications via toast messages
 * - Current information display
 * - Secure password handling
 * - Auto-logout on sensitive changes (email/password)
 * 
 * Props:
 * @param {string | undefined} userName - Current user's name
 * @param {string | undefined} userEmail - Current user's email address
 * 
 * State Management:
 * - Uses useActionState for handling form submissions
 * - Separate states for name, email, and password updates
 * - Loading states managed through useFormStatus
 * 
 * Security:
 * - Client-side component with "force-dynamic" rendering
 * - Protected routes and authenticated actions
 * - Secure password input fields
 */

"use client";

export const dynamic = "force-dynamic";

import { changeName, changeEmail, changePassword } from "@/actions";
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

  useEffect(() => {
    if (nameState?.success) {
      toast("Name successfully changed!");
    }
  }, [nameState]);

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
                    {emailState?.errors?.currentEmail && (
                      <p className="text-sm text-red-500">
                        {emailState.errors.currentEmail}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newEmail">New Email</Label>
                    <Input id="newEmail" name="newEmail" defaultValue="" />
                    {emailState?.errors?.newEmail && (
                      <p className="text-sm text-red-500">
                        {emailState.errors.newEmail}
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
                      type="password"
                    />
                    {passwordState?.errors?.currentPassword && (
                      <p className="text-sm text-red-500">
                        {passwordState.errors.currentPassword}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      defaultValue=""
                      type="password"
                    />
                    {passwordState?.errors?.newPassword && (
                      <p className="text-sm text-red-500">
                        {passwordState.errors.newPassword}
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
      </Tabs>
    </div>
  );
}

/**
 * Internal submit button component with loading state.
 * Shows "Saving..." during form submission.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="m-auto bg-slate-800 rounded-xl text-center p-2 w-6/12"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}
