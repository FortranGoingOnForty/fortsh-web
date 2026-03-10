import Terminal from "@/components/Terminal";
import FeatureCard from "@/components/FeatureCard";
import GitHubStats from "@/components/GitHubStats";
import DownloadStats from "@/components/DownloadStats";
import ShellHighlighter from "@/components/ShellHighlighter";

const features = [
  {
    title: "POSIX Compliant",
    description: "3,776 tests passing. Full POSIX shell compatibility.",
  },
  {
    title: "Fish-like Features",
    description:
      "Autosuggestions, syntax highlighting, and smart completions.",
  },
  {
    title: "60+ Builtins",
    description:
      "Comprehensive builtin commands including bash extensions.",
  },
  {
    title: "99% Bash Compatible",
    description:
      "Arrays, associative arrays, advanced parameter expansion.",
  },
  {
    title: "Real-time Highlighting",
    description: "Commands validated and colored as you type.",
  },
  {
    title: "Tab Completion",
    description: "Fuzzy matching, programmable completions via complete.",
  },
  {
    title: "Job Control",
    description: "Full background job management with fg, bg, jobs.",
  },
  {
    title: "Process Substitution",
    description: "Advanced <(cmd) and >(cmd) patterns supported.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-surface-200 dark:border-surface-800">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-surface-900 dark:text-surface-100">
            fortsh
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/docs"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
            >
              Docs
            </a>
            <a
              href="/features"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
            >
              Features
            </a>
            <a
              href="/releases"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
            >
              Releases
            </a>
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-surface-900 dark:text-surface-100 mb-6">
            The Fortran Shell
          </h1>
          <p className="text-xl text-surface-600 dark:text-surface-400 mb-12 max-w-2xl mx-auto">
            A modern, POSIX-compliant shell with fish-like features. Written in
            Fortran 2018, because why not.
          </p>

          {/* Install Terminal */}
          <div className="max-w-2xl mx-auto mb-8">
            <Terminal />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <GitHubStats />
            <DownloadStats />
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-500">
            Single maintainer project · MIT License
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-surface-100 dark:bg-surface-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100 text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100 text-center mb-8">
            Quick Start
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Try it out
              </h3>
              <div className="code-block">
                <pre className="text-sm whitespace-pre">
                  <ShellHighlighter code={`# Start fortsh
fortsh

# Run a script
fortsh script.sh

# One-liner
fortsh -c 'echo hello'`} />
                </pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Configure
              </h3>
              <div className="code-block">
                <pre className="text-sm whitespace-pre">
                  <ShellHighlighter code={`# ~/.fortshrc
alias ll='ls -la'
export PATH="$HOME/bin:$PATH"

# Custom prompt
PS1='\\u@\\h:\\w$ '`} />
                </pre>
              </div>
            </div>
          </div>
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
