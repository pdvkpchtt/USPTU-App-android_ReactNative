import getRandomInt from './getRandomInt'

const ALLOWED_CHARACTERS = '0123456789qwertyuiopasdfghjklzxcvbnm'

export default function getRandomString(size) {
  let randomString = ''

  for (let i = 0; i < size; i++) {
    randomString += ALLOWED_CHARACTERS[getRandomInt(0, size)]
  }

  return randomString
}
