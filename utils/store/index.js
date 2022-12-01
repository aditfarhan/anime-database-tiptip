import { createStore, action } from 'easy-peasy';

const store = createStore({
  favouriteAnime: [],
  addFavouriteAnime: action((state, payload) => {
    state.favouriteAnime.push(payload);
  }),
  removeFavouriteAnime: action((state, payload) => {
    state.favouriteAnime = state?.favouriteAnime?.filter((x) => x !== payload);
  })
});

export default store;
