import MiscCards from "./components/MiscCards";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <main className="flex flex-row justify-center bg-slate_gray gap-x-[20px] px-4 sm:px-6 lg:px-8">
      {/* Gift wrap decoration */}
      <div className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          {/* Main triangle with stripes */}
          <path d="M0 0 L100 0 L0 100 Z" fill="#124E66" />
          <path
            d="M20 0 L0 20 M40 0 L0 40 M60 0 L0 60 M80 0 L0 80"
            stroke="#124E66"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Rest of your content */}
      <div className="flex flex-col p-4 w-full md:w-1/3 min-w-[300px] max-w-[500px] mt-[260px] relative">
        <p className="hidden md:block md:absolute md:bottom-5 md:left-5 text-primary_text font-raleway">
          Wishr© by Jason Peng
        </p>
        <h1 className="font-raleway text-3xl sm:text-4xl lg:text-[50px] text-primary_text font-bold mb-[20px]">
          Welcome to <span className="block">Wishlist Organizer</span>
        </h1>
        <p className="text-primary_text font-raleway font-medium text-sm sm:text-[15px] mb-6 py-[10px]">
          Please sign in to manage your wishlists
        </p>

        <div className="md:hidden items-center justify-center flex flex-col gap-y-[27px] bg-washed_gray p-[20px] rounded-md">
          <div className="flex flex-col w-full">
            <div className="text-primary_text font-raleway flex flex-col rounded-md bg-dark_gray w-full p-[10px] gap-y-[5px]">
              <h1 className="text-s">Item Name</h1>
              <p className="text-[10px]">Brand/Store</p>
              <p className="text-[10px]">Describe it!</p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="text-primary_text font-raleway flex flex-col rounded-md bg-dark_gray w-full p-[10px] gap-y-[5px]">
              <h1 className="text-s">Item Name</h1>
              <p className="text-[10px]">Brand/Store</p>
              <p className="text-[10px]">Describe it!</p>
            </div>
          </div>
        </div>

        <p className="flex md:hidden text-primary_text font-raleway mt-[20px]">
          Wishr© by Jason Peng
        </p>
      </div>

      <MiscCards />
      <div className="fixed top-4 right-4 flex flex-row gap-x-[20px]">
        <Link href="/signin">
          <button className="font-raleway text-dark_gray px-4 bg-bone rounded-md transition-transform transform active:scale-90 animate-jump">
            Sign In
          </button>
        </Link>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          priority
        ></Image>
      </div>
    </main>
  );
}
