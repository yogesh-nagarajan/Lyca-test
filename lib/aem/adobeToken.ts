import fs from "fs";
import jwt from "jsonwebtoken";
import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getAdobeAccessToken(): Promise<string> {

  const now = Date.now();

  // If token exists and not expired, return cached token
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const privateKey = fs.readFileSync("auth/private.key");

  const payload = {
    iss: process.env.AEM_ORG_ID as string,
    sub: process.env.AEM_TECH_ACCOUNT_ID as string,
    aud: `${process.env.AEM_IMS_ENDPOINT}/c/${process.env.AEM_CLIENT_ID}`,
    [`${process.env.AEM_IMS_ENDPOINT}/s/${process.env.AEM_METASCOPES}`]: true,
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  };

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256"
  });

  const response = await axios.post(
    `${process.env.AEM_IMS_ENDPOINT}/ims/exchange/jwt`,
    null,
    {
      params: {
        client_id: process.env.AEM_CLIENT_ID,
        client_secret: process.env.AEM_CLIENT_SECRET,
        jwt_token: token
      }
    }
  );

  const accessToken = response.data.access_token;

  // Cache token for 24 hours
  cachedToken = accessToken;
  tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

  return accessToken;
}