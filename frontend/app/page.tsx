"use client";

import { useState, useEffect } from "react";
import ProjectModal from "./components/ProjectModal";
import { getApiUrl, processMediaUrl } from "../utils/api";

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [openProject, setOpenProject] = useState<any>(null);

  useEffect(() => {
    const apiUrl = getApiUrl();
    
    if (!apiUrl) {
      console.error('API URL을 가져올 수 없습니다. NEXT_PUBLIC_API_URL 환경 변수를 설정해주세요.');
      setProjects([]);
      return;
    }
    
    const apiEndpoint = `${apiUrl}/api/projects/`;
    
    console.log("Fetching projects from:", apiEndpoint);
    
    fetch(apiEndpoint)
      .then(async (res) => {
        // 응답이 HTML인지 확인
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error("API returned non-JSON response:", text.substring(0, 200));
          throw new Error(`API returned HTML instead of JSON. Status: ${res.status}`);
        }
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Projects data received:", data);
        // API 응답이 객체 형태일 수 있으므로 처리
        const projectsData = Array.isArray(data) 
          ? data 
          : data.Projects || data.projects || data;
        setProjects(projectsData || []);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        console.error("API URL used:", apiEndpoint);
        setProjects([]); // 에러 시 빈 배열로 설정
      });
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

            <div className="w-40 h-40 bg-[#EDE6F2] rounded-full mx-auto mb-5 flex items-center justify-center" >
              <img
                src="/icons/lunaicon2.svg"
                alt="Luna symbol"
                className="w-24 h-24"
                onError={(e) => {
                  // 경로 문제 시 여러 경로를 시도
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('lunaicon2.svg')) return;
                  
                  const currentSrc = target.src;
                  const baseUrl = currentSrc.split('/icons/')[0];
                  
                  // 여러 경로를 순차적으로 시도
                  if (currentSrc.includes('/icons/')) {
                    target.src = './icons/lunaicon2.svg';
                  } else if (currentSrc.includes('./icons/')) {
                    target.src = '/icons/lunaicon2.svg';
                  } else {
                    target.src = `${baseUrl}/icons/lunaicon2.svg`;
                  }
                  console.error("Failed to load lunaicon2.svg, trying alternative paths");
                }}
              />
              </div>
            <h1 className="text-3xl font-extrabold text-center text-[#5C476E]">
              박지은
            </h1>
            <p className="text-center text-[#5C476E]">
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
            <h2 className="text-xl font-bold text-[#5C476E] mb-4">
              Activities
            </h2>
            <ul className="text-[#4E3E55] space-y-2 text-sm">
              <li>• Django & React 기반 AI 프로젝트 설계부터 직접 만들어보는 단계</li>
              <li>• 머신러닝 / 딥러닝 기반 데이터 분석 모델링 실험과 적용</li>
              <li>• REST API 구조 이해와 배포 환경 구성 경험</li>
              <li>• UI 구성과 사용자 흐름을 고려한 프론트엔드 구현</li>
            </ul>
          </div>

          {/* SKILLS */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-xl font-bold text-[#5C476E] mb-6">
              Skills
            </h2>

            <div className="grid grid-cols-2 gap-6 text-sm text-[#4E3E55]">

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#5C476E] mb-2">
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
                <h3 className="font-semibold text-[#5C476E] mb-2">
                  Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">Spring Boot</span>
                  <span className="skill-badge">Django REST</span>
                  <span className="skill-badge">JWT</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#5C476E] mb-2">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">React</span>
                  <span className="skill-badge">Next.js</span>
                  <span className="skill-badge">Component Design</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4">
                <h3 className="font-semibold text-[#5C476E] mb-2">
                  Database
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="skill-badge">MySQL</span>
                  <span className="skill-badge">Schema</span>
                  <span className="skill-badge">ORM</span>
                </div>
              </div>

              <div className="bg-[#FAF6FD] rounded-xl p-4 col-span-2">
                <h3 className="font-semibold text-[#5C476E] mb-2">
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
            <h2 className="text-xl font-bold text-[#5C476E] mb-6">
              Projects
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setOpenProject(p)}
                  className="cursor-pointer  backdrop-blur-sm bg-[#EEE6F5]/60 rounded-xl p-4 shadow-md
                  hover:shadow-lg hover:-translate-y-1 transition hover:bg-[#E9DFF7] "
                >
                  {(p.thumbnail_url || p.thumbnail) && (
                    <img
                      src={processMediaUrl(p.thumbnail_url || p.thumbnail)}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        console.error("Failed to load thumbnail:", (e.target as HTMLImageElement).src);
                      }}
                    />
                  )}
                  <h3 className="text-[#7C5FA6] font-bold">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#4E3E55] line-clamp-2 mt-1">
                    {p.description}
                  </p>

                  {p.tech_stack != null && (
                    <div className="flex flex-wrap gap-1 mt-2 text-xs text-[#7C5FA6] opacity-70">
                      {Array.isArray(p.tech_stack)
                        ? p.tech_stack.map((tech:string , idx:number) => (
                          <span
                            key={idx}
                            className="bg-white/60 px-2 py-[1px] rounded-full"
                          >
                            {tech}
                          </span>
                        ))
                        : typeof p.tech_stack === "string"
                          ? p.tech_stack.split(",").map((tech:string, idx:number) => (
                            <span
                              key={idx}
                              className="bg-white/60 px-2 py-[1px] rounded-full"
                            >
                              {tech.trim()}
                            </span>
                          ))
                          : (
                            <span className="bg-white/40 px-2 py-[1px] rounded-full">
                              {String(p.tech_stack)}
                            </span>
                          )
                      }
                    </div>
                  )}

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
