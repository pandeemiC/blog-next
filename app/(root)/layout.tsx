import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-sansation">
      <Navbar />
      {children}
      <Analytics />
    </main>
  );
}
