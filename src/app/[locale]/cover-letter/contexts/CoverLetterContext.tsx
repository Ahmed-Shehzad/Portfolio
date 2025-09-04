"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { logger } from "@/shared/utils";

interface CoverLetterData {
  companyName: string;
  specificReason: string;
  salaryExpectations: string;
  expectedJoiningDate: string;
  positionName: string;
}

interface CoverLetterContextType {
  data: CoverLetterData;
  updateData: (updates: Partial<CoverLetterData>) => void;
}

const CoverLetterContext = createContext<CoverLetterContextType | undefined>(undefined);

export function CoverLetterProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CoverLetterData>({
    companyName: "",
    specificReason: "",
    salaryExpectations: "",
    expectedJoiningDate: "",
    positionName: "Software Engineer", // Default value
  });

  // Read data from localStorage (for PDF generation) or URL parameters (fallback)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // First, try to get data from localStorage (PDF generation case)
    const pdfData = localStorage.getItem("coverLetterPDFData");
    if (pdfData) {
      try {
        const parsedData = JSON.parse(pdfData);
        logger.debug("Loading data from localStorage for PDF", { parsedData });
        setData((prev) => ({ ...prev, ...parsedData }));
        // Clear the data after loading
        localStorage.removeItem("coverLetterPDFData");
        return;
      } catch (e) {
        logger.error("Error parsing PDF data from localStorage", e as Error);
      }
    }

    // Listen for custom event from PDF generation
    const handleCoverLetterData = (event: CustomEvent) => {
      logger.debug("Received cover letter data from PDF generation", { detail: event.detail });
      setData((prev) => ({ ...prev, ...event.detail }));
    };

    window.addEventListener("coverLetterDataReady", handleCoverLetterData as EventListener);

    // Fallback to URL parameters (if needed for other use cases)
    const urlParams = new URLSearchParams(window.location.search);
    const urlData: Partial<CoverLetterData> = {};

    const urlCompanyName = urlParams.get("companyName");
    const urlSpecificReason = urlParams.get("specificReason");
    const urlSalaryExpectations = urlParams.get("salaryExpectations");
    const urlExpectedJoiningDate = urlParams.get("expectedJoiningDate");
    const urlPositionName = urlParams.get("positionName");

    if (urlCompanyName) urlData.companyName = urlCompanyName;
    if (urlSpecificReason) urlData.specificReason = urlSpecificReason;
    if (urlSalaryExpectations) urlData.salaryExpectations = urlSalaryExpectations;
    if (urlExpectedJoiningDate) urlData.expectedJoiningDate = urlExpectedJoiningDate;
    if (urlPositionName) urlData.positionName = urlPositionName;

    if (Object.keys(urlData).length > 0) {
      logger.debug("Loading data from URL parameters", { urlData });
      setData((prev) => ({ ...prev, ...urlData }));
    }

    // Cleanup function
    return () => {
      window.removeEventListener("coverLetterDataReady", handleCoverLetterData as EventListener);
    };
  }, []);

  const updateData = (updates: Partial<CoverLetterData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const contextValue = useMemo(
    () => ({
      data,
      updateData,
    }),
    [data]
  );

  return <CoverLetterContext.Provider value={contextValue}>{children}</CoverLetterContext.Provider>;
}

export function useCoverLetterContext() {
  const context = useContext(CoverLetterContext);
  if (context === undefined) {
    throw new Error("useCoverLetterContext must be used within a CoverLetterProvider");
  }
  return context;
}
