import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Go Learning Hub",
  description: "An interactive reference for learning Go — covering DSA, concurrency, system design, and more, with comparisons to Java, Python, and C++.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
