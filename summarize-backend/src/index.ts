import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import puppeteer from "puppeteer";
import "dotenv/config";

import { fetching } from "./fetching";
import { capitalize } from "./capitalize";

const app = new Hono();

const message = "Something went wrong";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const BROWSERLESS_URL = process.env.BROWSERLESS_URL;

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type"],
  })
);

app.post("/", async (c) => {
  const { url } = await c.req.json();

  const AI_TOKEN = process.env.AI_TOKEN as string;
  const USER_ID = process.env.USER_ID as string;

  if (!url) {
    return c.json({ message }, 400);
  }

  let browser = null;

  try {
    browser = IS_PRODUCTION
      ? await puppeteer.connect({ browserWSEndpoint: BROWSERLESS_URL })
      : await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}`, {
      waitUntil: "networkidle0",
    });
    const screenshotBuffer = await page.screenshot({
      encoding: "base64",
      optimizeForSpeed: true,
      quality: 50,
      type: "webp",
    });

    const textWithNewlines = await page.evaluate(() => {
      const body = document.querySelector("body")?.innerText;
      return body;
    });

    if (textWithNewlines === undefined) {
      return c.json({ message }, 400);
    }

    const text = await fetching(textWithNewlines, AI_TOKEN, USER_ID);
    const screenshotBase64 = screenshotBuffer.toString();

    return c.json({
      text: capitalize(text),
      image: `data:image/png;base64,${screenshotBase64}`,
    });
  } catch (error) {
    console.error(error);
    return c.json({ message }, 400);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
