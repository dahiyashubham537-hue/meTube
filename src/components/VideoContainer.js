import React, { useEffect, useState } from "react";
import { YOUTUBE_LINK } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link, useSearchParams } from "react-router-dom";
import OpenAI from "openai";
import { setVideo } from "../utils/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import RandomJoke from "./RandomJoke";
import { cacheComments } from "../utils/commentsSlice";
import { addVideos } from "../utils/popularVideosSlice";
import Shimmer from "./Shimmer";

const VideoContainer = () => {
  const VideosShimmer = ({ query }) => {
    if (query) {
      // 🔎 Search Page Shimmer (list style)
      return (
        <div className="flex flex-col gap-4 ml-10 mr-6 animate-pulse">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex gap-4 w-full">
              {/* Thumbnail shimmer */}
              <div className="w-60 h-36 bg-gray-300 rounded-xl flex-shrink-0"></div>

              {/* Text shimmer */}
              <div className="flex flex-col flex-1 gap-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-100 rounded w-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 🏠 Home Page Shimmer (card grid)
    return (
      <div className="flex flex-wrap gap-6 ml-8 mr-6 animate-pulse">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="w-[40%] max-w-sm flex flex-col gap-2 cursor-pointer"
          >
            {/* Thumbnail shimmer */}
            <div className="w-full h-52 bg-gray-300 rounded-xl"></div>

            {/* Info shimmer */}
            <div className="flex gap-3 mt-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");
  console.log(query);
  // const [videos, setVideos] = useState([]);
  const videos = useSelector((store) => store.popularVideos.videos);
  const searchResults = useSelector((store) =>
    query ? store.search.searchResults[query] : []
  );
  const videosToShow = !query ? videos : searchResults;
  console.log(videos);
  console.log(videosToShow);
  const handleClick = (video) => {
    dispatch(setVideo(video));
  };

  const getVideoData = async () => {
    const data = await fetch(YOUTUBE_LINK);
    const json = await data.json();
    // setVideos(json.items);
    dispatch(addVideos(json.items));
  };

  useEffect(() => {
    if (query || videos.length > 0) return;
    getVideoData();
  }, []);

  return (
    <>
      <RandomJoke />
      <div
        className={`gap-4 flex-wrap w-full mr-6 ml-10 overflow-x-hidden ${
          query ? "flex flex-col" : "flex ml-8"
        }`}
      >
        {!videosToShow || videosToShow.length === 0 ? (
          <VideosShimmer query={query} />
        ) : (
          videosToShow?.map((video) => (
            <Link
              className={`query? "w-[35%]":"w-[40%]"`}
              key={video.id}
              to={`/watch?v=${video.id}`}
              onClick={() => handleClick(video)}
            >
              <VideoCard videoDetails={video} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default VideoContainer;
