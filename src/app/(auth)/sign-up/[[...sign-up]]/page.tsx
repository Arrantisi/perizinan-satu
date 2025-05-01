// import SignUpComponent from "@/components/auth/sign-up";
import { SignUp } from "@clerk/nextjs";
import { Codepen } from "lucide-react";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <Link href={"/"} className="cursor-pointer">
          <Codepen size={50} />
        </Link>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
