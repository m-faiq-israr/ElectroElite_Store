"use client";

import React, { useState } from "react";

import AiwithText from "@/components/AI/AiChat";
import AiwithImage from "@/components/AI/AiImage";

const AIChatbot = () => {
  const [showComponent, setShowComponent] = useState<string>("");

  return (
    <div>
      <div className=" mt-8 flex items-center justify-center gap-12">
        <button
          onClick={() => setShowComponent("text")}
          className={`bg-blue-500 p-3 select-none text-white rounded-xl font-semibold hover:bg-blue-600 ${
            showComponent === "text" && "ring-4"
          }`}
        >
          AI with Text
        </button>
        <button
          onClick={() => setShowComponent("image")}
          className={`bg-blue-500 p-3 text-white select-none rounded-xl font-semibold hover:bg-blue-600 ${
            showComponent === "image" && "ring-4"
          }`}
        >
          AI with Image
        </button>
      </div>

      {showComponent === "text" && <AiwithText />}
      {showComponent === "image" && <AiwithImage />}
    </div>
  );
};

export default AIChatbot;
