export const getKategori = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/kategori/public`,
    { cache: "no-store" }
  );

  if (!result.ok) {
    throw new Error("Failed to get data kategori");
  }

  return result.json();
};
