"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteBook, GetBookById } from "@/fetching/books";

export default function Page() {
  const [book, setBook] = useState([]);
  const { id } = useParams(true);
  const router = useRouter();

  useEffect(() => {
    const getBook = async () => {
      const book = await GetBookById(id);

      setBook(book);
    };
    getBook();
  }, [id]);

  const handleDelete = async () => {
    await DeleteBook(id);

    router.push("/");
  };

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row mx-10 rounded-md border p-5 justify-between">
        <img src={book.image} className="w-72 rounded-lg shadow-2xl" />
        <div className="ml-5">
          <h1 className="text-4xl font-bold pb-5">{book.title}</h1>
          <p className="py-2">Author : {book.author}</p>
          <p className="py-2">Publisher : {book.publisher}</p>
          <p className="py-2">Year : {book.year} </p>
          <p className="py-2">Pages : {book.pages} </p>
          <button
            className="btn btn-info mr-2 mt-4"
            onClick={() => router.push(`/books/update/${book.id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button
            className="btn btn-error mt-4 "
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-slate-700">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Confirm delete</h3>
              <p className="py-4">Are you sure delete this?</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-error mr-2" onClick={handleDelete}>Delete</button>
                  <button className="btn btn-secondary">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
