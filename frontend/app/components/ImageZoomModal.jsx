"use client";

export default function ImageZoomModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
      <div className="relative max-w-4xl w-full px-4">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300"
        >
          ✕
        </button>

        <img
          src={image}
          alt="zoomed"
          className="w-full max-h-[90vh] object-contain rounded-xl"
        />
      </div>
    </div>
  );
}
