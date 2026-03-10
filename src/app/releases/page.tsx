"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Asset {
  name: string;
  downloadUrl: string;
  size: number;
}

interface Release {
  tag: string;
  name: string;
  publishedAt: string;
  body: string;
  assets: Asset[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function ReleaseCard({ release, isLatest }: { release: Release; isLatest: boolean }) {
  return (
    <article className="border border-surface-200 dark:border-surface-700 rounded-lg p-6">
      <header className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
              {release.name || release.tag}
            </h2>
            {isLatest && (
              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                Latest
              </span>
            )}
          </div>
          <p className="text-sm text-surface-500">
            Released {formatDate(release.publishedAt)}
          </p>
        </div>
        <a
          href={`https://github.com/fortrangoingonforty/fortsh/releases/tag/${release.tag}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
        >
          View on GitHub
        </a>
      </header>

      {release.body && (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
          <pre className="whitespace-pre-wrap text-sm text-surface-600 dark:text-surface-400 bg-transparent p-0 overflow-visible">
            {release.body}
          </pre>
        </div>
      )}

      {release.assets.length > 0 && (
        <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
          <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Downloads
          </h3>
          <div className="flex flex-wrap gap-2">
            {release.assets.map((asset) => (
              <a
                key={asset.name}
                href={asset.downloadUrl}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>{asset.name}</span>
                <span className="text-surface-500">({formatSize(asset.size)})</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default function ReleasesPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/releases")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch releases");
        return res.json();
      })
      .then((data) => {
        setReleases(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-surface-200 dark:border-surface-800">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-surface-900 dark:text-surface-100">
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
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
            >
              Features
            </Link>
            <Link
              href="/releases"
              className="text-surface-900 dark:text-surface-100 font-medium"
            >
              Releases
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-surface-900 dark:text-surface-100 mb-2">
          Releases
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Download the latest version of fortsh or browse previous releases.
        </p>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-surface-300 border-t-surface-600 rounded-full mx-auto mb-4"></div>
            <p className="text-surface-500">Loading releases...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <a
              href="https://github.com/fortrangoingonforty/fortsh/releases"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 underline"
            >
              View releases on GitHub
            </a>
          </div>
        )}

        {!loading && !error && releases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-500 mb-4">No releases found.</p>
            <a
              href="https://github.com/fortrangoingonforty/fortsh/releases"
              className="text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100 underline"
            >
              View releases on GitHub
            </a>
          </div>
        )}

        {!loading && !error && releases.length > 0 && (
          <div className="space-y-6">
            {releases.map((release, index) => (
              <ReleaseCard
                key={release.tag}
                release={release}
                isLatest={index === 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-surface-200 dark:border-surface-800 py-8 px-4 mt-auto">
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
