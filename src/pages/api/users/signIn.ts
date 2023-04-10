import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
//yarn add http-proxy
//yarn add --dev @types/http-proxy
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
    req.headers.cookies = "";
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    const proxyResCb: ProxyResCallback = (proxyRes, req, res) => {
      let body: string = "";
      proxyRes.on("data", (chunk) => (body += chunk));

      proxy.on("end", async () => {
        try {
          const { access_token } = JSON.parse(body).data;

          //yarn add cookies
          //yarn add --dev @types/cookies
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("access_token", access_token, {
            httpOnly: true,
            sameSite: "lax",
          });

          (res as NextApiResponse)
            .status(200)
            .json({ message: "Signin successfully!" });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Somgthing went wrong!" });
          console.log(error);
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", proxyResCb);
  });
}
