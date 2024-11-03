import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

type RequestBody = {
  imageUrl: string;
  roomType: string;
  designType: string;
  additionalReq: string;
};

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});

export async function POST(req: NextRequest) {
  const { imageUrl, roomType, designType, additionalReq }: RequestBody = await req.json()

  try {
    // Convert Image to AI image
    const input = {
      image: imageUrl,
      prompt: 'A ' + roomType + ' with a ' + designType + ' style interior ' + additionalReq
    };

    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    console.log(output)
    return NextResponse.json({ result: output })
    // Convert Output url to Base64 Image

    // Save Base64 to firebase

    // Save all to Database
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}