import Notiflix from 'notiflix';
export default class NewApiService {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.KEY = '33345344-6416458ee2baf9633eccc50a4';
    this.searchNamePic = '';
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.page = 1;
    this.perPage = 100;
  }

  fetchGallery() {
    const a = document.querySelector('input[name="searchQuery"]').value;
    const url = `${this.BASE_URL}?key=${this.KEY}&q=${a}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.totalHits === 0) {
          Notiflix.Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else if (Math.floor(data.totalHits / this.perPage) === this.page) {
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
        this.incrementPage();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get namePic() {
    return this.searchNamePic;
  }

  set namePic(newNamePic) {
    this.searchNamePic = newNamePic;
  }
}
