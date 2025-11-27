export default function Tabs() {
  const tabs = ["ABOUT", "SKILLS", "PROJECTS", "IDENTITY"];

  return (
    <div className="flex gap-4">
      {tabs.map((tab, i) => (
        <div
          key={i}
          className="px-4 py-2 text-sm font-semibold rounded-full
                     bg-[#8B7CFF] text-white cursor-pointer
                     hover:opacity-90 transition"
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
