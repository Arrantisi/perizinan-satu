// import SignInComponent from "@/components/auth/sign-in";
import { SignIn } from "@clerk/nextjs";
import { Codepen } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <Link href={"/"} className="cursor-pointer">
          <Codepen size={50} />
        </Link>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
