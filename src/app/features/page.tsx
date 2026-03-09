import Link from "next/link";

interface FeatureSection {
  title: string;
  features: { name: string; description: string }[];
}

const sections: FeatureSection[] = [
  {
    title: "POSIX Compliance",
    features: [
      {
        name: "3,776 tests passing",
        description:
          "Comprehensive POSIX compliance test suite covering all shell requirements.",
      },
      {
        name: "Full shell grammar",
        description:
          "Pipes, redirections, command substitution, here-documents, and all standard syntax.",
      },
      {
        name: "POSIX builtins",
        description:
          "All required builtins: cd, echo, test, printf, read, export, and more.",
      },
      {
        name: "Signal handling",
        description:
          "Proper POSIX signal handling with trap support for EXIT, ERR, DEBUG, and standard signals.",
      },
    ],
  },
  {
    title: "Modern Interactive Features",
    features: [
      {
        name: "Autosuggestions",
        description:
          "Fish-like history-based suggestions appear as you type. Accept with Right Arrow.",
      },
      {
        name: "Syntax highlighting",
        description:
          "Real-time command validation with color-coded feedback. Green for valid, red for errors.",
      },
      {
        name: "Fuzzy completion",
        description:
          "Tab completion with fuzzy matching for commands, files, and variables.",
      },
      {
        name: "Smart history",
        description:
          "Persistent history with Ctrl+R search, deduplication, and expansion (!! !$ !^).",
      },
      {
        name: "Abbreviations",
        description:
          "Fish-style abbreviations that expand as you type. Define with abbr.",
      },
      {
        name: "Directory navigation",
        description:
          "Type a path and press Enter to cd. No cd command needed.",
      },
    ],
  },
  {
    title: "Bash Compatibility",
    features: [
      {
        name: "~99% compatible",
        description:
          "Most bash scripts run without modification. Tested against common patterns.",
      },
      {
        name: "Arrays",
        description:
          "Indexed arrays with arr=(a b c), ${arr[@]}, ${#arr[@]}, and slicing.",
      },
      {
        name: "Associative arrays",
        description:
          "declare -A for key-value storage with ${!assoc[@]} for keys.",
      },
      {
        name: "Parameter expansion",
        description:
          "Full expansion: ${var:-default}, ${var#pattern}, ${var//find/replace}, case conversion.",
      },
      {
        name: "Process substitution",
        description: "Advanced patterns with <(cmd) and >(cmd) using FIFOs.",
      },
      {
        name: "Extended test",
        description:
          "[[ ]] with regex matching (=~), pattern matching, and logical operators.",
      },
    ],
  },
  {
    title: "60+ Builtin Commands",
    features: [
      {
        name: "Navigation",
        description: "cd, pwd, pushd, popd, dirs, prevd, nextd, dirh",
      },
      {
        name: "I/O",
        description: "echo, printf, read, cat (via external)",
      },
      {
        name: "Variables",
        description: "export, declare, local, readonly, unset, printenv",
      },
      {
        name: "Control",
        description: "if/then/else, for, while, until, case, functions",
      },
      {
        name: "Jobs",
        description: "jobs, fg, bg, wait, kill, trap",
      },
      {
        name: "Completion",
        description: "complete, compgen for programmable completion",
      },
    ],
  },
  {
    title: "Unique to fortsh",
    features: [
      {
        name: "Written in Fortran",
        description:
          "70,000+ lines of Fortran 2018. Proving Fortran works for systems programming.",
      },
      {
        name: "AST-based parsing",
        description:
          "Modern parser architecture with proper grammar handling, not ad-hoc.",
      },
      {
        name: "Memory profiling",
        description:
          "Built-in memory command shows real-time allocation statistics.",
      },
      {
        name: "Performance metrics",
        description:
          "perf builtin for timing parse, expansion, and execution phases.",
      },
    ],
  },
];

const limitations = [
  {
    name: "macOS Apple Silicon",
    description:
      "127-character command line limit due to flang-new compiler limitations.",
  },
  {
    name: "Nested brace expansion",
    description: "Patterns like {a,{b,c}} are not supported.",
  },
  {
    name: "Vi mode",
    description: "Partial support. Yank/put and marks not implemented.",
  },
  {
    name: "Performance",
    description:
      "Slower than C shells on very large scripts. Fine for interactive use.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-surface-200 dark:border-surface-800">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-surface-900 dark:text-surface-100"
          >
            fortsh
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
            >
              Docs
            </Link>
            <Link
              href="/features"
              className="text-surface-900 dark:text-surface-100 font-medium"
            >
              Features
            </Link>
            <a
              href="https://github.com/fortrangoingonforty/fortsh"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-surface-900 dark:text-surface-100 mb-4">
          Features
        </h1>
        <p className="text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
          A POSIX-compliant shell with modern conveniences, written in Fortran
          by a single maintainer.
        </p>
      </section>

      {/* Feature Sections */}
      {sections.map((section) => (
        <section
          key={section.title}
          className="py-12 px-4 border-t border-surface-200 dark:border-surface-800"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-8">
              {section.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.features.map((feature) => (
                <div
                  key={feature.name}
                  className="p-5 bg-surface-50 dark:bg-surface-800 rounded-lg"
                >
                  <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Limitations */}
      <section className="py-12 px-4 bg-surface-100 dark:bg-surface-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            Known Limitations
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            fortsh is a single-maintainer project. These limitations are
            documented for transparency.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {limitations.map((item) => (
              <div
                key={item.name}
                className="p-4 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700"
              >
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots placeholder */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            Screenshots
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            Coming soon: Terminal screenshots demonstrating key features.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {["Syntax Highlighting", "Autosuggestions", "Tab Completion"].map(
              (name) => (
                <div
                  key={name}
                  className="aspect-video bg-surface-200 dark:bg-surface-800 rounded-lg flex items-center justify-center"
                >
                  <span className="text-surface-500">[{name}]</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-surface-900 dark:bg-surface-950 text-center">
        <h2 className="text-2xl font-bold text-surface-100 mb-4">
          Ready to try fortsh?
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/docs/getting-started/installation"
            className="px-6 py-3 bg-surface-100 text-surface-900 rounded-lg font-medium hover:bg-white transition-colors"
          >
            Install Now
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 border border-surface-600 text-surface-300 rounded-lg font-medium hover:border-surface-400 hover:text-surface-100 transition-colors"
          >
            Read the Docs
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-surface-500">
          <p>
            fortsh is a single-maintainer project.{" "}
            <a
              href="https://github.com/fortrangoingonforty/fortsh"
              className="underline hover:text-surface-700"
            >
              Contribute on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
