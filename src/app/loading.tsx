import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-emerald-400"></div>
        <p className="text-gray-300">Loading your portfolio...</p>
      </div>
    </div>
  );
};

export default Loading;
