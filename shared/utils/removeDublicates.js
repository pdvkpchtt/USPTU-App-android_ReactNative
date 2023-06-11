export default function removeDuplicates(array, key) {
  let lookup = {}
  array.forEach((element) => {
    lookup[element[key]] = element
  })
  return Object.keys(lookup).map((key) => lookup[key])
}
