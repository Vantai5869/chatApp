import CryptoJS from "react-native-crypto-js";


export const encryptData = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
}

export const decryptData = (encryptedData, key) =>{
    let bytes  = CryptoJS.AES.decrypt(encryptedData, key);
    return  bytes.toString(CryptoJS.enc.Utf8);
}

