import React from 'react';

const TrailerModal = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-[80%] h-[80%]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[#6556CD]"
        >
          <i className="ri-close-line text-3xl"></i>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Movie Trailer"
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;