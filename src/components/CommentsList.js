import React from "react";
import Comment from "./Comment";

const CommentsList = ({ comments }) => {
  if (!comments || !Array.isArray(comments)) {
    return null;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment, idx) => (
        <div key={idx}>
          <Comment data={comment} />
          {comment.replies?.length > 0 && (
            <div className="ml-6 pl-4 border-l border-gray-300 mt-2">
              <CommentsList comments={comment.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
