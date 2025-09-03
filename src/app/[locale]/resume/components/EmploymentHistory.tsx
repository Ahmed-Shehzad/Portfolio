import { useTranslations } from "next-intl";

interface JobExperience {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
}

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
  const t = useTranslations("resume.employment");

  // Convert translation data to JobExperience array
  const employmentData: JobExperience[] = Array.from({ length: 6 }, (_, i) => ({
    title: t(`jobs.${i}.title`),
    company: t(`jobs.${i}.company`),
    period: t(`jobs.${i}.period`),
    location: t(`jobs.${i}.location`),
    responsibilities: Array.from(
      { length: i === 2 || i === 4 ? 4 : 3 }, // Jobs 2 and 4 have 4 responsibilities, others have 3
      (__, j) => t(`jobs.${i}.responsibilities.${j}`)
    ).filter(Boolean),
  }));

  return (
    <section className="employment-section mb-8">
      <h3 className="mb-4 text-lg font-semibold text-green-500">{t("title")}</h3>
      <div className="text-md space-y-4 text-gray-800">
        {employmentData.map((job) => (
          <JobCard key={`${job.company}-${job.period}`} {...job} />
        ))}
      </div>
    </section>
  );
}
