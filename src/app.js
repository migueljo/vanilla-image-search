import _ from 'lodash'
import delegate from 'delegate'

import api from './api'

const searchElm = document.querySelector('#search')
const imageListElm = document.querySelector('#image-list')
const dialogElm = document.querySelector('#image-dialog')
const closeDialogElm = document.querySelector('#image-dialog-close')
const imageDialog = document.querySelector('#image-dialog-image')
let imageList = []

const handleSearchChange = _.debounce(async (event) => {
  const text = event.target.value
  if (text.length <= 3) return

  try {
    imageList = await api.getImages(text)
    renderImages(imageList)
  } catch (error) {
    console.error("Error getting images", error)
    alert("Search failed")
  }
}, 300)

function renderImages(images) {
  const html = images.map(image => {
    return `
      <button class="image">
        <figure class="image__ctn">
          <img
            class="image__img"
            src="${image.urls.regular}"
            alt="${image.alt_description}"
            data-id="${image.id}"
          />
        </figure>
      </button>
    `
  }).join('')

  imageListElm.innerHTML = html
}

function handleImageClick(event) {
  const imageElm = event.target
  const imageId = imageElm.getAttribute('data-id')
  const imageData = imageList.find(image => image.id === imageId)
  imageDialog.src = imageData.urls.regular
  dialogElm.classList.add('show')
}

function handleCloseDialogClick(event) {
  event.stopPropagation()
  dialogElm.classList.remove('show')
}

searchElm.addEventListener('input', handleSearchChange)

delegate('.image', 'click', handleImageClick)

closeDialogElm.addEventListener('click', handleCloseDialogClick)
