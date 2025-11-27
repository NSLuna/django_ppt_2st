"use client";

import { useState, useEffect } from "react";
import ProjectModal from "./components/ProjectModal";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [openProject, setOpenProject] = useState<any>(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const skills = [
    { name: "Python", value: 75, icon: "/icons/python.svg" },
    { name: "Java", value: 60, icon: "/icons/java.svg" },
    { name: "JavaScript", value: 62, icon: "/icons/javascript.svg" },
    { name: "SQL", value: 60, icon: "/icons/sql.svg" },
    { name: "AWS", value: 70, icon: "/icons/aws.svg" },
    { name: "Git", value: 72, icon: "/icons/git.svg" },
  ];

  return (
    <main className="min-h-screen bg-[#F5EFEA] font-pretendard flex justify-center">
      <div className="w-[1200px] flex gap-10 py-12">

        {/* PROFILE */}
        <aside className="w-[340px] bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6">
          {/* Top */}
          <div>
            <div className="w-40 h-40 bg-[#EDE6F2] rounded-full mx-auto mb-5" />

            <h1 className="text-3xl font-extrabold text-center text-[#7C5FA6]">
              박지은
            </h1>
            <p className="text-center text-[#7C5FA6]">
              AI 풀스택 개발자
            </p>
          </div>

          {/* CONTACT */}
          <div className="space-y-3 text-sm mt-2">

            {/* Birth */}
            <div className="flex items-center gap-2">
              <img src="/icons/calendar.svg" alt="Birthday" className="w-4 h-4" />
              <span className="text-[#4E3E55]">1994.08.15</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <img src="/icons/map-pin.svg" alt="Location" className="w-4 h-4" />
              <span className="text-[#4E3E55]">Bupyeong, Incheon</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <img src="/icons/mail.svg" alt="Email" className="w-4 h-4" />
              <a
                href="mailto:nsluna@naver.com"
                className="text-[#4E3E55] hover:text-[#7C5FA6] transition"
              >
                nsluna@naver.com
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-2">
              <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4" />
              <a
                href="https://github.com/NSLuna"
                target="_blank"
                className="text-[#4E3E55] hover:text-[#7C5FA6] transition"
              >
                github.com/NSLuna
              </a>
            </div>

          </div>


          {/* SKILL RINGS */}
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {skills.map((skill) => {
              const radius = 30;
              const circumference = 2 * Math.PI * radius;
              const offset =
                circumference - (skill.value / 100) * circumference;

              return (
                <div
                  key={skill.name}
                  className="flex flex-col items-center relative"
                >
                  <svg width="80" height="80" className="rotate-[-90deg]">
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke="#EEE6F0"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke="#7C5FA6"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* ICON */}
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-7 h-7 absolute top-[24px]"
                  />

                  <span className="text-xs font-semibold text-[#7C5FA6] mt-1">
                    {skill.value}%
                  </span>
                  <span className="text-xs text-[#5C4B63]">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CONTENT */}
        <section className="flex-1 space-y-8">

          {/* ACTIVITIES */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-xl font-bold text-[#7C5FA6] mb-4">
              Activities
            </h2>
            <ul className="text-[#4E3E55] space-y-2 text-sm">
              <li>• Django & React 기반 AI 프로젝트 구현</li>
              <li>• 빅데이터 분석 모델링</li>
              <li>• 백엔드 API 설계 및 배포</li>
            </ul>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-xl font-bold text-[#7C5FA6] mb-6">
              Skills
            </h2>

            <div className="grid grid-cols-2 gap-6 text-sm text-[#4E3E55]">

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#7C5FA6] mb-2">
                  AI / ML
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">Pandas</span>
                  <span className="skill-badge">NumPy</span>
                  <span className="skill-badge">TensorFlow</span>
                  <span className="skill-badge">Keras</span>
                  <span className="skill-badge">KNN</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#7C5FA6] mb-2">
                  Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">Spring Boot</span>
                  <span className="skill-badge">Django REST</span>
                  <span className="skill-badge">JWT</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#7C5FA6] mb-2">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">React</span>
                  <span className="skill-badge">Next.js</span>
                  <span className="skill-badge">Component Design</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#7C5FA6] mb-2">
                  Database
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">MySQL</span>
                  <span className="skill-badge">Schema</span>
                  <span className="skill-badge">ORM</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4 col-span-2">
                <h3 className="font-semibold text-[#7C5FA6] mb-2">
                  Infra / Deploy
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">AWS Lightsail</span>
                  <span className="skill-badge">Nginx</span>
                  <span className="skill-badge">Gunicorn</span>
                  <span className="skill-badge">HTTPS</span>
                </div>
              </div>

            </div>
          </div>

          {/* PROJECTS */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-xl font-bold text-[#7C5FA6] mb-6">
              Projects
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setOpenProject(p)}
                  className="cursor-pointer bg-[#F7F1EC] rounded-xl p-4
                  hover:shadow-lg hover:-translate-y-1 transition"
                >
                  {p.thumbnail && (
                    <img
                      src={p.thumbnail}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h3 className="text-[#7C5FA6] font-bold">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#4E3E55] line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* MODAL */}
        {openProject && (
          <ProjectModal
            project={openProject}
            onClose={() => setOpenProject(null)}
          />
        )}

      </div>
    </main>
  );
}
