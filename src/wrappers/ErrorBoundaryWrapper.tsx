"use client";

import { FC, ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

interface IErrorBoundaryWrapperProps {
  children: ReactNode;
}

export const ErrorBoundaryWrapper: FC<IErrorBoundaryWrapperProps> = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};
