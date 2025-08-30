import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import meImage from "@/assets/images/me.jpg";
import { PrintButton } from "./components/PrintButton";

export const metadata: Metadata = {
  viewport: "width=1024, initial-scale=0.5, user-scalable=yes",
};

export default function ResumePage() {
  return (
    <div
      className="min-h-screen overflow-x-auto bg-gradient-to-b from-slate-900 to-slate-950 p-6"
      style={{ minWidth: "1024px" }}
    >
      {/* Print Button - Hidden when printing */}
      <div className="mb-4 flex justify-center print:hidden">
        <PrintButton />
      </div>

      <div className="mx-auto w-[1000px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="grid grid-cols-[380px_620px]">
          {/* SIDEBAR */}
          <aside className="bg-gray-50 p-8">
            <div className="flex flex-col items-center text-center">
              {/* Profile image */}
              <div className="mb-4 size-20 overflow-hidden rounded-full border-4 border-gray-200">
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

            <div className="mt-6 text-sm text-gray-700">
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
                    <div className="font-medium text-gray-800">Nationality</div>
                    <div className="text-gray-600">Pakistan</div>
                  </div>
                </div>
              </div>

              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>🔗</span> Links
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <Link href="/" className="text-sm text-blue-500 hover:underline">
                    Portfolio
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔗</span>
                  <Link
                    href="https://github.com/Ahmed-Shehzad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    GitHub
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <Link
                    href="https://www.linkedin.com/in/muhammad-ahmed-shehzad-a2697b150/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>

              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>🛠️</span> Skills
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <div className="mb-2">
                  <h5 className="text-xs font-medium text-green-600">Backend (5+ years)</h5>
                </div>
                <SkillItem skill="C#" level={4} years="4+ years" color="green" />
                <SkillItem skill=".NET" level={5} years="5+ years" color="green" />
                <SkillItem skill="RESTful APIs" level={5} years="5+ years" color="green" />
                <SkillItem skill="GraphQL" level={3} years="2+ years" color="green" />

                <div className="mt-4 mb-2">
                  <h5 className="text-xs font-medium text-blue-600">Frontend (3+ years)</h5>
                </div>
                <SkillItem skill="TypeScript" level={5} years="3+ years" color="blue" />
                <SkillItem skill="ReactJS" level={3} years="2+ years" color="blue" />
                <SkillItem skill="Tailwind" level={5} years="2+ years" color="blue" />

                <div className="mt-4 mb-2">
                  <h5 className="text-xs font-medium text-orange-600">Tools & DevOps (3+ years)</h5>
                </div>
                <SkillItem skill="Docker" level={3} years="2+ years" color="orange" />
                <SkillItem skill="Node.js" level={3} years="2+ years" color="orange" />
                <SkillItem skill="Python" level={3} years="2+ years" color="orange" />
                <SkillItem skill="YAML" level={4} years="3+ years" color="orange" />

                <div className="mt-4 mb-2">
                  <h5 className="text-xs font-medium text-purple-600">Databases (4+ years)</h5>
                </div>
                <SkillItem skill="MS SQL Server" level={4} years="4+ years" color="purple" />
                <SkillItem skill="PostgreSQL" level={3} years="2+ years" color="purple" />

                <div className="mt-4 mb-2">
                  <h5 className="text-xs font-medium text-red-600">
                    Architecture & Practices (3+ years)
                  </h5>
                </div>
                <SkillItem
                  skill="Command Query Responsibility Segregation"
                  level={4}
                  years="3+ years"
                  color="red"
                />
                <SkillItem skill="Domain-Driven Design" level={3} years="2+ years" color="red" />
                <SkillItem skill="Test-Driven Development" level={3} years="2+ years" color="red" />
                <SkillItem skill="Clean Architecture" level={4} years="3+ years" color="red" />
              </ul>

              <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
                <span>🌐</span> Languages
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <SkillItem skill="English" level={4} />
                <SkillItem skill="German" level={3} />
                <SkillItem skill="Urdu" level={5} />
              </ul>
            </div>
          </aside>

          {/* MAIN */}
          <main className="p-10">
            <header className="mb-6 border-b border-gray-200 pb-4">
              <h1 className="text-3xl font-bold text-gray-900">Muhammad Ahmed Shehzad</h1>
              <p className="mt-1 text-sm text-gray-600">Software Engineer</p>
            </header>

            <section className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-green-500">Profile</h3>
              <p className="text-sm leading-relaxed text-gray-700">
                I&apos;m a Full Stack Developer specializing in building scalable,
                performance-driven applications with modern web technologies. My expertise spans
                front-end and back-end, with a strong focus on clean architecture, maintainability,
                and delivering measurable business impact.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-green-500">Employment History</h3>

              <div className="space-y-6 text-sm text-gray-800">
                <article>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Software Engineer — Verbund Pflegehilfe
                    </h4>
                    <p className="text-xs text-gray-500">Jul 2023 – Present · Mainz</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-1 text-gray-700">
                    <li>
                      Implemented 15+ features for matching 5,000+ users with local care providers,
                      achieving 85% match accuracy
                    </li>
                    <li>
                      Developed CRM system serving 50+ consultants with real-time data processing
                      capabilities
                    </li>
                    <li>
                      Designed automated calling process using Twilio, increasing client
                      reachability by 60% and reducing response time to 2 hours
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
                      Engineered employee engagement platform serving 2,000+ users across 50+
                      companies
                    </li>
                    <li>
                      Implemented gamified features increasing user engagement by 75% through
                      microlearning and knowledge sharing
                    </li>
                    <li>
                      Integrated challenges and rewards system, driving 40% increase in user
                      participation rates
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
                      Delivered Lidar Management System for RWE (Renewable Wind Energy), processing
                      10,000+ data points daily
                    </li>
                    <li>Developed 8 API solutions using .NET and C#, achieving 99.9% uptime</li>
                    <li>
                      Built 3 React-based frontend applications with 95+ Google Lighthouse
                      performance scores
                    </li>
                    <li>
                      Reduced system response time by 45% through efficient API design and
                      optimization
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
                      Developed heating oil price calculator processing 1,000+ daily calculations
                      with 99% accuracy
                    </li>
                    <li>
                      Implemented online ordering system handling 500+ monthly orders with 98%
                      success rate
                    </li>
                    <li>
                      Delivered logistics and fleet management solutions reducing operational costs
                      by 25%
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
                      Developed features for live scores and real-time sports updates for client:
                      365Scores.
                    </li>
                    <li>Implemented personalised feeds for teams, leagues and players.</li>
                    <li>Developed publisher tools for integration and monetisation.</li>
                  </ul>
                </article>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-green-500">Education</h3>
              <div className="text-sm">
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
  color?: string;
}

function SkillItem({ skill, level, years, color = "green" }: Readonly<SkillItemProps>) {
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "orange":
        return "text-orange-600";
      case "purple":
        return "text-purple-600";
      case "red":
        return "text-red-600";
      case "green":
      default:
        return "text-green-600";
    }
  };

  return (
    <li className="flex items-center justify-between">
      <span>{skill}</span>
      <div className="flex items-center gap-2">
        <span className={`min-w-[4rem] text-right text-xs ${getColorClasses(color)}`}>
          {years || getLevelDescription(level)}
        </span>
      </div>
    </li>
  );
}
