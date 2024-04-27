"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";

export default function Books({ books }) {
  const [loading, setLoading] = useState(true);
  const [getBooks, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const getBooksPages = async () => {
      try {
        const data = await books;

        setBooks(data);
        setTotalPages(Math.ceil(data.length / 3)); // buku per halaman
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBooksPages();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastBook = currentPage * 3;
  const indexOfFirstBook = indexOfLastBook - 3;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-bars loading-lg "></span>
        </div>
      )}

      <h1 className="my-5 text-center text-xl font-bold ">List Books</h1>

      <div className="container my-5 mx-auto px-4 md:px-24">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {currentBooks.map((book) => (
            <div
              className="my-1 px-1 w-full sm:w-80 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              key={book.id}
            >
              <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-800 rounded-md p-1 hover:scale-105 justify-center">
                <div>
                  <img
                    src={book.image}
                    className="w-44 h-72 sm:w-full shadow-2xl rounded-md"
                  />
                </div>
                <div className="my-auto mx-3">
                  <h2 className="text-xl font-bold mt-5">{book.title}</h2>
                  <p className="mt-5">by {book.author}</p>
                  <div className="flex justify-center my-5 mr-2">
                    <button
                      className="btn btn-neutral"
                      onClick={() => router.push(`/books/${book.id}`)}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
