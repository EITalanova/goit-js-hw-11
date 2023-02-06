import Notiflix from 'notiflix';
import axios from 'axios';
export default class NewApiService {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.KEY = '33345344-6416458ee2baf9633eccc50a4';
    this.searchNamePic = '';
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
    this.page = 1;
    this.perPage = 40;
  }

  async fetchGallery() {
    const searchNamePic = document.querySelector(
      'input[name="searchQuery"]'
    ).value;
    const url = `${this.BASE_URL}?key=${this.KEY}&q=${searchNamePic}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.totalHits === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else if (Math.floor(data.totalHits / this.perPage) === this.page) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      this.incrementPage();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      return data.hits;
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
