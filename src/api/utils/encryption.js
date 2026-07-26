import CryptoJS from "crypto-js";

// 每个请求生成独立 IV，避免不同请求复用同一加密偏移量。
export const randomIv = () => {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
};

// 加密方法
export function Encrypt(data, k, i) {
  try {
    const key = CryptoJS.enc.Utf8.parse(k); // 十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse(i); // 十六位十六进制数作为密钥偏移量
    var srcs = CryptoJS.enc.Utf8.parse(data);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (error) {
    console.log(error);
  }
}

// 解密方法
export function Decrypt(data, k, i) {
  try {
    const key = CryptoJS.enc.Utf8.parse(k); // 十六位十六进制数作为密钥
    const iv = CryptoJS.enc.Utf8.parse(i); // 十六位十六进制数作为密钥偏移量
    var decrypt = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  } catch (error) {
    console.log(error);
  }
}

export const getEncryptedRequestPath = (url) => {
  const key = window.EZ_CONFIG.API_MIDDLEWARE_KEY;
  const iv = randomIv();
  const encrypted = Encrypt(url, key, iv);
  if (!encrypted) {
    throw new Error('API 路径加密失败');
  }

  // 外层编码使用无填充 Base64URL，确保密文始终是单一路径段。
  const token = btoa(encrypted)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');

  return { token, iv };
};
