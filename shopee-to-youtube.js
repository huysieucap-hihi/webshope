const { google } = require("@googleapis/content");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const MERCHANT_ID = "5736768757";

/* key file trên Render */
const KEY_FILE = "/etc/secrets/google-key.json";

/* PORT cho Render */
const PORT = process.env.PORT || 3000;

async function crawlShopee(link) {
  const { data } = await axios.get(link, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept-Language": "vi-VN,vi;q=0.9",
    },
  });

  const $ = cheerio.load(data);

  const title =
    $('meta[property="og:title"]').attr("content") || "Sản phẩm Shopee";

  const image =
    $('meta[property="og:image"]').attr("content") ||
    "https://via.placeholder.com/500";

  return { title, image };
}

async function ganMaYoutube(shopeeLink) {
  try {
    console.log("⏳ Crawl dữ liệu Shopee...");

    ```
const data = await crawlShopee(shopeeLink);

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: ["https://www.googleapis.com/auth/content"],
});

const client = await auth.getClient();

const content = google.content({
  version: "v2.1",
  auth: client,
});

const productId = "sp_" + Date.now();

const product = {
  offerId: productId,
  title: data.title.substring(0, 150),
  description: data.title,

  link: "https://webshopee-new.onrender.com/product/" + productId,

  imageLink: data.image,

  contentLanguage: "vi",
  targetCountry: "VN",
  channel: "online",

  availability: "in stock",
  condition: "new",

  brand: "Shopee",
  googleProductCategory: "Electronics",

  price: {
    value: "100000",
    currency: "VND",
  },
};

const response = await content.products.insert({
  merchantId: MERCHANT_ID,
  requestBody: product,
});

console.log("✅ Đã đẩy lên Merchant:", response.data.id);

return {
  success: true,
  id: response.data.id,
};
```;
  } catch (error) {
    console.error("❌ Lỗi:", error.response?.data || error.message);

    ```
return {
  success: false,
  error: error.response?.data || error.message,
};
```;
  }
}

app.post("/api/gan-ma", async (req, res) => {
  const link = req.body.link;

  if (!link) {
    return res.json({
      success: false,
      error: "Thiếu link Shopee",
    });
  }

  const result = await ganMaYoutube(link);
  res.json(result);
});

/* trang sản phẩm để Merchant duyệt */
app.get("/product/:id", (req, res) => {
  res.send(`<h1>Sản phẩm Shopee</h1><p>ID: ${req.params.id}</p>`);
});

app.listen(PORT, () => {
  console.log("🚀 Server chạy tại port " + PORT);
});
