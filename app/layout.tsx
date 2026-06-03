import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Md Nahidul Islam — Software Engineer",
  description:
    "Junior Software Engineer specializing in MERN Stack and Machine Learning. Building scalable web applications and AI-driven solutions.",
  keywords: [
    "Nahidul Islam",
    "Leon",
    "Nahidul Islam Leon",
    "Software Engineer",
    "MERN Stack",
    "Next.js",
    "React",
    "Machine Learning",
    "Computer Vision",
    "Data Science",
    "NLP",
    "Bangladesh",
  ],
  authors: [{ name: "Md Nahidul Islam" }],
  creator: "Md Nahidul Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nahidul-islam-portfolio.vercel.app/",
    title: "Md Nahidul Islam — Software Engineer",
    description:
      "Junior Software Engineer specializing in MERN Stack and Machine Learning.",
    siteName: "Nahidul Islam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Nahidul Islam — Software Engineer",
    description:
      "Junior Software Engineer specializing in MERN Stack and Machine Learning.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <ChatWidget />
      </body>
    </html>
  );
}