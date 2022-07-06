import fetchHelper from "./utils/fetchHelper"

// const baseUrl = 'https://api.unsplash.com'
const baseUrl = 'http://localhost:3004'

async function getImages(text) {
  // const url = `${baseUrl}/search/photos?per_page=20&query=${text}`
  const url = `${baseUrl}/images`
  const response = await fetchHelper(url)
  const images = response.results
  return images
}

export default { getImages }
