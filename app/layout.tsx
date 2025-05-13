import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
   title: "Michal's blog",
   description: "Created by Michal",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className="dark:bg-slate-800">
            <NavBar />
            <main className="px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            {children}
            </main>
         </body>
      </html>
   );
}
