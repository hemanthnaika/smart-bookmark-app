import {
  CloudLightning,
  Earth,
  Folder,
  Link,
  Lock,
  LucideIcon,
} from "lucide-react";
import LoginButton from "./loginButton";

type FeaturesCardProps = {
  title: string;
  icon: LucideIcon;
};

const FeaturesCard = ({ title, icon: Icon }: FeaturesCardProps) => {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-primary" />
      <span className="font-poppins font-medium">{title}</span>
    </div>
  );
};
const Features = () => {
  return (
    <section className="py-24 bg-linear-to-b from-white to-slate-50" id="features">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-medium text-primary">
            How Smart Bookmark Works
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight font-poppins">
            Turn messy links into
            <span className="text-primary"> organized folders</span>
          </h2>
          <p className="mt-5 text-gray-600">
            Stop saving random links everywhere. Create folders, save URLs
            inside them, and find anything in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="relative rounded-2xl border border-gray-200 bg-white p-7 hover:shadow-xl transition">
            <div className="absolute -top-5 left-6 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
              Step 1
            </div>
            <h3 className="text-xl font-medium mt-4 font-poppins ">
              Create folders
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              Create folders like <b>Design</b>, <b>Development</b>, or
              <b> Learning</b> to group similar bookmarks together.
            </p>

            <div className="mt-6 rounded-lg bg-slate-100 p-4 text-sm  flex flex-col gap-2">
              <FeaturesCard title="Work" icon={Folder} />
              <FeaturesCard title="Tutorials" icon={Folder} />
              <FeaturesCard title="Personal" icon={Folder} />
            </div>
          </div>

          <div className="relative rounded-2xl border border-gray-200 bg-white p-7 hover:shadow-xl transition">
            <div className="absolute -top-5 left-6 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
              Step 2
            </div>
            <h3 className="text-xl font-medium mt-4 font-poppins">
              Save links inside folders
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              Add URLs directly into folders so everything stays neat and
              searchable.
            </p>

            <div className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-gray-700 space-y-1">
              <FeaturesCard title="github.com" icon={Link} />
              <FeaturesCard title="figma.com" icon={Link} />
              <FeaturesCard title="tailwindcss.com" icon={Link} />
            </div>
          </div>

          <div className="relative rounded-2xl border border-gray-200 bg-white p-7 hover:shadow-xl transition">
            <div className="absolute -top-5 left-6 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
              Step 3
            </div>
            <h3 className="text-xl font-medium mt-4 font-poppins">
              Access anytime
            </h3>
            <p className="mt-3 text-sm text-gray-600">
              Your bookmarks stay private and synced in real-time across all
              your devices.
            </p>

            <div className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-gray-700">
              <FeaturesCard title="Private" icon={Lock} />
              <FeaturesCard title="Real-time sync" icon={CloudLightning} />
              <FeaturesCard title="Any device" icon={Earth} />
            </div>
          </div>
        </div>

        <div className="mt-20 text-center mx-auto w-50">
          <LoginButton title=" Start organizing for free" />
        </div>
      </div>
    </section>
  );
};

export default Features;
