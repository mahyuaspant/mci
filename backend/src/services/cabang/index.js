export const getCabang = async (body) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cabang/public?search=${body?.search}`,
    { cache: "no-store" }
  );

  if (!result.ok) {
    throw new Error("Failed to get data cabang");
  }

  return result.json();
};
