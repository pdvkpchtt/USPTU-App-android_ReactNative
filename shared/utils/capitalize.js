export default function capitalize(string) {
  if (string) {
    return string[0].toUpperCase() + string.slice(1)
  } else return null
}
