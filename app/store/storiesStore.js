import { observable, action } from "mobx";
import { API_URL, PAGE_SIZE } from "../config/constants";

class Stories {
  @observable stories = [];
  @observable storyIds = [];
  @observable isFetchingStories = false;
  @observable isRefreshing = false;

  @action
  getStories = async () => {
    const getTopStories = async () => {
      //Have a try and catch block for catching errors.
      try {
        //Assign the promise unresolved first then get the data using the json method.
        const response = await fetch(`${API_URL}topstories.json`);
        const topStories = await response.json();
        return topStories;
      } catch (err) {
        console.log("Error fetching getTopStories data", err);
      }
    };

    getTopStories()
      .then(storyIds => {
        this.storyIds = storyIds;
        return storyIds;
      })
      .then(this.getMore);
  };

  @action
  getStory = async storyId => {
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method.
      const response = await fetch(`${API_URL}item/${storyId}.json`);
      const story = await response.json();
      return story;
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  };

  @action
  getStoryDetails = async storyIds => {
    try {
      this.isFetchingStories = true;
      const storyItems = storyIds.map(this.getStory);
      const allStories = await Promise.all(storyItems);

      this.stories = this.stories.concat(allStories);
      this.isFetchingStories = false;
      return allStories;
    } catch (err) {
      console.error("Something went wrong getting all stories", err);
    }
  };

  @action
  getMore = () => {
    const endOfList = this.stories.length === this.storyIds.length;

    // exit quickly if we can't fetch more
    if (endOfList || this.isFetchingStories) {
      return;
    }

    const start = this.stories.length;
    const end = start + PAGE_SIZE;
    const storyIds = this.storyIds.slice(start, end);

    this.getStoryDetails(storyIds);
  };

  @action
  refresh = () => {
    this.isRefreshing = true;
    this.stories = [];
    this.storyIds = [];
    this.getStories().then(() => {
      this.isRefreshing = false;
    });
  };
}

const StoriesStore = new Stories();

export default StoriesStore;
