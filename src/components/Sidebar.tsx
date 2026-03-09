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

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const isParentActive = pathname.startsWith(item.href + "/");

  return (
    <li>
      <Link
        href={item.href}
        className={`block py-1.5 px-3 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-surface-100 font-medium"
            : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800"
        } ${depth > 0 ? "ml-4" : ""}`}
      >
        {item.title}
      </Link>
      {item.children && (isActive || isParentActive) && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <NavLink key={child.href} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav className="w-64 shrink-0 border-r border-surface-200 dark:border-surface-800 h-screen sticky top-0 overflow-y-auto p-4">
      <div className="mb-6">
        <Link
          href="/"
          className="text-lg font-bold text-surface-900 dark:text-surface-100"
        >
          fortsh
        </Link>
        <span className="text-xs text-surface-500 ml-2">docs</span>
      </div>
      <ul className="space-y-1">
        {navigation.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}
