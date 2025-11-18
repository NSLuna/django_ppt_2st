"use client";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-[500px] shadow-xl relative animate-fadeIn">
        
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#ff4f7b] mb-2">
          {project.title}
        </h2>

         {project.thumbnail && (
        <img
        src={`http://127.0.0.1:8000${project.thumbnail}`}
        alt="thumbnail"
        className="rounded-lg mb-4"
        />
        )}

        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">사용 기술</h3>
          <div className="flex gap-2 flex-wrap">
            {project.stack?.split(",").map((tech, i) => (
              <span key={i}
                className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">기능</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {project.features?.split("\n").map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            className="underline text-sm text-blue-600 block mt-5"
          >
            GitHub 링크 보기
          </a>
        )}
      </div>
    </div>
  );
}
