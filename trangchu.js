// Ví dụ xử lý tại Frontend (Script.js)
const validateShopeeLink = (url) => {
  const pattern = /^(https?:\/\/)?(vn\.shp\.ee|shopee\.vn|shope\.ee)\/.+$/;
  return pattern.test(url);
};

if (!validateShopeeLink(inputUrl)) {
  alert("Link không hợp lệ! Vui lòng kiểm tra lại.");
}
