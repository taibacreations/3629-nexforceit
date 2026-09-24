import React from 'react'


const Video = () => {
  return (
    <section className="w-full pb-[50px] px-4 md:px-6 xl:px-8">
      <div className="max-w-[1370px] mx-auto">
        <div className="w-full h-[68vh] overflow-hidden rounded-[30px]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/watch?v=mlmEeu782W4&list=RDmlmEeu782W4&start_radio=1"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Video;