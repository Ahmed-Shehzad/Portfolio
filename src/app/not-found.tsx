"use client";

import Link from "next/link";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-8 text-white">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="mb-4 text-4xl font-bold text-emerald-400">404</h1>
          <h2 className="mb-4 text-xl font-semibold">Page Not Found</h2>
          <p className="mb-6 text-gray-300">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full cursor-pointer rounded-lg bg-gray-700 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
