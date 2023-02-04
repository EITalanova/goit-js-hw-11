export default class NewApiService {
  constructor() {
    this.searchNamePic = '';
  }

  fetchGallery() {
    const url = `https://pixabay.com/api/?key=33345344-6416458ee2baf9633eccc50a4&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
    console.log('1');
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.hits;
      });
  }

  get namePic() {
    return this.searchNamePic;
  }

  set namePic(newNamePic) {
    this.searchNamePic = newNamePic;
  }
}
