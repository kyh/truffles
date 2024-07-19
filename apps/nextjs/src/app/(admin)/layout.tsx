import Link from "next/link";
import { Logo } from "@2up/ui/logo";
import { LayoutDashboardIcon, User2Icon } from "lucide-react";

import { NavLink } from "@/components/nav";
import { HydrateClient } from "@/trpc/server";

export const metadata = {
  title: `Super Admin`,
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <HydrateClient>
    <div className="flex min-h-dvh">
      <Sidebar />
      {children}
    </div>
  </HydrateClient>
);

export default Layout;

const Sidebar = async () => (
  <nav className="sticky top-0 flex h-dvh w-[80px] flex-col items-center overflow-y-auto overflow-x-hidden px-4 py-[26px]">
    <div className="flex flex-col">
      <Link href="/dashboard" className="flex justify-center pb-2">
        <Logo
          width={40}
          height={40}
          className="bg-muted text-primary rounded-lg"
        />
        <span className="sr-only">Init</span>
      </Link>
      <NavLink
        href="/admin"
        exact={true}
        className="group flex flex-col items-center gap-1 p-2 text-xs"
      >
        <span className="group-hover:bg-secondary group-data-[state=active]:bg-secondary flex size-9 items-center justify-center rounded-lg transition">
          <LayoutDashboardIcon width={16} height={16} />
        </span>
        <span>Home</span>
      </NavLink>
      <NavLink
        href="/admin/accounts"
        className="group flex flex-col items-center gap-1 p-2 text-xs"
      >
        <span className="group-hover:bg-secondary group-data-[state=active]:bg-secondary flex size-9 items-center justify-center rounded-lg transition">
          <User2Icon width={16} height={16} />
        </span>
        <span>Accounts</span>
      </NavLink>
    </div>
  </nav>
);