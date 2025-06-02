"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogOutModal() {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild>
        <div>
          {" "}
          <span className="login">Logout</span>
          <Button
            variant="ghost"
            className="sm:hidden p-0 hover:bg-transparent"
          >
            <LogOut className="mt-4 size-10 text-destructive" />
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out of your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsAlertDialogOpen(false)}
            className="hover:bg-foreground hover:text-red-400 text-red-500 cursor-pointer"
          >
            No
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              await handleLogout();
              setIsAlertDialogOpen(false);
            }}
            className="bg-muted-foreground text-destructive-foreground hover:bg-muted-foreground/70 cursor-pointer"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
