import BookMarks from "@/components/bookMarks";
import CustomLayout from "@/components/customLayout";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { id } = params;

  return (
    <section className="min-h-screen bg-background pt-20">
      <CustomLayout>
        <Link href="/bookmark" className="flex items-center gap-2">
          <MoveLeft className="w-5 h-5 text-primary" />
          <span className="font-poppins font-medium">Back</span>
        </Link>

        <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
          {/* pass folderId */}
          <BookMarks folderId={id} folder={true} />
        </div>
      </CustomLayout>
    </section>
  );
};

export default Page;
