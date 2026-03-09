"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    children: [
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "First Steps", href: "/docs/getting-started/first-steps" },
      { title: "Configuration", href: "/docs/getting-started/configuration" },
    ],
  },
  {
    title: "Syntax",
    href: "/docs/syntax",
    children: [
      { title: "Quoting", href: "/docs/syntax/quoting" },
      { title: "Redirection", href: "/docs/syntax/redirection" },
      { title: "Pipes", href: "/docs/syntax/pipes" },
      { title: "Expansion", href: "/docs/syntax/expansion" },
      { title: "Heredocs", href: "/docs/syntax/heredocs" },
    ],
  },
  {
    title: "Builtins",
    href: "/docs/builtins",
    children: [
      { title: "Index", href: "/docs/builtins" },
      { title: "cd", href: "/docs/builtins/cd" },
      { title: "echo", href: "/docs/builtins/echo" },
      { title: "test", href: "/docs/builtins/test" },
      { title: "read", href: "/docs/builtins/read" },
      { title: "printf", href: "/docs/builtins/printf" },
    ],
  },
  {
    title: "Variables",
    href: "/docs/variables",
    children: [
      { title: "Special Variables", href: "/docs/variables/special" },
      { title: "Arrays", href: "/docs/variables/arrays" },
      { title: "Associative Arrays", href: "/docs/variables/associative" },
      { title: "Environment", href: "/docs/variables/environment" },
    ],
  },
  {
    title: "Control Flow",
    href: "/docs/control-flow",
    children: [
      { title: "Conditionals", href: "/docs/control-flow/conditionals" },
      { title: "Loops", href: "/docs/control-flow/loops" },
      { title: "Functions", href: "/docs/control-flow/functions" },
    ],
  },
  {
    title: "Job Control",
    href: "/docs/job-control",
    children: [
      { title: "Background Jobs", href: "/docs/job-control/background" },
      { title: "Signals & Traps", href: "/docs/job-control/signals" },
    ],
  },
  {
    title: "Interactive",
    href: "/docs/interactive",
    children: [
      { title: "Line Editing", href: "/docs/interactive/line-editing" },
      { title: "History", href: "/docs/interactive/history" },
      { title: "Completion", href: "/docs/interactive/completion" },
      { title: "Syntax Highlighting", href: "/docs/interactive/highlighting" },
      { title: "Autosuggestions", href: "/docs/interactive/autosuggestions" },
    ],
  },
  {
    title: "Platform Notes",
    href: "/docs/platform",
    children: [
      { title: "macOS Apple Silicon", href: "/docs/platform/macos-arm" },
      { title: "macOS Intel", href: "/docs/platform/macos-intel" },
      { title: "Linux", href: "/docs/platform/linux" },
      { title: "Limitations", href: "/docs/platform/limitations" },
    ],
  },
];

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isChildActive = item.children?.some(
    (child) => pathname === child.href || pathname.startsWith(child.href + "/")
  );

  return (
    <li className="mb-4">
      <Link
        href={item.href}
        className={`block text-sm font-semibold mb-2 ${
          isActive
            ? "text-surface-900 dark:text-surface-100"
            : "text-surface-700 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100"
        }`}
      >
        {item.title}
      </Link>
      {item.children && (
        <ul className="space-y-1 border-l border-surface-200 dark:border-surface-700 ml-1">
          {item.children.map((child) => {
            const childActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`block py-1 pl-4 text-sm border-l -ml-px transition-colors ${
                    childActive
                      ? "border-surface-900 dark:border-surface-100 text-surface-900 dark:text-surface-100 font-medium"
                      : "border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:border-surface-400"
                  }`}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav className="w-64 shrink-0 border-r border-surface-200 dark:border-surface-800 h-screen sticky top-0 overflow-y-auto p-6">
      <div className="mb-8">
        <Link
          href="/"
          className="text-lg font-bold text-surface-900 dark:text-surface-100"
        >
          fortsh
        </Link>
        <span className="text-xs text-surface-500 ml-2">docs</span>
      </div>
      <ul>
        {navigation.map((item) => (
          <NavSection key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}
