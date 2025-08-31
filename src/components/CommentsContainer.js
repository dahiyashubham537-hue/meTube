import React from "react";
import Comment from "./Comment";
import CommentsList from "./CommentsList";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const CommentsShimmer = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="flex items-start space-x-2">
          {/* Avatar shimmer */}
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />

          {/* Text shimmer */}
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-32" />
            <div className="h-3 bg-gray-200 rounded w-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

const CommentsContainer = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  const commentsData = useSelector(
    (store) => store.comments.commentsByVideo[id]
  );
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {!commentsData ? (
        <CommentsShimmer /> // ⬅️ Show shimmer while loading
      ) : (
        <CommentsList comments={commentsData} />
      )}
    </div>
  );
};

export default CommentsContainer;
