"use client";

import { useState } from "react";
import ImageZoomModal from "./ImageZoomModal";

export default function ProjectModal({ project, onClose }) {
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50 overflow-auto">
      <div className="bg-[#F6F1EE] p-8 rounded-2xl w-[650px] shadow-[0_4px_25px_rgba(0,0,0,0.12)] mt-20 relative border border-[#E3D8D3]">

        {/* 닫기 + 제목 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#6E618E] tracking-tight">
            {project.title}
          </h2>
          <button
            className="text-gray-500 hover:text-[#6E618E] text-2xl transition"
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
            className="w-full rounded-xl mb-5 shadow-sm"
          />
        )}

        {/* 여러 장 이미지 */}
        {project.images && project.images.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-[#6E618E] mb-2">추가 이미지</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.image_url}
                  alt={`추가 이미지 ${idx}`}
                  className="w-28 h-28 object-cover rounded-xl cursor-pointer
                             hover:opacity-80 transition shadow-sm"
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
          <div className="mb-6">
            <h3 className="font-semibold text-[#6E618E] mb-2">사용 기술</h3>
            <div className="flex gap-2 flex-wrap">
              {project.tech_stack.split(",").map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#E8E2DD] text-[#4A3F35] rounded-full text-xs shadow-sm"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 설명 */}
        <p className="text-[#5A4D45] leading-relaxed mb-6 whitespace-pre-line">
          <h3 className="font-semibold text-[#6E618E] mb-2">프로젝트 설명</h3>
          {project.description}
        </p>

        {/* GitHub 링크 */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#6E618E] hover:underline"
          >
            GitHub 바로가기
          </a>
        )}
      </div>
    </div>
  );
}
