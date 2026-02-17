import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets";
import CustomLayout from "@/components/customLayout";

const Navbar = () => {
  return (
    <header className=" absolute top-0 left-0 w-full z-50">
      <CustomLayout>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Smart Bookmark Logo"
              width={28}
              height={28}
              priority
            />
            <span className="font-poppins font-semibold text-sm">
              Smart Bookmark
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/signup"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </CustomLayout>
    </header>
  );
};

export default Navbar;
