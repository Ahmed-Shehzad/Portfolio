export function CoverLetterHeader() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="mb-6 border-b border-gray-200 pb-4">
      <h1 className="text-3xl font-bold text-gray-900">Muhammad Ahmed Shehzad</h1>
      <p className="text-md mt-1 text-gray-600">Software Engineer</p>
      <p className="mt-2 text-sm text-gray-500">{currentDate}</p>
    </header>
  );
}
