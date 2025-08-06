"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FC, ReactNode } from "react";

interface IErrorBoundaryWrapperProps {
  children: ReactNode;
}

export const ErrorBoundaryWrapper: FC<IErrorBoundaryWrapperProps> = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
