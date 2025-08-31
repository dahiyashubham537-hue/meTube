import React from "react";
import { useLocation } from "react-router-dom";

const formatViews = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const VideoCard = ({ videoDetails }) => {
  const { snippet, statistics } = videoDetails;
  const location = useLocation();
  const isSearchPage =
    new URLSearchParams(location.search).toString().length > 0;

  return (
    <div
      className={`w-full cursor-pointer ${
        isSearchPage ? "flex gap-4" : "max-w-[20rem] flex flex-col"
      }`}
    >
      {/* Thumbnail */}
      <img
        className={`rounded-xl object-cover ${
          isSearchPage ? "w-[30rem] h-52 flex-shrink-0" : "w-full h-52"
        }`}
        src={snippet.thumbnails.high.url}
        alt={snippet.title}
      />

      {/* Video Info */}
      <div
        className={`flex ${isSearchPage ? "flex-col w-full" : "mt-3 gap-3"}`}
      >
        {/* Channel Icon (only show in home style) */}
        {!isSearchPage && (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
        )}

        {/* Text Details */}
        <div className="`flex flex-col`">
          <p className="text-sm font-semibold line-clamp-2">{snippet.title}</p>
          <span className="text-xs text-gray-500">{snippet.channelTitle}</span>
          {!isSearchPage && (
            <span className="text-xs text-gray-500">
              {formatViews(statistics.viewCount)} views
            </span>
          )}

          {/* Description only on search page */}
          {isSearchPage && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {snippet.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
