import Head from "next/head";
import Header from "../components/Header";
import { ReactNode } from "react";
import HeaderAdmin from "@/components/admin/HeaderAdmin";

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export default function LayoutAdmin({ children, pageTitle }: LayoutProps) {
  return (
    <>
      <Head>
        <title>The Admin Corner - {pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[100vh]">
        <HeaderAdmin />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
