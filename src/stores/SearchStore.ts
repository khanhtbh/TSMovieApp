import {makeAutoObservable} from 'mobx';

class SearchStore {
  searchQuery = '';
  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(text: string) {
    this.searchQuery = text;
  }
}

export default SearchStore;
