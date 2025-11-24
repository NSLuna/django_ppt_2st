"use client";

import { useState, useEffect } from "react";
import SkillModal from "./components/SkillModal";
import ProjectModal from "./components/ProjectModal";

export default function Home() {
  const [openSkill, setOpenSkill] = useState(null);
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const skillDetails = {
    Python: [
      "Pandas / NumPy 기반 데이터 처리 가능",
      "AI 모델 학습용 데이터셋 전처리 구현 가능",
      "Django + AI 기능과 연동한 백엔드 개발 경험",
    ],
    Django: [
      "REST API 설계 및 구현",
      "ORM 기반 DB 모델링 가능",
      "JWT 인증 로그인 구현 경험",
    ],
    React: ["컴포넌트 기반 UI 구조", "Axios API 연동", "상태관리 익숙함"],
    "Next.js": [
      "SSR / SSG 개념 이해",
      "App Router 구조 설계",
      "API Route 활용 가능",
    ],
    TensorFlow: [
      "LSTM / GRU / CNN 실습 경험",
      "모델 저장 및 로드 가능",
      "IMDB / MNIST 등 실습 완료",
    ],
    MySQL: [
      "DB 스키마 설계",
      "ORM 기반 CRUD 구현",
      "JOIN / Index 최적화 이해",
    ],
  };

  const skillList = Object.keys(skillDetails);

  return (
    <main className="flex min-h-screen w-full bg-[#F4ECE7] font-pretendard">

      {/* 왼쪽 사이드 */}
      <aside className="w-1/4 bg-[#EADDE8] p-12 flex flex-col justify-center border-r border-[#E3D7DE]">
        <h1 className="text-4xl font-extrabold text-[#6E618E] mb-4">루나</h1>
        <p className="text-lg text-[#6E618E] mb-10">AI 풀스택 개발자</p>

        <div className="space-y-4 text-[#6E618E] text-sm leading-relaxed">
          <p>
            안녕하세요!  
            <br /> 포트폴리오를 제작 중입니다.  
            <br /> 아직도 노가다가 끝나지 않아요 😭
          </p>

          <div className="pt-4">
            <p className="font-bold mb-1">Email</p>
            <a
              href="mailto:nsluna@naver.com"
              className="text-[#4A3F35] hover:text-[#6E618E] transition"
            >
              nsluna@naver.com
            </a>
          </div>

          <div className="pt-2">
            <p className="font-bold mb-1">GitHub</p>
            <a
              href="https://github.com/NSLuna"
              className="text-[#4A3F35] hover:text-[#6E618E] transition"
            >
              github.com/NSLuna
            </a>
          </div>
        </div>
      </aside>

      {/* 오른쪽 메인 */}
      <section className="w-3/4 p-16 space-y-16 overflow-y-auto">

        {/* Activities */}
        <div>
          <div className="border-l-4 border-[#D0C2D9] pl-3 mb-4">
            <h2 className="text-2xl font-semibold text-[#6E618E]">Activities</h2>
          </div>
          <ul className="space-y-2 text-[#4A3F35]">
            <li>• Django & React 기반 AI 프로젝트 구현</li>
            <li>• 빅데이터 분석 모델링</li>
            <li>• 백엔드 API 설계 및 배포</li>
          </ul>
        </div>

        {/* Skills */}
        <div>
          <div className="border-l-4 border-[#D0C2D9] pl-3 mb-4">
            <h2 className="text-2xl font-semibold text-[#6E618E]">Skills</h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            {skillList.map((skill) => (
              <button
                key={skill}
                onClick={() => setOpenSkill(skill)}
                className="px-4 py-2 rounded-full text-[#6E618E] bg-white shadow-sm 
                hover:bg-[#E9E0D8] transition"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="border-l-4 border-[#D0C2D9] pl-3 mb-4">
            <h2 className="text-2xl font-semibold text-[#6E618E]">Projects</h2>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => setOpenProject(p)}
                className="cursor-pointer bg-white border border-[#E2D9D2] rounded-xl p-5 
                hover:shadow-[0_4px_20px_rgba(110,97,142,0.2)] hover:-translate-y-1 transition-all"
              >
                {p.thumbnail && (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-44 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-bold text-[#6E618E]">{p.title}</h3>
                <p className="text-sm text-[#4A3F35] mt-2 line-clamp-2">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MODALS */}
        {openSkill && (
          <SkillModal
            title={openSkill}
            details={skillDetails[openSkill]}
            onClose={() => setOpenSkill(null)}
          />
        )}

        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </section>
    </main>
  );
}
