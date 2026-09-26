import React from "react";

const Video = () => {
  return (
    <section
      className="bg-black w-full 2xl:pb-[50px]
      px-4 md:px-6 xl:px-8"
    >
      <div className="max-w-[1370px] mx-auto">
        <div className="w-full h-[68vh] overflow-hidden rounded-[30px]">
          <video
            className="w-full h-full object-contain"
            controls
            poster="/video.png"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Video;