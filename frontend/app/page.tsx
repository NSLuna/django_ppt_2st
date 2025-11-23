"use client";

import { useState, useEffect } from "react";
import SkillModal from "./components/SkillModal";
import ProjectModal from "./components/ProjectModal";

export default function Home() {
  const [openSkill, setOpenSkill] = useState(null);
  const [projects, setProjects] = useState([]); // Django 프로젝트 데이터
  const [openProject, setOpenProject] = useState(null);

  // Django API에서 프로젝트 가져오기
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  // 스킬 상세 설명
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
    <main className="flex min-h-screen w-full">

      {/* 왼쪽 사이드 */}
      <section className="w-1/5 bg-[#DDE6F5] text-[#1A1A1A] p-10 flex flex-col items-center justify-center">
        <div className="text-center">

          <h1 className="text-4xl font-extrabold mb-2">루나</h1>
          <p className="text-xl text-gray-700 mb-6">AI 풀스택 개발자</p>

          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            안녕하세요! 포트폴리오 페이지 제작 중입니다 <br />
            노가다가 끝이질 않스므니다 😭
          </p>

          {/* 이메일 */}
          <a
            href="mailto:nsluna@naver.com"
            className="inline-flex items-center gap-2 hover:text-[#2a4d8f] transition text-[#555]"
          >
            <img src="/mail.svg" className="w-5 h-5" />
            nsluna@naver.com
          </a>

          {/* 깃허브 */}
          <a
            href="https://github.com/NSLuna"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-5 text-[#555] hover:text-[#2a4d8f]"
          >
            <img
              src="/github.svg"
              className="w-6 h-6"
              style={{ filter: "grayscale(30%) brightness(90%)" }}
            />
            <span>GitHub 바로가기</span>
          </a>

        </div>
      </section>

      {/* 오른쪽 메인 */}
      <section className="w-4/5 bg-white text-black p-14">

        {/* Activities */}
        <h2 className="text-xl font-semibold mb-6">Activities</h2>
        <ul className="space-y-3 text-gray-700">
          <li>• Django & React 기반 AI 프로젝트 구현</li>
          <li>• 빅데이터 분석 모델링</li>
          <li>• 백엔드 API 설계 및 배포</li>
        </ul>

        {/* Skills */}
        <h2 className="text-xl font-semibold mt-10 mb-6">Skills</h2>
        <div className="flex gap-4 flex-wrap text-sm">
          {skillList.map((skill) => (
            <button
              key={skill}
              onClick={() => setOpenSkill(skill)}
              className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Projects */}
        <h2 className="text-xl font-semibold mt-10 mb-6">Projects</h2>
        <div className="grid grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setOpenProject(p)}
              className="cursor-pointer bg-white rounded-xl shadow-md 
                hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] 
                transition-all duration-300 p-4"
            >
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="text-lg font-bold text-gray-800">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* 스킬 모달 */}
        {openSkill && (
          <SkillModal
            title={openSkill}
            details={skillDetails[openSkill]}
            onClose={() => setOpenSkill(null)}
          />
        )}

        {/* 프로젝트 모달 */}
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
