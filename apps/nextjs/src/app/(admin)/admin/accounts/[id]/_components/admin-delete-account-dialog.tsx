"use client";

import { deleteAccountInput } from "@2up/api/admin/admin-schema";
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
  useForm,
} from "@2up/ui/form";
import { Input } from "@2up/ui/input";
import { toast } from "@2up/ui/toast";

import { api } from "@/trpc/react";

export const AdminDeleteAccountDialog = (
  props: React.PropsWithChildren<{
    accountId: string;
  }>,
) => {
  const deleteAccountAction = api.admin.deleteAccount.useMutation({
    onSuccess: () => toast.success("Account deleted successfully"),
    onError: () => toast.error("There was an error deleting the account"),
  });

  const form = useForm({
    schema: deleteAccountInput,
    defaultValues: {
      accountId: props.accountId,
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete this account? All the data
            associated with this account will be permanently deleted. Any active
            subscriptions will be canceled.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col space-y-8"
            onSubmit={form.handleSubmit((data) => {
              return deleteAccountAction.mutate(data);
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
                      pattern="CONFIRM"
                      required
                      placeholder="Type CONFIRM to confirm"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    Are you sure you want to do this? This action cannot be
                    undone.
                  </FormDescription>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <Button
                type="submit"
                variant="destructive"
                loading={deleteAccountAction.isPending}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};