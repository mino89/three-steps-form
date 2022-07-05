export default function debounce (callback, time) {
  let debounceTimer
  return (e) => {
    window.clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(callback.bind(null, e), time)
  }
}
