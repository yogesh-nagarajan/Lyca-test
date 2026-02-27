import { getHomePage } from "../../services/aem/page.service";
import HomePage from "./homepage";

export default async function Home() {
  let dataPage: any = null;
  try {
    const data = await getHomePage("/content/dam/lyca/en/pages/home/homepage");
    dataPage = data?.data?.pageByPath?.item ?? null;
  } catch {
    dataPage = null;
  }

  if (!dataPage) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Lyca</h1>
        <p className="mt-2 text-gray-600">
          Content is not available in this environment. Check AEM_HOST and TOKEN.
        </p>
      </main>
    );
  }

  return <HomePage dataPage={dataPage} />;
}
