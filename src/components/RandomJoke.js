import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideJoke } from "../utils/jokeSlice";

const RandomJoke = () => {
  // const [joke, setJoke] = useState("");
  // const getRandomJoke = async () => {
  //   const data = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
  //     headers: { "X-Api-Key": "vJdMy+fRNourrOrq4/ABqw==rqltVziUwEy0GesO" },
  //   });
  //   const json = await data.json();
  //   console.log(json[0].joke);
  //   setJoke(json[0].joke);
  // };
  // useEffect(() => {
  //   getRandomJoke();
  // }, []);
  const { isOpen, joke, position } = useSelector((store) => store.joke);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  const positionClassesMap = {
    left: "left-26 bottom-106",
    topLeft: "left-23 top-4",
    topRight: "right-20 top-4",
  };
  const positionClasses = positionClassesMap[position] || "right-4 bottom-4";
  return (
    <div
      className={`fixed ${positionClasses} bg-white shadow-lg rounded-xl p-4 border w-72`}
    >
      <p className="text-gray-800">{joke}</p>
      <button
        className="mt-2 text-sm text-pink-500"
        onClick={() => dispatch(hideJoke())}
      >
        Close
      </button>
    </div>
  );
};

export default RandomJoke;
