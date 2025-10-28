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
    <main className="flex flex-col max-w-[1000px] mx-auto">
      <NavBar />
      <div className="flex flex-col mt-[100px] mx-[25px] sm:mx-0">
        <h1 className="text-3xl font-raleway text-primary_text">
          Start Adding Items To Your Wishlist!
        </h1>
        <WishlistForm userId={user.id} />
      </div>

      <div className="flex justify-center my-[30px]">
        <h1 className="text-xl text-primary_text font-raleway">Your Items</h1>
      </div>
      <WishlistItems userId={user.id} />
    </main>
  );
}
