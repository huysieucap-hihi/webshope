const { google } = require("@googleapis/content");
const axios = require("axios");
const cheerio = require("cheerio");
<<<<<<< HEAD
const path = require("path");
=======
>>>>>>> f91acf0db931871f1fe100e4f1c424c87670843b
const express = require("express");
const cors = require("cors");

const app = express();
<<<<<<< HEAD

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const MERCHANT_ID = "5736768757";

/* key file trên Render */
const KEY_FILE = "/etc/secrets/google-key.json";

/* PORT cho Render */
const PORT = process.env.PORT || 3000;

async function crawlShopee(link) {

const { data } = await axios.get(link,{
headers:{
"User-Agent":"Mozilla/5.0",
"Accept-Language":"vi-VN,vi;q=0.9"
}
=======
app.use(express.json());
app.use(cors());

const MERCHANT_ID = "5736768757";

/* KEY FILE trên Render */
const KEY_FILE = "/etc/secrets/google-key.json";

async function crawlShopee(link) {
const { data } = await axios.get(link, {
headers: {
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
"Accept-Language": "vi-VN,vi;q=0.9",
},
>>>>>>> f91acf0db931871f1fe100e4f1c424c87670843b
});

const $ = cheerio.load(data);

const title =
<<<<<<< HEAD
$('meta[property="og:title"]').attr("content")
|| "Sản phẩm Shopee";

const image =
$('meta[property="og:image"]').attr("content")
|| "https://via.placeholder.com/500";

return { title,image };

}

async function ganMaYoutube(shopeeLink){

try{

console.log("⏳ Crawl dữ liệu Shopee...");

const data = await crawlShopee(shopeeLink);

const auth = new google.auth.GoogleAuth({
keyFile:KEY_FILE,
scopes:["https://www.googleapis.com/auth/content"]
=======
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
>>>>>>> f91acf0db931871f1fe100e4f1c424c87670843b
});

const client = await auth.getClient();

const content = google.content({
<<<<<<< HEAD
version:"v2.1",
auth:client
});

const productId = "sp_"+Date.now();

const product = {

offerId:productId,

title:data.title.substring(0,150),

description:data.title,

/* link sản phẩm trên site của bạn */

link:
"https://webshopee-new.onrender.com/product/"+productId,

imageLink:data.image,

contentLanguage:"vi",

targetCountry:"VN",

channel:"online",

availability:"in stock",

condition:"new",

brand:"Shopee",

googleProductCategory:"Electronics",

price:{
value:"100000",
currency:"VND"
}

};

const response = await content.products.insert({

merchantId:MERCHANT_ID,

requestBody:product

});

console.log("✅ Đã đẩy lên Merchant:",response.data.id);

return{

success:true,

id:response.data.id

};

}catch(error){

console.error("❌ Lỗi:",error.response?.data || error.message);

return{

success:false,

error:error.response?.data || error.message

};

}

}

app.post("/api/gan-ma",async(req,res)=>{

const link = req.body.link;

if(!link){

return res.json({

success:false,

error:"Thiếu link Shopee"

});

=======
  version: "v2.1",
  auth: client,
});

const productId = "sp_" + Date.now();

const product = {
  offerId: productId,
  title: data.title.substring(0, 150),
  description: data.title,

  link: "https://yourdomain.com/product/" + productId,

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
```

} catch (error) {
console.error("❌ Lỗi:", error.response?.data || error.message);

```
return {
  success: false,
  error: error.response?.data || error.message,
};
```

}
}

app.post("/api/gan-ma", async (req, res) => {
const link = req.body.link;

if (!link) {
return res.json({
success: false,
error: "Thiếu link Shopee",
});
>>>>>>> f91acf0db931871f1fe100e4f1c424c87670843b
}

const result = await ganMaYoutube(link);

res.json(result);
<<<<<<< HEAD

});

/* trang sản phẩm để Merchant duyệt */

app.get("/product/:id",(req,res)=>{

res.send(`

<html>

<head>

<title>Sản phẩm Shopee</title>

</head>

<body>

<h1>Sản phẩm Shopee</h1>

<p>ID: ${req.params.id}</p>

</body>

</html>

`);

});

app.listen(PORT,()=>{

console.log("🚀 Server chạy tại port "+PORT);

=======
});

/* PORT cho Render */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("🚀 Server chạy tại port " + PORT);
>>>>>>> f91acf0db931871f1fe100e4f1c424c87670843b
});
