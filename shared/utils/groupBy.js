export default function groupBy(arr, key) {
  return arr.reduce(function (r, a, i) {
    if (!i || r[r.length - 1][0][key] !== a[key]) {
      return r.concat([[a]])
    }
    r[r.length - 1].push(a)
    return r
  }, [])
}
