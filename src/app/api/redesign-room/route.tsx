import { db } from "@/config/db";
import { storage } from "@/config/firebase";
import { AiGeneratedImage } from "@/config/schema";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

type RequestBody = {
  imageUrl: string;
  roomType: string;
  designType: string;
  additionalReq: string;
  userEmail: string
};

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});

export async function POST(req: NextRequest) {
  const { imageUrl, roomType, designType, additionalReq, userEmail }: RequestBody = await req.json()
  console.log(roomType, designType);

  try {
    // Convert Image to AI image
    const input = {
      image: imageUrl,
      prompt: 'A ' + roomType + ' with a ' + designType + ' style interior ' + additionalReq
    };

    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
    console.log(output)
    // const output = "https://replicate.delivery/pbxt/20E88yvnJv6PClMSXNS8rY7yAUFJdbRwrtFNaYKN9VWZjX7E/out.png"
    // Convert Output url to Base64 Image
    const outputCheck = typeof output === 'string' ? output : Array.isArray(output) ? output[0] : output;

    if (typeof imageUrl !== 'string') {
      throw new Error('Output is not a valid image URL');
    }
    const base64Image = await ConvertImageToBase64(outputCheck);
    // Save Base64 to firebase
    const fileName = Date.now() + '.png';
    const storageRef = ref(storage, 'room-redesign/' + fileName)
    await uploadString(storageRef, base64Image, 'data_url')
    const downloadUrl = await getDownloadURL(storageRef)
    console.log(downloadUrl);
    // Save all to Database
    const dbResult = await db.insert(AiGeneratedImage).values({
      roomType: roomType,
      designType: designType,
      orgImage: imageUrl,
      aiImage: downloadUrl,
      userEmail: userEmail
    }).returning({ id: AiGeneratedImage.id })

    console.log(dbResult)
    return NextResponse.json({ 'result': downloadUrl })
  } catch (err) {
    return NextResponse.json({ error: err })
  }
}

async function ConvertImageToBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer(); // Get raw binary data
    const base64ImageRaw = Buffer.from(arrayBuffer).toString('base64') // Convert to base64 string
    return "data:image/png;base64," + base64ImageRaw

  } catch (error) {
    console.error('Error fetching or converting image:', error);
    throw error;
  }
}