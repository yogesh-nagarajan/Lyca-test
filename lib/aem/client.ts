export async function fetchAemGraphQL(
  url: string,
  path: string
) {
  const requestUrl = `${process.env.AEM_HOST}${url};path=${path}`;

  try {
    //console.info("[AEM][GraphQL] Request URL:", requestUrl);

    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        "Content-Type": "application/json",
        nocache: "no-cache",
      },
      next: { revalidate: 60 }// ISR support
    });

    // ❗ Handle non-200 responses explicitly
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[AEM][GraphQL] HTTP Error",
        response.status,
        response.statusText,
        errorText
      );
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("[AEM][GraphQL] Fetch failed:", error);
    return null;
  }
}