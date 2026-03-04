import { fetchAEM } from "../../lib/aem/client";
import { HOME_PAGE_QUERY } from "../../graphql/persistent/homePage";


export async function getHomePage(path: string) {
  const query = `${process.env.AEM_HOST}${HOME_PAGE_QUERY.url};path=${path}`;
  return fetchAEM(query);
}