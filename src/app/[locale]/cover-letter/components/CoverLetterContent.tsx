"use client";

import { useCoverLetterContext } from "../contexts/CoverLetterContext";
import { useTranslations } from "next-intl";

export function CoverLetterContent() {
  const { data, updateData } = useCoverLetterContext();
  const { specificReason, salaryExpectations, expectedJoiningDate, positionName } = data;
  const t = useTranslations("coverLetter");

  return (
    <section className="cover-letter-content">
      <div className="rounded-lg bg-white p-3 shadow-sm print:rounded-none print:bg-transparent print:p-1 print:shadow-none">
        <div className="mb-6 print:hidden">
          <label htmlFor="position-name" className="mb-2 block text-sm font-medium text-gray-700">
            {t("forms.positionName")}
          </label>
          <input
            id="position-name"
            type="text"
            value={positionName}
            onChange={(e) => updateData({ positionName: e.target.value })}
            placeholder={t("forms.positionNamePlaceholder")}
            className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            aria-describedby="position-name-help"
          />
          <p id="position-name-help" className="mt-1 text-xs text-gray-500">
            {t("forms.positionNameHelp")}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-md font-medium text-gray-800">{t("subject", { positionName })}</p>
        </div>

        <div className="text-md space-y-4 leading-relaxed text-gray-700">
          <p>{t("greeting")}</p>

          <p>{t("content.opening", { positionName })}</p>

          <p>{t("content.experience1")}</p>

          <p>{t("content.experience2")}</p>

          <p>{t("content.technical")}</p>

          <p>{t("content.unique")}</p>

          <div className="space-y-3">
            <p>
              {t("content.interest")} {specificReason || t("content.interestPlaceholder")}
              {t("content.value")}
            </p>

            <div className="print:hidden">
              <label
                htmlFor="specific-reason"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {t("forms.specificReason")}
              </label>
              <textarea
                id="specific-reason"
                value={specificReason}
                onChange={(e) => updateData({ specificReason: e.target.value })}
                placeholder={t("forms.specificReasonPlaceholder")}
                className="w-full resize-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                rows={3}
                aria-describedby="specific-reason-help"
              />
              <p id="specific-reason-help" className="mt-1 text-xs text-gray-500">
                {t("forms.specificReasonHelp")}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="salary-expectations"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("forms.salaryExpectations")}
                  </label>
                  <input
                    id="salary-expectations"
                    type="text"
                    value={salaryExpectations}
                    onChange={(e) => updateData({ salaryExpectations: e.target.value })}
                    placeholder={t("forms.salaryExpectationsPlaceholder")}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    aria-describedby="salary-help"
                  />
                  <p id="salary-help" className="mt-1 text-xs text-gray-500">
                    {t("forms.salaryHelp")}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="expected-joining-date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {t("forms.expectedJoiningDate")}
                  </label>
                  <input
                    id="expected-joining-date"
                    type="text"
                    value={expectedJoiningDate}
                    onChange={(e) => updateData({ expectedJoiningDate: e.target.value })}
                    placeholder={t("forms.expectedJoiningDatePlaceholder")}
                    className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    aria-describedby="joining-date-help"
                  />
                  <p id="joining-date-help" className="mt-1 text-xs text-gray-500">
                    {t("forms.joiningDateHelp")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p>
            {t("content.closing1")}{" "}
            {salaryExpectations && t("content.salaryText", { salaryExpectations })}{" "}
            {expectedJoiningDate && t("content.availabilityText", { expectedJoiningDate })}{" "}
            {t("content.closing2")}
          </p>

          <p>
            {t("content.signature")}
            <br />
            <span className="font-semibold">{t("content.name")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
