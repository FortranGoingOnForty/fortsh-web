import Sidebar from "@/components/Sidebar";
import TableOfContents from "@/components/TableOfContents";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex justify-center">
        <article className="flex-1 max-w-3xl p-8">
          <div className="prose prose-stone dark:prose-invert max-w-none">
            {children}
          </div>
        </article>
        <TableOfContents />
      </main>
    </div>
  );
}
