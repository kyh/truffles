import type { GetAccountsInput } from "@init/api/admin/admin-schema";
import { PageHeader } from "@/components/header";
import { api, HydrateClient } from "@/trpc/server";
import { AdminAccountsTable } from "./_components/admin-accounts-table";

type SearchParams = GetAccountsInput;

export const metadata = {
  title: `Accounts`,
};

const Page = async (props: { searchParams: Promise<SearchParams> }) => {
  const searchParams = await props.searchParams;
  void api.admin.getAccounts.prefetch(searchParams);

  return (
    <HydrateClient>
      <main className="flex flex-1 flex-col px-5">
        <PageHeader>Accounts</PageHeader>
        <AdminAccountsTable searchParams={searchParams} />
      </main>
    </HydrateClient>
  );
};

export default Page;
