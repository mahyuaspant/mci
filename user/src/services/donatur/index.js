export const getDonatur = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/status_donasi/public`,
    { cache: "no-store" }
  );
  if (!result.ok) {
    throw new Error("Failed to get data donasi");
  }

  return result.json();
};
