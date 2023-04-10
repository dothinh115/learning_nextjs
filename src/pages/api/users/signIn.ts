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
  req.headers.cookies = "";
  new Promise((resolve) => {
    proxy.web(req, res, {
      target: process.env.API_URL, //Chuyển hướng sang api
      changeOrigin: true, // thay đổi url gốc
      selfHandleResponse: true, //tự xử lý bằng tay
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
            secure: process.env.NODE_ENV !== "development", //bật secure khi ở môi trường production
          });

          cookies.set("access_token", access_token, {
            //set access_token
            httpOnly: true, //bật httpOnly
            sameSite: "lax", //chia sẻ cookies giữa những origin url, google cookies samesite để biết thêm
          });

          (res as NextApiResponse)
            .status(200)
            .json({ message: "Signin successfully!" });
        } catch (error) {
          // (res as NextApiResponse)
          //   .status(500)
          //   .json({ message: "Somgthing went wrong!" });
          const result = JSON.parse(body);
          (res as NextApiResponse).status(result.statusCode).json(result);
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", proxyResCb); //handle khi nhận dc response
  });
}
