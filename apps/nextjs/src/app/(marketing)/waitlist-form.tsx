"use client";

import { Button } from "@init/ui/button";
import { toast } from "@init/ui/toast";

import type { TRPCError } from "@/trpc/react";
import { api } from "@/trpc/react";

export const WaitlistForm = () => {
  const joinWaitlist = api.waitlist.join.useMutation();

  const onJoinWaitlist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() ?? "";
    toast.promise(joinWaitlist.mutateAsync({ email }), {
      loading: "Submitting...",
      success: "Waitlist joined!",
      error: (error: TRPCError) => error.message,
    });
  };

  return (
    <form
      onSubmit={onJoinWaitlist}
      className="mt-10 flex max-w-sm items-center gap-2 rounded-xl border border-white/10 bg-input px-4 py-1.5 shadow-lg"
    >
      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          className="w-full border-none bg-transparent text-sm placeholder-white/50 focus:placeholder-white/75 focus:outline-none focus:ring-0"
          id="email"
          type="email"
          name="email"
          placeholder="name@example.com"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={joinWaitlist.isPending}
        />
      </div>
      <Button
        className="p-0 text-xs"
        variant="ghost"
        loading={joinWaitlist.isPending}
      >
        Join Waitlist
      </Button>
    </form>
  );
};
