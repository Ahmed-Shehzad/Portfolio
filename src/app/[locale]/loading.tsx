import { FC } from "react";

/**
 * Loading component for the main page
 * This will show while the page is being server-side rendered or loading
 */
const Loading: FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500" />
        <p className="text-sm text-white/60">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default Loading;
