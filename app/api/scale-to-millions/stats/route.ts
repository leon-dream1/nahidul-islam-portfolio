import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type Stats = {
  views: number;
  likes: number;
};

const statsFile = path.join(
  process.cwd(),
  "data",
  "scale-to-millions-stats.json",
);

async function readStats(): Promise<Stats> {
  try {
    const raw = await fs.readFile(statsFile, "utf8");
    const parsed = JSON.parse(raw) as Partial<Stats>;
    return {
      views: parsed.views ?? 0,
      likes: parsed.likes ?? 0,
    };
  } catch {
    return { views: 0, likes: 0 };
  }
}

async function writeStats(stats: Stats) {
  await fs.writeFile(statsFile, JSON.stringify(stats, null, 2), "utf8");
}

export async function GET() {
  const stats = await readStats();
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body?.action;

    if (action !== "view" && action !== "like") {
      return NextResponse.json(
        { error: "Invalid action. Use 'view' or 'like'." },
        { status: 400 },
      );
    }

    const stats = await readStats();

    if (action === "view") {
      stats.views += 1;
    } else if (action === "like") {
      stats.likes += 1;
    }

    await writeStats(stats);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Unable to update page metrics." },
      { status: 500 },
    );
  }
}
