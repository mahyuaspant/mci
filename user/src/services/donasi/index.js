export const postDonasi = async (formData) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/donasi`,
    {
      method: "POST",
      body: formData,
    }
  );
  return await result.json();
};
