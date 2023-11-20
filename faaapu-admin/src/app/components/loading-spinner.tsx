export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75 z-50">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};