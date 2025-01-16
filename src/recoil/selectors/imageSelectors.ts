import { selector } from "recoil";
import axios from "axios";
import { searchState } from "../atoms/searchState";
import { pageState } from "../atoms/pageState";

export const imageData = selector({
  key: "imageData",
  get: async ({ get }) => {
    const API_URL = "https://api.unsplash.com/search/photos";
    const API_KEY = "PA3yZIeLlu40WHOU22TQM97r8ZeOrlJbEs04bOvJa_U";
    const PER_PAGE = 30;

    const searchValue = get(searchState);
    const pageValue = get(pageState);

    try {
      const res = await axios.get(
        `${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  },
});
