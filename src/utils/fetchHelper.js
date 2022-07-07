import config from "./config"

function fetchHelper(url, options = {}) {
  const _options = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Client-ID ${config.unsplashAccessKey}`
    }
  }

  return fetch(url, _options).then(res => res.json())
}

export default fetchHelper
