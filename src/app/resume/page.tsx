import Image from "next/image";
import Link from "next/link";
import meImage from "@/assets/images/me.jpg";
import { DownloadButton } from "./components/DownloadButton";
import GitHubIcon from "@/assets/icons/github.svg";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import WebsiteIcon from "@/assets/icons/website.svg";

export default function ResumePage() {
  return (
    <div
      className="min-h-screen overflow-x-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6"
      style={{ minWidth: "1024px" }}
    >
      {/* Download Button - Hidden when printing */}
      <div className="mb-4 flex justify-center">
        <DownloadButton />
      </div>

      <div className="resume-container mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="resume-grid grid grid-cols-[380px_620px]">
          {/* SIDEBAR */}
          <aside className="bg-gray-50 p-8">
            <div className="flex flex-col items-center text-center">
              {/* Profile image */}
              <div className="mb-4 size-30 overflow-hidden rounded-full border-4 border-gray-200">
                <Image
                  src={meImage}
                  alt="Muhammad Ahmed Shehzad"
                  className="size-full object-cover"
                  width={80}
                  height={80}
                  priority
                />
              </div>
            </div>

            <div className="text-md mt-6 text-gray-700">
              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>📋</span> Details
              </h4>
              <div className="mt-3 space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <span>📍</span>
                  <div>
                    <div className="font-medium text-gray-800">Address</div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kärntner+Straße+2,+Wiesbaden,+65187,+Germany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
                    >
                      Kärntner Straße 2<br />
                      Wiesbaden, 65187
                      <br />
                      Germany
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span>📱</span>
                  <div>
                    <div className="font-medium text-gray-800">Phone</div>
                    <a
                      href="tel:+4917623378452"
                      className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
                    >
                      +49 176 233 78 452
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span>📧</span>
                  <div>
                    <div className="font-medium text-gray-800">Email</div>
                    <a
                      href="mailto:ahmedshehzad786@gmail.com"
                      className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
                    >
                      ahmedshehzad786@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span>🎂</span>
                  <div>
                    <div className="font-medium text-gray-800">Date / Place of birth</div>
                    <div className="text-gray-600">20.07.1993 — Lahore</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span>🏳️</span>
                  <div>
                    <div className="font-medium text-gray-800">Residence Permit</div>
                    <div className="text-gray-600">Permanent Residence - Deutschland</div>
                  </div>
                </div>
              </div>

              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>🔗</span> Links
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <WebsiteIcon className="size-8 flex-shrink-0 text-gray-600" />
                  <Link href="/" className="text-md text-blue-500 hover:underline">
                    Portfolio
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <GitHubIcon className="size-8 flex-shrink-0 text-gray-600" />
                  <Link
                    href="https://github.com/Ahmed-Shehzad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md text-blue-500 hover:underline"
                  >
                    GitHub
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <LinkedInIcon className="size-8 flex-shrink-0 text-gray-600" />
                  <Link
                    href="https://www.linkedin.com/in/muhammad-ahmed-shehzad-66750989/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md text-blue-500 hover:underline"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>

              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>🛠️</span> Skills
              </h4>
              <ul className="skills-section text-md mt-3 space-y-2">
                <div className="mb-2">
                  <h5 className="text-md font-bold text-gray-500">Backend (5+ years)</h5>
                </div>
                <SkillItem skill="C#" level={4} years="4+ years" />
                <SkillItem skill=".NET" level={5} years="5+ years" />
                <SkillItem skill="RESTful APIs" level={5} years="5+ years" />
                <SkillItem skill="GraphQL" level={3} years="2+ years" />

                <div className="mt-4 mb-2">
                  <h5 className="text-md font-bold text-gray-500">Frontend (3+ years)</h5>
                </div>
                <SkillItem skill="TypeScript" level={5} years="3+ years" />
                <SkillItem skill="ReactJS" level={3} years="2+ years" />
                <SkillItem skill="Tailwind" level={5} years="2+ years" />

                <div className="mt-4 mb-2">
                  <h5 className="text-md font-bold text-gray-500">Tools & DevOps (3+ years)</h5>
                </div>
                <SkillItem skill="Docker" level={3} years="2+ years" />
                <SkillItem skill="Node.js" level={3} years="2+ years" />
                <SkillItem skill="Python" level={3} years="2+ years" />

                <div className="mt-4 mb-2">
                  <h5 className="text-md font-bold text-gray-500">Databases (4+ years)</h5>
                </div>
                <SkillItem skill="MS SQL Server" level={4} years="4+ years" />
                <SkillItem skill="PostgreSQL" level={3} years="2+ years" />

                <div className="mt-4 mb-2">
                  <h5 className="text-md font-bold text-gray-500">
                    Architecture & Practices (3+ years)
                  </h5>
                </div>
                <SkillItem
                  skill="Command Query Responsibility Segregation"
                  level={4}
                  years="3+ years"
                />
                <SkillItem skill="Domain-Driven Design" level={3} years="2+ years" />
                <SkillItem skill="Test-Driven Development" level={3} years="2+ years" />
                <SkillItem skill="Clean Architecture" level={4} years="3+ years" />
              </ul>

              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>🌐</span> Languages
              </h4>
              <ul className="text-md mt-3 space-y-2">
                <SkillItem skill="English" level={4} />
                <SkillItem skill="German" level={3} />
              </ul>
            </div>
          </aside>

          {/* MAIN */}
          <main className="p-10">
            <header className="mb-6 border-b border-gray-200 pb-4">
              <h1 className="text-3xl font-bold text-gray-900">Muhammad Ahmed Shehzad</h1>
              <p className="text-md mt-1 text-gray-600">Software Engineer</p>
            </header>

            <section className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-green-500">Profile</h3>
              <p className="text-md leading-relaxed text-gray-700">
                I&apos;m a software developer with over 5 years of experience building web
                applications. I enjoy working on both frontend and backend development, and I&apos;m
                passionate about writing clean, maintainable code. I&apos;ve worked with various
                technologies and love learning new ones to solve interesting problems.
              </p>
            </section>

            <section className="employment-section mb-8">
              <h3 className="mb-4 text-lg font-semibold text-green-500">Employment History</h3>

              <div className="text-md space-y-6 text-gray-800">
                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Software Engineer — Verbund Pflegehilfe
                    </h4>
                    <p className="text-xs text-gray-500">Jul 2023 – Present · Mainz</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Develop and maintain a platform that connects people needing care with local
                      healthcare providers
                    </li>
                    <li>
                      Built a CRM system used daily by our consultant team to manage client
                      relationships and track progress
                    </li>
                    <li>
                      Created an automated calling system using Twilio API that helps our team reach
                      clients more efficiently
                    </li>
                  </ul>
                </article>

                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Software Developer — Sustayn GmbH
                    </h4>
                    <p className="text-xs text-gray-500">Feb 2022 – Jul 2023 · Essen</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Built an employee engagement platform focused on learning and development for
                      corporate clients
                    </li>
                    <li>
                      Added gamification features like challenges and knowledge-sharing to make
                      learning more engaging
                    </li>
                    <li>
                      Worked on reward systems that encouraged employees to participate more
                      actively in company programs
                    </li>
                  </ul>
                </article>

                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Software Engineer — FPT Software
                    </h4>
                    <p className="text-xs text-gray-500">Sep 2021 – Nov 2021 · Essen</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Worked on a Lidar Management System for RWE, handling large amounts of wind
                      energy sensor data
                    </li>
                    <li>
                      Built several REST APIs using .NET and C# for data processing and management
                    </li>
                    <li>
                      Developed React frontend applications with focus on performance and user
                      experience
                    </li>
                    <li>
                      Optimized system performance by improving API design and database queries
                    </li>
                  </ul>
                </article>

                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Software Developer — SODEFA GmbH Co. & KG
                    </h4>
                    <p className="text-xs text-gray-500">Aug 2019 – Sep 2021 · Hürth</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Created a heating oil price calculator that customers use to get accurate
                      pricing quotes
                    </li>
                    <li>
                      Built an online ordering system that streamlined the customer purchase process
                    </li>
                    <li>
                      Developed logistics tools to help the company manage their delivery fleet and
                      reduce costs
                    </li>
                  </ul>
                </article>

                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Software Developer — Cybersoft North America Inc.
                    </h4>
                    <p className="text-xs text-gray-500">Apr 2018 – Oct 2018 · Lahore</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Developed Digital Signage applications using .NET and C# for content
                      management and display
                    </li>
                    <li>
                      Implemented real-time communication using SignalR for live content updates
                      across displays
                    </li>
                    <li>
                      Created custom controls in CMS for managing digital signage applications
                      deployed at banks, restaurants, and billboards
                    </li>
                  </ul>
                </article>

                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">Software Engineer — Six Logics</h4>
                    <p className="text-xs text-gray-500">Nov 2016 – Apr 2018 · Lahore</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Worked on live sports score features for 365Scores, a popular sports app
                    </li>
                    <li>
                      Built personalized content feeds showing users their favorite teams and
                      players
                    </li>
                    <li>
                      Created tools for content publishers to integrate our sports data into their
                      platforms
                    </li>
                  </ul>
                </article>
              </div>
            </section>

            <section className="education-section">
              <h3 className="mb-3 text-lg font-semibold text-green-500">Education</h3>
              <div className="text-md">
                <h4 className="font-semibold text-gray-900">University of South Asia</h4>
                <p className="text-gray-700">Bachelor of Science in Computer Science</p>
                <p className="text-xs text-gray-500">Sep 2012 – Sep 2017 · Lahore</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper component for skills with rating dots
interface SkillItemProps {
  skill: string;
  level: number;
  years?: string;
}

function SkillItem({ skill, level, years }: Readonly<SkillItemProps>) {
  const getLevelDescription = (level: number): string => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Novice";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "";
    }
  };

  return (
    <li className="flex items-center justify-between">
      <span>{skill}</span>
      <div className="flex items-center gap-2">
        <span className={`text-md min-w-[4rem] text-right`}>
          {years || getLevelDescription(level)}
        </span>
      </div>
    </li>
  );
}
