import Head from "next/head";
import Header from "../components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, pageTitle, onSearch }: LayoutProps) {
  return (
    <>
      <Head>
        <title>The Good Corner - {pageTitle}</title>
        <meta name="description" content="ads website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header onSearch={onSearch} />
      <main className="main-content">{children}</main>
    </>
  );
}
