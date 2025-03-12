import { Metadata } from "next";
import "./globals.css";

export const metadata : Metadata = {
  title: 'Platform - Start Your Learning Journey Today',
  description: 'Discover a world of knowledge with our comprehensive online courses. Learn at your own pace and advance your skills with expert-led content.',
  keywords: ['online courses', 'e-learning', 'education platform', 'online education'],
  openGraph: {
      title: 'Platform - Start Your Learning Journey Today',
      description: 'Transform your future with our expert-led online courses',
      images: ['./public/p_text.png'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
