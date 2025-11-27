import Donut from "./Donut";

export default function Sidebar() {
  const skillSummary = [
    { label: "Python", value: 85 },
    { label: "Django", value: 75 },
    { label: "React", value: 68 },
    { label: "Next.js", value: 62 },
    { label: "AI", value: 80 },
    { label: "MySQL", value: 70 },
  ];

  return (
    <aside className="w-[280px] bg-[#E9E7FF] p-6 flex flex-col">

      {/* 프로필 */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-[#5146A6]">루나</h2>
        <p className="text-sm text-[#6E63C5]">AI 풀스택 개발자</p>
      </div>

      {/* 소개 */}
      <p className="text-xs text-[#3A3A3A] text-center mb-6">
        AI와 웹을 연결하는 개발자<br />
        구조와 정리를 사랑합니다.
      </p>

      {/* 연락 */}
      <div className="text-xs mb-6">
        <p className="font-semibold text-[#5146A6]">Email</p>
        <p className="mb-2">nsluna@naver.com</p>

        <p className="font-semibold text-[#5146A6]">GitHub</p>
        <p>github.com/NSLuna</p>
      </div>

      {/* SKILL DONUT */}
      <div className="mt-auto">
        <p className="text-xs font-bold text-[#5146A6] mb-3 text-center">SKILLS</p>
        <div className="grid grid-cols-2 gap-4">
          {skillSummary.map((s) => (
            <Donut key={s.label} {...s} />
          ))}
        </div>
      </div>
    </aside>
  );
}
