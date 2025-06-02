import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const sansation = localFont({
  src: [
    {
      path: "./fonts/Sansation-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Sansation-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Sansation-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/Sansation-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Sansation-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Sansation-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sansation",
});

export const metadata: Metadata = {
  title: "Blog X",
  description: "Create your own blog live!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansation.variable}  antialiased flex flex-col min-h-screen`}
      >
        <main className="flex-1">{children}</main>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
