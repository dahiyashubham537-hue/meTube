import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeSidebar } from "../utils/appSlice";
import CommentsContainer from "./CommentsContainer";
import ChatContainer from "./ChatContainer";
import OpenAI from "openai";
import { cacheComments } from "../utils/commentsSlice";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  console.log(id);
  const comments = useSelector((store) => store.comments.commentsByVideo[id]);
  // console.log(comments);
  const { tags, videoTitle } = useSelector((store) => store.video);
  const inputContext = tags?.length > 0 ? tags.join(", ") : videoTitle;
  const getNestedComments = async () => {
    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: import.meta.env.REACT_HF_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const gptQuery = `
Generate funny nested comments based on these video tags:

"${inputContext}"

Output requirements:
- Return only valid JSON (no code fences, no "const" declaration).
- The top-level structure should be an array of objects with fields:
  - name: string
  - text: string
  - replies: array (can be empty)
`;

    const gptResults = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: gptQuery }],
    });

    const content = gptResults.choices[0].message.content;
    const commentsData = JSON.parse(content);
    console.log(commentsData);

    dispatch(
      cacheComments({
        [id]: commentsData, // <-- store the whole array
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSidebar());
    if (comments) return;
    getNestedComments();
  }, []);
  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <iframe
          width="900"
          height="500"
          className="ml-24 mt-12 rounded-md w-[60%]"
          src={"https://www.youtube.com/embed/" + id + "?si=m3WS24duuWwzXSMd"}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <ChatContainer />
      </div>
      <CommentsContainer />
    </div>
  );
};

export default Watch;
