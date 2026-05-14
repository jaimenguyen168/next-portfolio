import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const planetId = formData.get("planetId") as string;
    const emoji = formData.get("emoji") as string;
    const nickname = formData.get("nickname") as string | null;
    const mark = formData.get("mark") as string;
    const imageFile = formData.get("image") as File | null;

    if (!planetId || !emoji || !mark?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (mark.length > 1000) {
      return NextResponse.json({ error: "Mark too long" }, { status: 400 });
    }

    let imageAsset: { _type: string; asset: { _type: string; _ref: string } } | undefined;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await writeClient.assets.upload("image", buffer, {
        filename: imageFile.name,
        contentType: imageFile.type,
      });
      imageAsset = {
        _type: "image",
        asset: { _type: "reference", _ref: uploaded._id },
      };
    }

    const doc = {
      _type: "planetMark",
      planet: { _type: "reference", _ref: planetId },
      emoji: emoji.trim(),
      nickname: nickname?.trim() || null,
      mark: mark.trim(),
      ...(imageAsset ? { image: imageAsset } : {}),
      submittedAt: new Date().toISOString(),
    };

    const created = await writeClient.create(doc);
    return NextResponse.json({ mark: created }, { status: 201 });
  } catch (err) {
    console.error("Failed to submit mark:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
