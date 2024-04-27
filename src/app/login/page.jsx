"use client";

import { useState } from "react";
import { Login } from "@/fetching/users";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await Login({ email, password });
      const result = await res.json();

      if (result.token) {
        router.push("/");
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setError(false);
      }, 5000);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  };

  return (
    <>
      {error && (
        <div role="alert" className="alert alert-error w-1/4 fixed m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! email or password incorect</span>
        </div>
      )}
      {success && (
        <div role="alert" className="alert alert-success w-1/3 fixed m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Login Successfully</span>
        </div>
      )}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-96 shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div>
                <h1 className="text-2xl text-center my-5">Login</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-info">
                  Login
                </button>
              </div>
              <p className="text-center my-3">
                Already have an account?{" "}
                <span className="link link-info">
                  <Link href="/register">Register</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
