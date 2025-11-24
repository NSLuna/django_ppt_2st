import React from "react";

export default function SkillModal({ title, details, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#F6F1EE] p-8 rounded-2xl w-96 shadow-[0_4px_25px_rgba(0,0,0,0.12)] relative border border-[#E3D8D3]">

        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-[#6E618E] transition text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-[#6E618E] mb-5 tracking-tight">
          {title}
        </h2>

        {/* 내용 */}
        <ul className="space-y-3 text-[#5A4D45] text-sm leading-relaxed">
          {details.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
