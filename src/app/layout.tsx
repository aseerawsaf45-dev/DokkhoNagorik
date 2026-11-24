import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter, Raleway } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { DemoRoleSwitcher } from "@/components/shared/DemoRoleSwitcher";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "DokkhoNagorik | A Skill-to-Income Ecosystem",
  description: "Learn with direction. Prove your skills. Earn with confidence. Connect professional skills with real SME projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} ${raleway.variable} antialiased min-h-screen text-[#1a1a1a]`}
      >
        <AppProvider>
          {children}
          <DemoRoleSwitcher />
        </AppProvider>
      </body>
    </html>
  );
}
