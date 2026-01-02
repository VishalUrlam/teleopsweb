import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TeleOps | The Human Data Layer for Robotics",
  description:
    "Turn any smartphone into a sub-millimeter teleoperation rig. TeleOps provides stereo-vision infrastructure for robotics teams at scale.",
  keywords: [
    "robotics",
    "teleoperation",
    "stereo vision",
    "data collection",
    "imitation learning",
    "Y Combinator",
  ],
  authors: [{ name: "TeleOps" }],
  openGraph: {
    title: "TeleOps | The Human Data Layer for Robotics",
    description: "Turn any smartphone into a sub-millimeter teleoperation rig.",
    siteName: "TeleOps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeleOps | The Human Data Layer for Robotics",
    description: "Turn any smartphone into a sub-millimeter teleoperation rig.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
