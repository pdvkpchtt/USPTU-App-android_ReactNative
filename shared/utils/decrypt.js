import CryptoES from 'crypto-es'

export default async function decrypt(string, key) {
  const keyHex = CryptoES.enc.Utf8.parse(key)
  const stringHex = CryptoES.lib.CipherParams.create({
    ciphertext: CryptoES.enc.Hex.parse(string),
  })
  const iv = CryptoES.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const decrypted = CryptoES.AES.decrypt(stringHex, keyHex, { iv: iv })
  const decryptedText = decrypted.toString(CryptoES.enc.Utf8)
  return decryptedText
}
