import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate_gray">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/landing.webp"
          alt="Wishr background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered logo and title near top */}
      <div className="relative z-10 flex flex-col items-center pt-10 sm:pt-14">
        <Image src="/logo.svg" alt="Wishr logo" width={56} height={56} />
        <h1 className="mt-3 font-raleway text-white text-3xl">Wishr</h1>
      </div>

      {/* Two lines of text just above the popup */}
      <div className="z-10 absolute left-0 right-0 bottom-[32vh] sm:bottom-[34vh] flex flex-col items-center px-6 mb-4">
        <p className="text-center font-raleway text-white text-base sm:text-base">
          Organize wishlists for yourself and groups.
        </p>
        <p className="text-center font-raleway text-white sm:text-base">
          Track and share effortlessly.
        </p>
      </div>

      {/* Bottom sheet popup (~30% height) */}
      <div className="absolute z-20 left-0 right-0 bottom-0 h-[32vh] sm:h-[30vh] bg-[#f7f9fb] rounded-t-2xl ring-1 ring-white/10">
        <div className="mx-auto h-full max-w-md px-5 py-6 flex flex-col justify-between">
          <div className="text-center">
            <p className="font-raleway text-dark_gray/80 text-sm">
              Sign in or create an account to continue
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/signin">
              <button className="w-full font-raleway bg-primary_text text-white py-2.5 rounded-md active:scale-95 transition-transform">
                Sign in
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full font-raleway border border-primary_text text-primary_text py-2.5 rounded-md active:scale-95 transition-transform">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
