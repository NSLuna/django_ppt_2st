"use client";

import { useState } from "react";
import ImageZoomModal from "./ImageZoomModal";

export default function ProjectModal({ project, onClose }) {
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 overflow-auto">
      <div className="bg-white p-8 rounded-xl w-[600px] shadow-xl mt-20 relative">

        {/* 닫기 버튼 + 제목 */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-[#ff4f7b]">{project.title}</h2>
          <button
            className="text-gray-500 hover:text-black text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* 대표 이미지 */}
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt="썸네일"
            className="w-full rounded-lg mb-4"
          />
        )}

        {/* 여러 장 이미지 썸네일 */}
        {project.images && project.images.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">추가 이미지</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.image_url}
                  alt={`추가 이미지 ${idx}`}
                  className="w-28 h-28 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  onClick={() => setZoomImage(img.image_url)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 클릭한 이미지 확대 모달 */}
        {zoomImage && (
        <ImageZoomModal
          image={zoomImage}
          onClose={() => setZoomImage(null)}
        />
      )}

        {/* 기술 스택 */}
        {project.tech_stack && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">사용 기술</h3>
            <div className="flex gap-2 flex-wrap">
              {project.tech_stack.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 설명 */}
        <p className="text-gray-600 mb-4">{project.description}</p>

        {/* GitHub */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm text-blue-600 block mt-5"
          >
            GitHub 링크 보기
          </a>
        )}
      </div>


    </div>
  );
}
