"use client";

import { useState, useEffect } from "react";
import SkillModal from "./components/SkillModal";
import ProjectModal from "./components/ProjectModal";

export default function Home() {
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [openProject, setOpenProject] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const skillDetails: Record<string, string[]> = {
    Python: [
      "Pandas / NumPy 기반 데이터 처리 가능",
      "AI 모델 학습용 데이터셋 전처리 구현 가능",
      "Django + AI 백엔드 개발 경험",
    ],
    Django: ["REST API 설계", "ORM 기반 DB 모델링", "JWT 인증 구현 경험"],
    React: ["컴포넌트 기반 UI 설계", "Axios API 연동", "상태관리 기본기 보유"],
    "Next.js": ["SSR / SSG 이해", "App Router 구조 설계", "API Route 구성 가능"],
    TensorFlow: ["LSTM / GRU 실습 경험", "모델 저장 및 로드 가능", "MNIST / IMDB 실습"],
    MySQL: ["스키마 설계", "ORM 기반 CRUD", "인덱스 최적화 이해"],
  };

  const skillList = Object.keys(skillDetails);

  return (
    <main className="flex min-h-screen w-full bg-[#F5EFEA] font-pretendard">

      {/* 왼쪽 사이드 */}
      <aside className="w-1/4 bg-[#DCCEE3] p-12 border-r border-[#CBB9D4] flex flex-col justify-start pt-20">
        <h1 className="text-4xl font-extrabold text-[#7C5FA6] mb-3">루나</h1>
        <p className="text-lg text-[#7C5FA6] mb-12">AI 풀스택 개발자</p>

        <p className="text-sm text-[#5C4B63] leading-relaxed mb-14">
          안녕하세요!  
          <br /> 포트폴리오를 제작 중입니다.  
          <br /> 아직도 노가다가 끝나지 않아요 😭
        </p>

        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold text-[#7C5FA6] mb-1">Email</p>
            <a
              href="mailto:nsluna@naver.com"
              className="text-[#4E3E55] hover:text-[#7C5FA6] transition"
            >
              nsluna@naver.com
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#7C5FA6] mb-1">GitHub</p>
            <a
              href="https://github.com/NSLuna"
              className="text-[#4E3E55] hover:text-[#7C5FA6] transition"
            >
              github.com/NSLuna
            </a>
          </div>
        </div>
      </aside>

      {/* 오른쪽 메인 */}
      <section className="w-3/4 p-20 space-y-20">

        {/* Activities */}
        <div>
          <h2 className="text-2xl font-semibold text-[#7C5FA6] mb-2">Activities</h2>
          <div className="w-full h-[1px] bg-[#D7C9E2] mb-6" />

          <ul className="text-[#4E3E55] space-y-2">
            <li>• Django & React 기반 AI 프로젝트 구현</li>
            <li>• 빅데이터 분석 모델링</li>
            <li>• 백엔드 API 설계 및 배포</li>
          </ul>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl font-semibold text-[#7C5FA6] mb-2">Skills</h2>
          <div className="w-full h-[1px] bg-[#D7C9E2] mb-6" />

          <div className="flex gap-3 flex-wrap">
            {skillList.map((skill) => (
              <button
                key={skill}
                onClick={() => setOpenSkill(skill)}
                className="px-4 py-2 rounded-full bg-white text-[#7C5FA6] 
                border border-[#E4D6E8] hover:bg-[#EFE6F3] transition shadow-sm"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-semibold text-[#7C5FA6] mb-2">Projects</h2>
          <div className="w-full h-[1px] bg-[#D7C9E2] mb-6" />

          <div className="grid grid-cols-2 gap-12">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => setOpenProject(p)}
                className="cursor-pointer bg-[#F7F1EC] border border-[#E4DAD2] rounded-xl p-6
                hover:shadow-[0_4px_18px_rgba(124,95,166,0.25)] hover:-translate-y-1 transition"
              >
                {p.thumbnail && (
                  <img
                    src={p.thumbnail}
                    className="w-full h-48 object-cover rounded-lg mb-5"
                  />
                )}
                <h3 className="text-[#7C5FA6] text-lg font-bold">{p.title}</h3>
                <p className="text-sm text-[#4E3E55] mt-2 line-clamp-2">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        {openSkill && (
          <SkillModal
            title={openSkill}
            details={skillDetails[openSkill]}
            onClose={() => setOpenSkill(null)}
          />
        )}

        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}
      </section>
    </main>
  );
}
