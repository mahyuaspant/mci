export const getCarousel = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/carousel/public`,
    { cache: "no-store" }
  );

  if (!result.ok) {
    throw new Error("Failed to get data Carousel");
  }

  return result.json();
};
