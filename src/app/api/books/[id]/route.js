import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// get book by id
export async function GET(req, { params }) {
  const id = parseInt(params.id);
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    return NextResponse.json(
      {
        message: "Book Not Found!",
        data: null,
      },
      { status: 404 }
    );
  }
  // console.log("Book", book);
  return NextResponse.json(
    {
      message: "Detail Data Book",
      data: book,
    },
    { status: 200 }
  );
}

// update book
export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  const { title, author, publisher, year, pages, image } = await req.json();

  const book = await prisma.book.update({
    where: {
      id,
    },
    data: {
      title: title,
      author: author,
      publisher: publisher,
      year: parseInt(year),
      pages: parseInt(pages),
      image: image,
    },
  });
  console.log('Data', book)
  return NextResponse.json(
    {
      message: "Book Updated!",
      data: book,
    },
    { status: 200 }
  );
}

// Delete book
export async function DELETE(req, { params }) {
  const id = parseInt(params.id);

  await prisma.book.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "Book Deleted!" }, { status: 200 });
}
