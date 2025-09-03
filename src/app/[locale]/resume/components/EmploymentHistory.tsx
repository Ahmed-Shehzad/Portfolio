interface JobExperience {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
}

const JOB_TITLES = {
  SOFTWARE_ENGINEER: "Software Engineer",
  SOFTWARE_DEVELOPER: "Software Developer",
} as const;

const employmentData: JobExperience[] = [
  {
    title: JOB_TITLES.SOFTWARE_ENGINEER,
    company: "Verbund Pflegehilfe",
    period: "Jul 2023 – Present",
    location: "Mainz",
    responsibilities: [
      "Develop and maintain a platform that connects people needing care with local healthcare providers",
      "Built a CRM system used daily by our consultant team to manage client relationships and track progress",
      "Created an automated calling system using Twilio API that helps our team reach clients more efficiently",
    ],
  },
  {
    title: JOB_TITLES.SOFTWARE_DEVELOPER,
    company: "Sustayn GmbH",
    period: "Feb 2022 – Jul 2023",
    location: "Essen",
    responsibilities: [
      "Built an employee engagement platform focused on learning and development for corporate clients",
      "Added gamification features like challenges and knowledge-sharing to make learning more engaging",
      "Worked on reward systems that encouraged employees to participate more actively in company programs",
    ],
  },
  {
    title: JOB_TITLES.SOFTWARE_ENGINEER,
    company: "FPT Software",
    period: "Sep 2021 – Nov 2021",
    location: "Essen",
    responsibilities: [
      "Worked on a Lidar Management System for RWE, handling large amounts of wind energy sensor data",
      "Built several REST APIs using .NET and C# for data processing and management",
      "Developed React frontend applications with focus on performance and user experience",
      "Optimized system performance by improving API design and database queries",
    ],
  },
  {
    title: JOB_TITLES.SOFTWARE_DEVELOPER,
    company: "SODEFA GmbH Co. & KG",
    period: "Aug 2019 – Sep 2021",
    location: "Hürth",
    responsibilities: [
      "Created a heating oil price calculator that customers use to get accurate pricing quotes",
      "Built an online ordering system that streamlined the customer purchase process",
      "Developed logistics tools to help the company manage their delivery fleet and reduce costs",
    ],
  },
  {
    title: JOB_TITLES.SOFTWARE_DEVELOPER,
    company: "Cybersoft North America Inc.",
    period: "Apr 2018 – Oct 2018",
    location: "Lahore",
    responsibilities: [
      "Developed Digital Signage applications using .NET and C# for content management and display",
      "Implemented real-time communication using SignalR for live content updates across displays",
      "Created custom controls in CMS for managing digital signage applications deployed at banks, restaurants, and billboards",
    ],
  },
  {
    title: JOB_TITLES.SOFTWARE_ENGINEER,
    company: "Six Logics",
    period: "Nov 2016 – Apr 2018",
    location: "Lahore",
    responsibilities: [
      "Worked on live sports score features for 365Scores, a popular sports app",
      "Built personalized content feeds showing users their favorite teams and players",
      "Created tools for content publishers to integrate our sports data into their platforms",
    ],
  },
];

function JobCard({ title, company, period, location, responsibilities }: Readonly<JobExperience>) {
  return (
    <article className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
      <div className="mb-2">
        <h4 className="font-semibold text-gray-900">
          {title} — {company}
        </h4>
        <p className="text-xs text-gray-500">
          {period} · {location}
        </p>
      </div>
      <ul className="ml-4 list-disc space-y-1 text-gray-700">
        {responsibilities.map((responsibility, index) => (
          <li key={`${company}-${index}`}>{responsibility}</li>
        ))}
      </ul>
    </article>
  );
}

export function EmploymentHistory() {
  return (
    <section className="employment-section mb-8">
      <h3 className="mb-4 text-lg font-semibold text-green-500">Employment History</h3>
      <div className="text-md space-y-4 text-gray-800">
        {employmentData.map((job) => (
          <JobCard key={`${job.company}-${job.period}`} {...job} />
        ))}
      </div>
    </section>
  );
}
