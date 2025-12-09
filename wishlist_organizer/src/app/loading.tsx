import Snowfall from "./components/Snowfall";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#090a0f] flex items-center justify-center">
      <Snowfall />
      <h1 className="text-white font-raleway text-2xl animate-pulse z-10">Loading...</h1>
    </div>
  );
}
