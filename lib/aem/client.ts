import axios from "axios";
import { getAdobeAccessToken } from "./adobeToken";

export async function fetchAEM(url: string) {

  const token = await getAdobeAccessToken();

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}