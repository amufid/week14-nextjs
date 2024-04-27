"use client";
import { useState, useEffect } from "react";
import { GetBookById } from "@/fetching/books";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const router = useRouter();
  const { id } = useParams(true);

  useEffect(() => {
    const getBookById = async () => {
      const book = await GetBookById(id);

      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setYear(book.year);
      setPages(book.pages);
    };
    getBookById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, publisher, year, pages }),
      });

      if (!res.ok) {
        throw new Error("Error to fetch data");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-[500px] shadow-2xl bg-base-100 mx-5">
          <form className="card-body" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-2xl text-center my-5">Update Book</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="title"
                className="input input-bordered"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                type="text"
                placeholder="author"
                className="input input-bordered"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Publisher</span>
              </label>
              <input
                type="text"
                placeholder="publisher"
                className="input input-bordered"
                name="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="number"
                placeholder="year"
                className="input input-bordered"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pages</span>
              </label>
              <input
                type="number"
                placeholder="pages"
                className="input input-bordered"
                name="pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                required
              />
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="text"
                placeholder="image"
                className="input input-bordered"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div> */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
