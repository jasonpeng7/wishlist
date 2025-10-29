import WishlistItems from "./WishListItems";
import WishlistForm from "./WishListForm";
import NavBar from "../components/navbar";
import { getSessionUser } from "../../../utils/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-[#474853] pt-20 christmas-stripes">
      <NavBar />

      {/* Dashboard Container with rounded top corners and overlay effect */}
      <div className="bg-[#f7f9fb] rounded-t-3xl md:mt-[100px] md:mx-8 lg:mx-auto lg:max-w-[1000px]">
        {/* Inner padding container */}
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-primary_text mb-6">
              Start Adding Items To Your Wishlist!
            </h1>
            <WishlistForm userId={user.id} />
          </div>

          <div className="flex justify-start my-8">
            <h1 className="text-xl text-primary_text font-raleway">
              You&apos;re currently wishing for...
            </h1>
          </div>
          <WishlistItems userId={user.id} />
        </div>
      </div>
    </main>
  );
}
