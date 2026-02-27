import { getHomePage } from "../services/aem/page.service";
import HomePage from "./homepage";
import "tailwindcss";


export default async function Home() {
  const data = await getHomePage("/content/dam/lyca/en/pages/home/homepage");

  //console.log("data", data);

  const dataPage = data.data.pageByPath.item;

  return <HomePage dataPage={dataPage} />;
}