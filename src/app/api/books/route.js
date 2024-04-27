import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// get all books
export async function GET() {
  const books = await prisma.book.findMany();

  return NextResponse.json(
    {
      message: "List Data Books",
      data: books,
    },
    { status: 200 }
  );
}

// create a book
export async function POST(req) {
  try {
    const { title, author, publisher, year, pages, image } = await req.json();
    // const imagePath = await req.file.path;

    const book = await prisma.book.create({
      data: {
        title: title,
        author: author,
        publisher: publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: image,
      },
    });

    return NextResponse.json(
      {
        message: "Book Created Successfully",
        data: book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { error: "Shomething went wrong" },
      { status: 500 }
    );
  }
}
