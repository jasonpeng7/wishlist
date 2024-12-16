import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn 
        signUpForceRedirectUrl="/groups"
        forceRedirectUrl="/groups"
      />
    </div>
  );
}