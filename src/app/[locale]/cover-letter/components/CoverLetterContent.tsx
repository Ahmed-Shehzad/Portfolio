"use client";

import { useCoverLetterContext } from "../contexts/CoverLetterContext";

export function CoverLetterContent() {
  const { data, updateData } = useCoverLetterContext();
  const { specificReason, salaryExpectations, expectedJoiningDate, positionName } = data;

  return (
    <section className="cover-letter-content">
      <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
        <div className="mb-6 print:hidden">
          <label htmlFor="position-name" className="mb-2 block text-sm font-medium text-gray-700">
            Position Name:
          </label>
          <input
            id="position-name"
            type="text"
            value={positionName}
            onChange={(e) => updateData({ positionName: e.target.value })}
            placeholder="Software Engineer"
            className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            aria-describedby="position-name-help"
          />
          <p id="position-name-help" className="mt-1 text-xs text-gray-500">
            This will update the subject line and position references in the PDF. Default is
            &ldquo;Software Engineer&rdquo;.
          </p>
        </div>

        <div className="mb-4">
          <p className="text-md font-medium text-gray-800">
            Subject: Application for {positionName} Position
          </p>
        </div>

        <div className="text-md space-y-4 leading-relaxed text-gray-700">
          <p>Dear Hiring Manager,</p>

          <p>
            I am writing to express my strong interest in the {positionName} position at your
            company. With over 5 years of professional experience in backend development and
            full-stack engineering, I am excited about the opportunity to contribute to your team
            and help drive innovative solutions.
          </p>

          <p>
            Throughout my career, I have specialized in building robust, scalable applications using
            C#, .NET, and modern web technologies. Currently at Verbund Pflegehilfe, I develop and
            maintain a healthcare platform connecting patients with local providers, built a
            comprehensive CRM system, and created an automated calling system using Twilio API.
            Previously at Sustayn GmbH, I built an employee engagement platform with gamification
            features and reward systems that significantly increased user participation in corporate
            learning programs.
          </p>

          <p>
            My experience spans diverse industries and challenging technical projects. At FPT
            Software, I worked on a Lidar Management System for RWE, processing large volumes of
            wind energy sensor data and building high-performance REST APIs. During my time at
            SODEFA GmbH, I created customer-facing tools including a heating oil price calculator
            and logistics management system that streamlined operations and provided realtime
            transparency. Earlier in my career at Cybersoft North America, I developed Digital
            Signage applications with real-time content updates using SignalR, deployed across banks
            and restaurants.
          </p>

          <p>
            My technical skillset encompasses both backend and frontend development, with
            proficiency in TypeScript, React, and modern development practices including Clean
            Architecture, Domain-Driven Design, and CQRS patterns. At Six Logics, I contributed to
            365Scores, a popular sports app, building live score features and personalized content
            feeds. I am particularly passionate about writing maintainable, testable code and
            implementing solutions that scale effectively as businesses grow.
          </p>

          <p>
            What sets me apart is my commitment to continuous learning and proven track record
            across multiple industries. From healthcare platforms and employee engagement systems to
            wind energy data management, digital signage applications, logistics tools, and sports
            data platforms, I have successfully delivered solutions in diverse domains. This breadth
            of experience has given me a unique perspective on software engineering challenges and
            the adaptability to quickly understand new business requirements and deliver effective
            solutions.
          </p>

          <div className="space-y-3">
            <p>
              I am particularly drawn to your company because of{" "}
              {specificReason || "[specific reason will appear here when filled]"}. I believe my
              experience in building user-focused applications, combined with my strong technical
              foundation and collaborative approach, would make me a valuable addition to your team.
            </p>

            <div className="print:hidden">
              <label
                htmlFor="specific-reason"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Specific reason for interest in this company/role:
              </label>
              <textarea
                id="specific-reason"
                value={specificReason}
                onChange={(e) => updateData({ specificReason: e.target.value })}
                placeholder="Enter your specific reason for being interested in this company or role..."
                className="w-full resize-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                rows={3}
                aria-describedby="specific-reason-help"
              />
              <p id="specific-reason-help" className="mt-1 text-xs text-gray-500">
                This will update the PDF in real-time. Leave empty to show placeholder text.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="salary-expectations"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Salary Expectations:
                  </label>
                  <input
                    id="salary-expectations"
                    type="text"
                    value={salaryExpectations}
                    onChange={(e) => updateData({ salaryExpectations: e.target.value })}
                    placeholder="e.g., €60,000 - €70,000 annually"
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    aria-describedby="salary-help"
                  />
                  <p id="salary-help" className="mt-1 text-xs text-gray-500">
                    Optional: Will be included in the closing paragraph if filled.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="expected-joining-date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Expected Joining Date:
                  </label>
                  <input
                    id="expected-joining-date"
                    type="text"
                    value={expectedJoiningDate}
                    onChange={(e) => updateData({ expectedJoiningDate: e.target.value })}
                    placeholder="e.g., immediately, 2 weeks notice, January 2025"
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    aria-describedby="joining-date-help"
                  />
                  <p id="joining-date-help" className="mt-1 text-xs text-gray-500">
                    Optional: Will be included in the closing paragraph if filled.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p>
            I would welcome the opportunity to discuss how my skills and experience align with your
            needs.{" "}
            {salaryExpectations &&
              `Regarding compensation, my salary expectation is ${salaryExpectations} € per annum.`}{" "}
            {expectedJoiningDate && `I am available to start from ${expectedJoiningDate}.`} Thank
            you for considering my application. I look forward to hearing from you.
          </p>

          <p>
            Best regards,
            <br />
            <span className="font-semibold">Muhammad Ahmed Shehzad</span>
          </p>
        </div>
      </div>
    </section>
  );
}
