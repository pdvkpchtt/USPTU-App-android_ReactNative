import CryptoES from 'crypto-es'

export default async function encrypt(string, key) {
  const keyHex = CryptoES.enc.Utf8.parse(key)
  const iv = CryptoES.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const encrypted = CryptoES.AES.encrypt(string, keyHex, { iv: iv })
  const encryptedText = encrypted.toString(CryptoES.format.Hex)
  return encryptedText
}
