import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../utils/appSlice";
import { useState } from "react";
import { SEARCH_LINK, YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { setSearchResults } from "../utils/searchSlice";
import { showJoke } from "../utils/jokeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search.cache);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchResults = useSelector((store) =>
    searchQuery ? store.search.searchResults[searchQuery] ?? [] : []
  );
  const getRandomJoke = async () => {
    const data = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
      headers: { "X-Api-Key": process.env.REACT_APP_JOKE_API_KEY },
    });
    const json = await data.json();
    return json[0].joke;
  };
  const handlePopupOpen = async (direction) => {
    const randomJoke = await getRandomJoke();
    dispatch(
      showJoke({
        joke: randomJoke,
        position: direction,
      })
    );
  };
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };
  const getSearchQuery = async () => {
    const data = await fetch(
      "https://www.searchapi.io/api/v1/search?engine=google_autocomplete&q=" +
        searchQuery +
        "&client=gws-wiz&hl=en&gl=us&api_key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    );
    const json = await data.json();
    const suggestions = json.suggestions.map((item) => ({
      value: item.value, // always exists
    }));

    console.log(suggestions);
    const suggestionResults = suggestions.map((s) => s.value);
    setSuggestions(suggestionResults);
    dispatch(
      cacheResults({
        [searchQuery]: suggestionResults,
      })
    );
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchQuery();
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const handleSearchClick = () => {
    setShowSuggestions(false);
    if (searchResults.length > 0) {
      navigate(`/results?search_query=${searchQuery}`);
    } else {
      getSearchResults(searchQuery);
      navigate(`/results?search_query=${searchQuery}`);
    }
  };
  const API_KEY = process.env.REACT_APP_YT_API_KEY;

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${API_KEY}`;
  const getSearchResults = async (searchQuery) => {
    // const data = await fetch(
    //   "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +
    //     searchQuery +
    //     // "&key=AIzaSyDdkD3MGs-C8Bqw1a0B0mYhNZ0KxzmZHlY"
    //     "&key=process.env.REACT_APP_YT_API_KEY"
    // );
    const data = await fetch(url);
    const json = await data.json();
    const searchVideos = json.items.map((item) => ({
      id: item.id.videoId,
      snippet: item.snippet || {},
      statistics: item.statistics || {},
    }));
    dispatch(setSearchResults({ [searchQuery]: searchVideos }));
    console.log(json.items);
  };
  return (
    <div className="flex items-center mx-6">
      <div className="flex gap-2">
        <button
          className="cursor-pointer"
          onClick={() => {
            handlePopupOpen("topLeft");
          }}
        >
          <img
            className="h-16"
            src="https://static.vecteezy.com/system/resources/previews/021/190/402/non_2x/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
          />
        </button>
        <Link to={"/"}>
          <img
            className="h-16"
            src="https://tse1.mm.bing.net/th/id/OIP.sCtdNjphAin-gugu0MNptAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
          />
        </Link>
      </div>
      <div></div>
      <div className="w-[60%] mx-auto relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchClick();
          }}
        >
          <div className="w-[70%] relative">
            <input
              className="rounded-2xl mr-6 py-1 p-2 border border-black w-full"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            <button type="submit" className="absolute right-4 top-2 ">
              <img
                className="w-4"
                src="https://thaka.bing.com/th/id/OIP.j1sMPSP-emIbWhpgbf50zQHaHa?w=195&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              />
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full z-[20] left-0 bg-white w-[70%] ">
              <ul className="flex flex-col py-2 px-5 ">
                {suggestions?.map((suggestion) => (
                  <li
                    className="cursor-pointer"
                    onMouseDown={() => {
                      setSearchQuery(suggestion);
                      handleSearchClick();
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
      <div
        onClick={() => {
          handlePopupOpen("topRight");
        }}
      >
        <img
          className="h-12"
          src="https://tse4.mm.bing.net/th/id/OIP.Ln_qrnMeEWlR-sIzaHn2fAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
        />
      </div>
    </div>
  );
};

export default Header;
