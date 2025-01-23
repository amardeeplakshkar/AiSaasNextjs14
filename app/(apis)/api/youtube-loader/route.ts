import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

   // Load YouTube data using the YouTubeLoader
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();

    return NextResponse.json({ docs }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to load YouTube data" },
      { status: 500 }
    );
  }
}
