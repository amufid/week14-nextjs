"use client";
import { useState } from "react";
import { AddBook, UploadImage } from "@/fetching/books";
import { useRouter } from "next/navigation";

export default function Page() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await AddBook({ title, author, publisher, year, pages, image });

    router.push("/");
  };

  const handleImageUrl = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();

    formData.append("image", image);

    const res = await UploadImage(formData);

    if (res.image_url) {
      setImage(res.image_url);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-[500px] shadow-2xl bg-base-100 mx-5">
          <form className="card-body" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-2xl text-center my-5">Add Book</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="title"
                className="input input-bordered"
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
                onChange={(e) => setPages(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                placeholder="image"
                className="input input-bordered"
                onChange={(e) => handleImageUrl(e)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
