"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDQ09-Cs6WIFhhL0oGcIZZe9LPmdW0eQ-w"
  );

  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

 
  async function aiRun() {
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `${search}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); 
    setResponse(text);
    setLoading(false);
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    aiRun();
  };

  return (
    <div className="  p-4 mt-5 mx-8 bg-gray-100 rounded-lg shadow-md">
      <div className=" text-center">
        <h1 className="  text-center select-none bg-blue-500 p-3 rounded-xl  inline-block mb-5 font-bold text-heading2-bold text-white">
          Ask Anything with Text
        </h1>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChangeSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {loading && aiResponse === "" ? (
        <p className="mt-4 text-center text-gray-500">Loading ...</p>
      ) : (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg">
          <p className="text-gray-700">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AiwithText;
