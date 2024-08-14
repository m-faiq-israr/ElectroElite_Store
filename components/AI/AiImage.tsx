"use client";

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "./ImageHelper";

interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

const AiwithImage: React.FC = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDQ09-Cs6WIFhhL0oGcIZZe9LPmdW0eQ-w"
  );

  const [image, setImage] = useState<string>("");
  const [imageInlineData, setImageInlineData] = useState<GenerativePart | null>(
    null
  );
  const [aiResponse, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  async function aiImageRun() {
    if (!imageInlineData) return;
    setLoading(true);
    setResponse("");
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    try {
      const result = await model.generateContent([
        "What's in this photo?",
        imageInlineData,
      ]);
      const response = await result.response;
      const text = await response.text();
      setResponse(text);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setResponse("Error generating AI content");
    } finally {
      setLoading(false);
    }
  }

  const handleClick = () => {
    aiImageRun();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      getBase64(file)
        .then((result) => {
          setImage(result as string);
        })
        .catch((e) => console.log(e));

      fileToGenerativePart(file)
        .then((image) => {
          setImageInlineData(image);
        })
        .catch((e) => console.log(e));
    }
  };

  async function fileToGenerativePart(file: File): Promise<GenerativePart> {
    const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result.split(",")[1]);
        } else {
          reject(new Error("Failed to read file as a data URL"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

    try {
      const data = await base64EncodedDataPromise;
      return { inlineData: { data, mimeType: file.type } };
    } catch (error) {
      console.error(error);
      throw new Error("Error converting file to generative part");
    }
  }

  return (
    <div className="p-4 mt-5 mx-8 bg-gray-100 rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="bg-blue-500 select-none p-3 rounded-xl inline-block mb-5 font-bold text-heading2-bold text-white">
          Ask with Image
        </h1>
      </div>
      <div className="flex space-x-2">
        <input
          type="file"
          id="file-upload"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {image && (
        <div className="mt-4">
          <img src={image} alt="Selected" className="w-60  rounded-lg" />
        </div>
      )}

      {loading && aiResponse === "" ? (
        <p className="mt-4 text-center ">Loading...</p>
      ) : (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg">
          <p className="text-gray-700">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AiwithImage;
