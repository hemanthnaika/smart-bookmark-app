import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets";
import CustomLayout from "@/components/customLayout";
import LoginButton from "@/components/loginButton";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <CustomLayout>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Smart Bookmark Logo"
              width={25}
              height={25}
              priority
            />
            <span className="font-poppins font-semibold text-sm text-primary">
              Smart Bookmark
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <LoginButton title="Get Started" />
          </div>
        </nav>
      </CustomLayout>
    </header>
  );
};

export default Navbar;
