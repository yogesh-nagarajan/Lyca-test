import { fetchAemGraphQL } from "../../lib/aem/client";
import { HOME_PAGE_QUERY } from "../../graphql/persistent/homePage";

export async function getHomePage(path: string) {
  return fetchAemGraphQL(HOME_PAGE_QUERY.url, path);
}