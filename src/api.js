import fetchHelper from "./utils/fetchHelper"

const baseUrl = 'https://api.unsplash.com'

async function getImages(text) {
  const response = await fetchHelper(`${baseUrl}/search/photos?per_page=20&query=${text}`)
  const images = response.results
  return images
}

export default { getImages }
