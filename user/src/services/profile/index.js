export const getProfile = async (body) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`,
    { cache: "no-store" }
  );

  if (!result.ok) {
    throw new Error("Failed to get data profile");
  }

  return result.json();
};
