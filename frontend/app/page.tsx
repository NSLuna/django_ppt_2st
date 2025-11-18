"use client";

import { useState } from "react";
import SkillModal from "./components/SkillModal";

export default function Home() {
  const [openSkill, setOpenSkill] = useState(null);

  // 스킬 상세 설명 (모달 내용)
  const skillDetails = {
    Python: [
      "Pandas / NumPy 기반 데이터 처리 가능",
      "AI 모델 학습용 데이터셋 전처리 구현 가능",
      "Django + AI 기능과 연동한 백엔드 개발 경험",
    ],
    Django: [
      "REST API 설계 및 구현",
      "ORM 기반 DB 모델링 가능",
      "JWT 인증 로그인 구현 경험 (회원가입/로그인)",
    ],
    React: [
      "컴포넌트 기반 UI 구조 설계 가능",
      "Axios API 연동",
      "React Router / 상태관리 훨씬 익숙함",
    ],
    "Next.js": [
      "SSR / SSG 개념 이해하고 프로젝트 적용 가능",
      "App Router 기반 폴더 구조 구성",
      "API Route & 서버액션 활용 가능",
    ],
    TensorFlow: [
      "LSTM / GRU / CNN 딥러닝 모델 실습 완료",
      "모델 저장 및 불러오기, 평가 가능",
      "IMDB / Fashion MNIST 등 실습 경험",
    ],
    MySQL: [
      "DB 스키마 설계 및 정규화",
      "ORM 기반 CRUD 구현",
      "JOIN / Index 성능 최적화 이해",
    ],
  };

  const skillList = Object.keys(skillDetails);

  return (
    <main className="flex min-h-screen">

      {/* 왼쪽 about */}
      <section className="w-1/3 bg-[#111] text-white p-10 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">루나</h1>
          <p className="text-xl text-gray-300 mb-6">AI 풀스택 개발자</p>

          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            안녕하세요! 포트폴리오 페이지 제작 중입니다 <br />
            노가다가 끝이질 않스므니다
          </p>

          <div className="text-sm text-gray-400 space-y-1">
            <p> 대충@이메일.com</p>
            <p> 010-1234-5678</p>
            <p className="mt-3 underline cursor-pointer">GitHub 바로가기</p>
          </div>
        </div>
      </section>

      {/* 오른쪽 콘텐츠 */}
      <section className="w-2/3 bg-white text-black p-14">
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
        <p className="text-gray-600">대충 프로젝트 모달 영역 들어갈 곳</p>

        {/* 모달 */}
        {openSkill && (
          <SkillModal
            title={openSkill}
            details={skillDetails[openSkill]}
            onClose={() => setOpenSkill(null)}
          />
        )}
      </section>

    </main>
  );
}
