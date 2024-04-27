import { NextResponse } from "next/server";
import base_image_URL from "@/lib/imageUrl";
import { uploadFile } from "@/lib/uploadFIle";

export const POST = async (req, { params }) => {
  try {
    const formData = await req.formData();
    const file = formData.getAll("image")[0];
    const imagePath = await uploadFile(file, "/uploads");
    const imageUrl = `${base_image_URL}/${imagePath}`;

    return NextResponse.json(
      {
        message: "Upload File SuccessFul",
        image_url: imageUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
