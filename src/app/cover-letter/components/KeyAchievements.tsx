const achievementsData: string[] = [
  "Built healthcare platform connecting patients with local providers at Verbund Pflegehilfe",
  "Developed CRM system used daily by consultant teams",
  "Created automated calling system using Twilio API",
  "Built employee engagement platform with gamification features",
  "Developed Lidar Management System for RWE energy sector",
  "Created digital signage applications for banks and restaurants",
];

interface AchievementCardProps {
  achievement: string;
}

function AchievementCard({ achievement }: Readonly<AchievementCardProps>) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
      <div className="text-gray-700">{achievement}</div>
    </div>
  );
}

export function KeyAchievements() {
  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>🌟</span> Key Achievements
      </h4>
      <div className="mt-3 space-y-2 text-xs">
        {achievementsData.map((achievement) => (
          <AchievementCard key={achievement.slice(0, 20)} achievement={achievement} />
        ))}
      </div>
    </>
  );
}
