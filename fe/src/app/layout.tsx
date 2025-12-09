import type { Metadata } from "next";
import "./globals.css";
import styles from "../styles/layout.module.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const metadata: Metadata = {
  title: "HomeKitchenAI",
  description: "AI-powered home kitchen assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional" />
      </head>
      <body className="flex flex-col min-h-screen">
        <div className={styles["app-main-layout"]}>
           <Header />
          <main className={"flex-1 "}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
