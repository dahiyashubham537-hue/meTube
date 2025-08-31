import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSearchResults } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

const ButtonList = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useSelector((store) =>
    searchQuery ? store.search.searchResults[searchQuery] ?? [] : []
  );
  const handleClick = (label) => {
    setSearchQuery(label);
    if (searchResults.length > 0) {
      navigate(`/results?search_query=${label}`);
    } else {
      getSearchResults(searchQuery);
      navigate(`/results?search_query=${label}`);
    }
  };
  const API_KEY = process.env.REACT_APP_YT_API_KEY;
  const getSearchResults = async (searchQuery) => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${API_KEY}`
    );

    const json = await data.json();
    const searchVideos = json.items.map((item) => ({
      id: item.id.videoId,
      snippet: item.snippet || {},
      statistics: item.statistics || {},
    }));
    dispatch(setSearchResults({ [searchQuery]: searchVideos }));
  };

  const categories = [
    "All",
    "Music",
    "Gaming",
    "News",
    "Sports",
    "Movies",
    "Live",
    "Learning",
    "Trending",
    "Podcasts",
    "Comedy",
    "Cricket",
    "Dramedy",
    "Sitcoms",
    "Gaming",
    "WWE",
  ];

  return (
    <div className="flex relative max-w-[85rem] mx-auto my-4">
      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className="p-2 absolute -left-4 rounded-full bg-white shadow-md border mr-2"
      >
        ◀
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex mx-8 overflow-x-hidden whitespace-nowrap scroll-smooth w-full"
      >
        {categories.map((label, idx) => (
          <button
            onClick={() => {
              handleClick(label);
            }}
            key={idx}
            className="flex-none cursor-pointer mx-2 px-4 py-2 rounded-xl border border-gray-300 bg-gray-100 hover:bg-gray-200 font-medium"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className=" absolute -right-4 p-2 rounded-full bg-white shadow-md border ml-2"
      >
        ▶
      </button>
    </div>
  );
};

export default ButtonList;
