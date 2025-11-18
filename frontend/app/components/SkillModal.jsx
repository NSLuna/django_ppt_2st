import React from "react";

export default function SkillModal({title, details, onClose}) {
    return(
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl w-96 shadow-xl relative">
                {/*닫기버튼*/}
                <button className = "absolute top-3 right-3 text-gray-500" onClick={onClose}>
                    X
                </button>

                <h2 className="text-2xl font-semibold text-[#ff4f7b] mb-4">{title}</h2>

                <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                    {details.map((item, idx)=> (<li key={idx}>•</li>))}
                </ul>
            </div>
        </div>
    )

}