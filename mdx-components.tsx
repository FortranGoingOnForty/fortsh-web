import type { MDXComponents } from "mdx/types";
import ShellHighlighter from "@/components/ShellHighlighter";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4 mt-8 border-b border-surface-200 dark:border-surface-700 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2 mt-4">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-surface-700 dark:text-surface-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-surface-700 dark:text-surface-300 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-surface-700 dark:text-surface-300 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    code: ({ children, className }) => {
      // Check if it's a code block (has language class) or inline code
      const isBlock = className?.includes("language-");
      const isShell =
        className?.includes("language-bash") ||
        className?.includes("language-sh") ||
        className?.includes("language-shell");

      if (isBlock) {
        // Shell code gets syntax highlighting
        if (isShell && typeof children === "string") {
          return (
            <ShellHighlighter
              code={children}
              className="block text-sm font-mono"
            />
          );
        }
        return (
          <code
            className={`block bg-surface-800 text-surface-100 p-4 rounded-lg overflow-x-auto text-sm font-mono ${className || ""}`}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-surface-900 dark:bg-surface-950 rounded-lg mb-4 overflow-x-auto">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-surface-300 dark:border-surface-600 pl-4 italic text-surface-600 dark:text-surface-400 mb-4">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-surface-200 dark:border-surface-700">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-surface-200 dark:border-surface-700 px-4 py-2 bg-surface-100 dark:bg-surface-800 font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-surface-200 dark:border-surface-700 px-4 py-2">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="border-surface-200 dark:border-surface-700 my-8" />
    ),
    ...components,
  };
}
