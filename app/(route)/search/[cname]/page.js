"use client";

import { useGetDoctorsByCategory } from "@/app/_services/queries";
import CategoryList from "../_components/CategoryList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Page = ({ params }) => {
  const category = params.cname;

  const { data } = useGetDoctorsByCategory(category);

  console.log(data);
  return (
    <div className="flex flex-col lg:flex-row py-16 px-4">
      {/* Categories List */}

      <CategoryList />
      {/* Doctors List */}
      <section className="lg:w-3/4">
        <h2 className="text-xl font-bold mb-4">Doctors in {category}</h2>
        <div className="space-y-2 grid grid-cols-2 lg:grid-cols-4 gap-3 ">
          {data?.data.length > 0
            ? data?.data.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-slate-100 rounded shadow p-2"
                >
                  <div className="">
                    {" "}
                    <Image
                      src={doctor.image.url}
                      alt={doctor.image.name}
                      width={600}
                      height={200}
                      className="h-52 w-full object-cover  rounded-lg"
                    />
                    <div>
                      {" "}
                      <h2 className="text-xs bg-blue-100 p-1 rounded-full px-2 w-fit mt-1">
                        {doctor.categories[0].Name}{" "}
                      </h2>{" "}
                      <div className="space-y-1">
                        <p>{doctor.Name}</p>
                        <p className="text-sm">
                          {doctor.Year_of_Experience} years
                        </p>
                        <p className="text-gray-500 text-sm">
                          {doctor.Address}
                        </p>

                        <Link href={`/details/${doctor.documentId}`}>
                          <Button variant="outline" className="text-xs">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : [1].map((each) => (
                <div className="h-56 bg-slate-200 w-full animate-pulse rounded-lg"></div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
