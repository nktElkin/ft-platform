import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-8 items-center justify-center flex flex-col h-screen">
      <h1 className="text-4xl">[404] Page not found</h1>
      <nav role="navigation" aria-label="Return to homepage">
        <Link
          className="font-bold inline-block px-6 py-2 border rounded hover:bg-gray-100 focus:ring-2"
          href="/"
          role="button"
          aria-label="Return to homepage"
        >
          &rarr; Return Home &larr;
        </Link>
      </nav>
    </div>
  );
}
