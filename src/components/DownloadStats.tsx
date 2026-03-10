"use client";

import { useEffect, useState } from "react";

interface Stats {
  downloads: number;
  lastUpdated: string;
}

export default function DownloadStats() {
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => {});
  }, []);

  if (!data || data.downloads === 0) {
    return null;
  }

  const formatNumber = (n: number) => {
    if (n >= 1000) {
      return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return n.toString();
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 text-sm">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span className="font-medium">{formatNumber(data.downloads)}</span>
      <span className="text-surface-500">installs</span>
    </span>
  );
}
