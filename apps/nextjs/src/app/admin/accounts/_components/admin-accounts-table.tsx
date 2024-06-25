"use client";

import { use } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetAccountsInput,
  getAccountsInput,
} from "@init/api/admin/admin-schema";
import { Database } from "@init/db/database.types";
import { DataTable } from "@init/ui/data-table/data-table";
import { Form, FormControl, FormField, FormItem } from "@init/ui/form";
import { Input } from "@init/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@init/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDataTable } from "@/hooks/use-data-table";
import { api } from "@/trpc/react";
import { getColumns } from "./admin-accounts-table-columns";

type Account = Database["public"]["Tables"]["accounts"]["Row"];

const FiltersSchema = z.object({
  type: z.enum(["all", "team", "personal"]),
  query: z.string().optional(),
});

export function AdminAccountsTable(
  props: React.PropsWithChildren<{
    searchParams: GetAccountsInput;
    accountsPromise: Promise<{ data: Account[]; pageCount: number }>;
  }>,
) {
  const initialData = use(props.accountsPromise);

  const { data } = api.admin.getAccounts.useQuery(props.searchParams, {
    initialData,
  });

  const { table } = useDataTable({
    data: data.data,
    columns: getColumns(),
    pageCount: data.pageCount ?? 1,
    // optional props
    defaultSort: "created_at.desc",
  });

  return (
    <div className={"flex flex-col space-y-4"}>
      <AccountsTableFilters
        filters={{ type: props.searchParams.account_type ?? "all" }}
      />

      <DataTable table={table} />
    </div>
  );
}

function AccountsTableFilters(props: {
  filters: z.infer<typeof FiltersSchema>;
}) {
  const form = useForm({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      type: props.filters?.type ?? "all",
      query: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const pathName = usePathname();

  const onSubmit = ({ type, query }: z.infer<typeof FiltersSchema>) => {
    const params = new URLSearchParams({
      account_type: type,
      query: query ?? "",
    });

    const url = `${pathName}?${params.toString()}`;

    router.push(url);
  };

  return (
    <div className={"flex items-center justify-between space-x-4"}>
      <div className={"flex space-x-4"}>
        <Form {...form}>
          <form
            className={"flex space-x-4"}
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
          >
            <Select
              value={form.watch("type")}
              onValueChange={(value) => {
                form.setValue(
                  "type",
                  value as z.infer<typeof FiltersSchema>["type"],
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  },
                );

                return onSubmit(form.getValues());
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={"Account Type"} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Account Type</SelectLabel>

                  <SelectItem value={"all"}>All accounts</SelectItem>
                  <SelectItem value={"team"}>Team</SelectItem>
                  <SelectItem value={"personal"}>Personal</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormField
              name={"query"}
              render={({ field }) => (
                <FormItem>
                  <FormControl className={"w-full min-w-36 md:min-w-72"}>
                    <Input
                      className={"w-full"}
                      placeholder={`Search account...`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
