"use client";

import React, { useRef, useState } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setStarted(true);
    }
  };

  return (
    <section
      className="bg-black w-full 2xl:pb-[50px]
      px-4 md:px-6 xl:px-8"
    >
      <div className="max-w-[1370px] mx-auto">
        <div className="relative w-full h-[68vh] overflow-hidden rounded-[30px]">

          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls={started}
            poster="/video.png"
            onPlay={() => setStarted(true)}
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Icon */}
          {!started && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
            >
              <span className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 hover:bg-white transition">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default Video;