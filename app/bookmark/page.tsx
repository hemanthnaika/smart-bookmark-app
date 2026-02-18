
import BookMarks from "@/components/bookMarks";
import CustomButton from "@/components/customButton";
import CustomLayout from "@/components/customLayout";
import Folders from "@/components/folders";
import { Folder, Book } from "lucide-react";


const BookMark = () => {
  
  return (
    <div className="min-h-screen bg-background p-6 pt-20">
      <CustomLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text">Your Bookmarks</h1>
          <p className="text-sm text-text mt-1">
            Save links with or without folders. Access them anytime, anywhere.
          </p>
        </div>
        <div className="mb-10 flex flex-col md:flex-row w-full items-center gap-4">
          <CustomButton title="Create Folder" mode="folder" />
          <CustomButton title="Create Bookmark" mode="bookmark" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 rounded-xl  p-4 bg-white shadow-md">
            <h3 className="mb-4 text-sm font-semibold text-text">
              <Folder className="h-4 w-4 inline mr-2 text-primary" />
              Folders
            </h3>
            <Folders />
          </div>
          <div className="md:col-span-3 rounded-xl  p-6 bg-white shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text">
                <Book className="h-4 w-4 inline mr-2 text-primary" /> Bookmarks
              </h3>
            </div>
            <BookMarks />
          </div>
        </div>
      </CustomLayout>
    </div>
  );
};

export default BookMark;
