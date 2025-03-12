import { EdgeStoreProvider } from "@/lib/edgestore";

export default async function TutorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </>
  );
}