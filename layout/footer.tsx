import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Smart Bookmark. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-gray-900 transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-gray-900 transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-gray-900 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
