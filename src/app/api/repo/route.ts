import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/repos/fortrangoingonforty/fortsh";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CachedData {
  data: RepoInfo | null;
  timestamp: number;
}

interface RepoInfo {
  stars: number;
  forks: number;
  openIssues: number;
  lastCommit: string;
  lastCommitMessage: string;
  defaultBranch: string;
  description: string;
}

let cache: CachedData = { data: null, timestamp: 0 };

async function fetchRepoInfo(): Promise<RepoInfo | null> {
  // Return cached data if fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "fortsh-web",
    };

    // Add auth if available (for higher rate limits)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch repo info
    const repoRes = await fetch(GITHUB_API, { headers });
    if (!repoRes.ok) {
      console.error("GitHub API error:", repoRes.status);
      return cache.data; // Return stale cache on error
    }
    const repo = await repoRes.json();

    // Fetch latest commit
    const commitsRes = await fetch(`${GITHUB_API}/commits?per_page=1`, {
      headers,
    });
    const commits = commitsRes.ok ? await commitsRes.json() : [];

    const data: RepoInfo = {
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      openIssues: repo.open_issues_count || 0,
      lastCommit: commits[0]?.commit?.committer?.date || "",
      lastCommitMessage: commits[0]?.commit?.message?.split("\n")[0] || "",
      defaultBranch: repo.default_branch || "trunk",
      description: repo.description || "",
    };

    // Update cache
    cache = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error("Failed to fetch repo info:", error);
    return cache.data; // Return stale cache on error
  }
}

export async function GET() {
  const data = await fetchRepoInfo();

  if (!data) {
    return NextResponse.json(
      { error: "Failed to fetch repository info" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
