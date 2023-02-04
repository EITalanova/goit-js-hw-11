import NewApiService from './service-gallery';

const refs = {
  searchInput: document.querySelector('input[name="searchQuery"]'),
  searchForm: document.querySelector('.search-form'),
  galleryBox: document.querySelector('.gallery'),
};

const newApiService = new NewApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  // clearContainer();
  // newApiService.namePic = evt.currentTarget.elements.namePic.value;
//   console.log(newApiService.namePic);

    newApiService.fetchGallery().then(hits => refs.galleryBox.insertAdjacentHTML('beforeend', markupGallery(hits))
    );
}

function clearContainer() {
  refs.galleryBox.innerHTML = '';
}

function markupGallery(hits) {
  return hits
    .map(
      hit =>
        `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">${hit.likes}
      <b>Likes</b>
    </p>
    <p class="info-item">${hit.views}
      <b>Views</b>
    </p>
    <p class="info-item">${hit.comments}
      <b>Comments</b>
    </p>
    <p class="info-item">${hit.downloads}
      <b>Downloads</b>
    </p>
  </div>
</div>`
    )
    .join('');
}


