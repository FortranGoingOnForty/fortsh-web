"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // Reset state when pathname changes
    setHeadings([]);
    setActiveId("");

    // Small delay to ensure DOM is updated after navigation
    const timer = setTimeout(() => {
      // Find all h2 and h3 headings in the article
      const article = document.querySelector("article");
      if (!article) return;

      const elements = article.querySelectorAll("h2, h3");
      const items: Heading[] = [];

      elements.forEach((el) => {
        // Generate ID if not present
        if (!el.id) {
          el.id = el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || "";
        }

        items.push({
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      });

      setHeadings(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="w-56 shrink-0 hidden xl:block">
      <div className="sticky top-8 p-4">
        <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-4">
          On This Page
        </h4>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block transition-colors ${
                  heading.level === 3 ? "pl-3" : ""
                } ${
                  activeId === heading.id
                    ? "text-surface-900 dark:text-surface-100 font-medium"
                    : "text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
