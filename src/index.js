import NewApiService from './service-gallery';
import LoadMoreBtn from './loadMoreBtn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

var lightbox = new SimpleLightbox('.gallery-link');

const refs = {
  searchInput: document.querySelector('input[name="searchQuery"]'),
  searchForm: document.querySelector('.search-form'),
  galleryBox: document.querySelector('.gallery'),
};

const newApiService = new NewApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onPageWithGalerry);

function onSearch(evt) {
  evt.preventDefault();

  clearContainer();
  newApiService.resetPage();
  onPageWithGalerry();
}

function onPageWithGalerry() {
  loadMoreBtn.hide();

  newApiService.fetchGallery().then(hits => {
    refs.galleryBox.insertAdjacentHTML('beforeend', markupGallery(hits));
    lightbox.refresh();
    loadMoreBtn.show();
  });
}

function clearContainer() {
  refs.galleryBox.innerHTML = '';
}

function markupGallery(hits) {
  return hits
    .map(
      hit =>
        `<div class="photo-card">
  <a href="${hit.largeImageURL}" class="gallery-link"><img class="pic" src="${hit.webformatURL}" alt="${hit.tags}" width="340" loading="lazy" /></a>
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
