import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "../../../../utils/auth";
import Snowfall from "@/app/components/Snowfall";
import NavBar from "@/app/components/navbar";

export default async function JoinGroupHelpPage() {
  if (!await getSessionUser()) redirect("/signin");
  return (
    <div className="relative min-h-screen pt-24 pb-28 px-4">
      <Snowfall />
      <NavBar />
      <div className="relative z-10 max-w-xl mx-auto rounded-xl bg-[#fdfbf7] p-6 md:p-8 text-slate_gray">
        <h1 className="text-3xl font-bold mb-3">Join from an invitation</h1>
        <p className="mb-4">Open the invitation link shared by your group&apos;s organizer. It will join the group and open its wishlists.</p>
        <p className="mb-6">Need a link? Ask the organizer to copy the invite link from their group&apos;s settings.</p>
        <Link href="/groups" className="text-[#315b47] underline underline-offset-4">Back to groups</Link>
      </div>
    </div>
  );
}
