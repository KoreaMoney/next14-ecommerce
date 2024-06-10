"use client";
import Link from "next/link";
import Image from "next/image";

const CategoryList = () => {
  return (
    <div className="px-4 overflow-x-scroll">
      <div className="flex gap-4 md:gap-8">
        <Link href="/list?cat=test">
          <div className="relative bg-slate-100 w-full h-96">
            <Image
              src="https://cdn.pixabay.com/photo/2015/06/25/17/22/smart-watch-821559_640.jpg"
              alt="category"
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
