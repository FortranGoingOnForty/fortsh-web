import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const STATS_FILE = path.join(process.cwd(), "data", "stats.json");

interface Stats {
  downloads: number;
  lastUpdated: string;
}

async function getStats(): Promise<Stats> {
  try {
    const data = await fs.readFile(STATS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { downloads: 0, lastUpdated: new Date().toISOString() };
  }
}

async function saveStats(stats: Stats): Promise<void> {
  const dir = path.dirname(STATS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
}

// GET - return current stats
export async function GET() {
  const stats = await getStats();
  return NextResponse.json(stats);
}

// POST - increment download count (called by install script)
export async function POST() {
  const stats = await getStats();
  stats.downloads += 1;
  stats.lastUpdated = new Date().toISOString();
  await saveStats(stats);
  return NextResponse.json({ success: true, downloads: stats.downloads });
}
