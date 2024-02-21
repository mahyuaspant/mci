export const getBerita = async (body) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/berita/public?search=${
      body?.search || ""
    }`,
    { cache: "no-store" }
  );

  if (!result.ok) {
    throw new Error("Failed to get data berita");
  }

  return result.json();
};

export const getOneBerita = async (id) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/berita/${id}`,
    { cache: "no-store" }
  );

  if (!result.ok) {
    throw new Error("Failed to get data berita");
  }

  return result.json();
};
