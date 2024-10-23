"use client";
import Image from "next/image";
import { useGetDoctors } from "../_services/queries";
import Link from "next/link";

import { Button } from "@/components/ui/button";
const DoctorList = () => {
  const { data } = useGetDoctors();

  return (
    <div className="mb-5 px-3">
      <h1>Popular Doctors </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data.length > 0
          ? data?.data?.map((each, index) => (
              <div
                key={each.documentId}
                className="border-[1px] rounded-lg p-2"
              >
                {" "}
                <Image
                  src={each.image.url}
                  alt={each.image.name}
                  width={600}
                  height={200}
                  className="h-52 w-full object-cover  rounded-lg"
                />
                <div>
                  {" "}
                  <h2 className="text-xs bg-black text-white p-1 rounded-full px-2 w-fit mt-1">
                    {each.categories[0].Name}{" "}
                  </h2>{" "}
                  <div className="space-y-1">
                    <p>{each.Name}</p>
                    <p className="text-sm">{each.Year_of_Experience} years</p>
                    <p className="text-gray-500 text-sm">{each.Address}</p>

                    <Link
                      href={`/details/${each.documentId}
`}
                    >
                      <Button variant="outline" className="text-xs">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : [1, 2].map((each) => (
              <div className="h-56 bg-slate-200 w-full animate-pulse rounded-lg"></div>
            ))}
      </div>
    </div>
  );
};

export default DoctorList;
