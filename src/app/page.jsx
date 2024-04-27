import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Books from "@/components/Books";
import prisma from "@/lib/prisma";

export async function getAllBooks() {
  const data = await prisma.book.findMany();
  return data;
}

export default async function Page() {
  const getBooks = await getAllBooks();

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Books books={getBooks} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
