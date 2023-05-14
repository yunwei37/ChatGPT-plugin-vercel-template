import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";
import { getWeatherData } from "@/app/lib/utils";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  let location = req.nextUrl.searchParams.get("location");
  if (!location) {
    const { city } = geolocation(req);
    location = city || "San Francisco";
  }

  const response = await getWeatherData(location);

  return NextResponse.json({
    ...response,
    infoLink: `https://weathergpt-gawee8z3a-yunwei37.vercel.app/${encodeURIComponent(location)}`,
  });
}
