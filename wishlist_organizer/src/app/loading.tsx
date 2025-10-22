import Loader from "./components/Loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate_gray">
      <Loader />
    </div>
  );
}
