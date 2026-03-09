import { NextResponse } from "next/server";

const GITHUB_API =
  "https://api.github.com/repos/fortrangoingonforty/fortsh/releases";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface Release {
  tag: string;
  name: string;
  publishedAt: string;
  body: string;
  assets: { name: string; downloadUrl: string; size: number }[];
}

interface CachedData {
  data: Release[] | null;
  timestamp: number;
}

let cache: CachedData = { data: null, timestamp: 0 };

async function fetchReleases(): Promise<Release[] | null> {
  // Return cached data if fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "fortsh-web",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`${GITHUB_API}?per_page=10`, { headers });

    if (!res.ok) {
      console.error("GitHub releases API error:", res.status);
      return cache.data;
    }

    const releases = await res.json();

    const data: Release[] = releases.map(
      (r: {
        tag_name: string;
        name: string;
        published_at: string;
        body: string;
        assets: {
          name: string;
          browser_download_url: string;
          size: number;
        }[];
      }) => ({
        tag: r.tag_name,
        name: r.name || r.tag_name,
        publishedAt: r.published_at,
        body: r.body || "",
        assets: (r.assets || []).map(
          (a: {
            name: string;
            browser_download_url: string;
            size: number;
          }) => ({
            name: a.name,
            downloadUrl: a.browser_download_url,
            size: a.size,
          })
        ),
      })
    );

    cache = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error("Failed to fetch releases:", error);
    return cache.data;
  }
}

export async function GET() {
  const data = await fetchReleases();

  if (!data) {
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
