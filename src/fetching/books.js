import base_URL from "@/lib/baseUrl";

export async function AddBook(params) {
  try {
    const res = await fetch(`${base_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error("Error to fetch data");
    }

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function GetBookById(params) {
  try {
    const res = await fetch(`${base_URL}/books/${params}`);

    if (!res.ok) {
      throw new Error("Error to fetch data");
    }
    const { data } = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteBook(params) {
  try {
    const res = await fetch(`${base_URL}/books/${params}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Error to fetch data");
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function UploadImage(params) {
  try {
    const res = await fetch(`${base_URL}/books/upload`, {
      method: "POST",
      body: params,
    });

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error({
      message: error.response.message || "Internal Server Error",
    });
  }
}
