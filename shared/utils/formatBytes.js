export default function formatBytes(a) {
  let b = 0,
    c = parseInt(a, 10) || 0
  for (; 1024 <= c && ++b; ) c /= 1024
  return c.toFixed(10 > c && 0 < b ? 1 : 0) + ' ' + ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][b]
}
