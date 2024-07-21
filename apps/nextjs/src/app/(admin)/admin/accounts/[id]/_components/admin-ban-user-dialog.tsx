"use client";

import { banUserInput } from "@2up/api/admin/admin-schema";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@2up/ui/alert-dialog";
import { Button } from "@2up/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@2up/ui/form";
import { Input } from "@2up/ui/input";
import { toast } from "@2up/ui/toast";

import { api } from "@/trpc/react";

export const AdminBanUserDialog = (
  props: React.PropsWithChildren<{
    userId: string;
  }>,
) => {
  const banUserAction = api.admin.banUser.useMutation({
    onSuccess: () => {
      toast.success("User banned successfully");
    },
    onError: () => {
      toast.error("There was an error. Please try again later.");
    },
  });
  const form = useForm({
    schema: banUserInput,
    defaultValues: {
      userId: props.userId,
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ban User</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to ban this user?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col space-y-8"
            onSubmit={form.handleSubmit((data) => {
              return banUserAction.mutate(data);
            })}
          >
            <FormField
              name="confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type <b>CONFIRM</b> to confirm
                  </FormLabel>

                  <FormControl>
                    <Input
                      required
                      pattern="CONFIRM"
                      placeholder="Type CONFIRM to confirm"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    Are you sure you want to do this?
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <Button type="submit" variant="destructive">
                Ban User
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};