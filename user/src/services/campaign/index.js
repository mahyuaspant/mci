export const getCampaign = async (body) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaign/public?search=${
      body?.search || ""
    }`,
    { cache: "no-store" }
  );
  if (!result.ok) {
    throw new Error("Failed to get data donasi");
  }

  return result.json();
};

export const getOneCampaign = async (id) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaign/${id}`,
    { cache: "no-store" }
  );
  if (!result.ok) {
    throw new Error("Failed to get data donasi");
  }

  return result.json();
};
