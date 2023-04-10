import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  new Promise((resolve) => {
    const cookies = new Cookies(req, res);
    const access_token = cookies.get("access_token");
    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
    }
    req.headers.cookies = "";
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}
