"use client";
import { useGetCategories, useGetDoctorInfo } from "@/app/_services/queries";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookAppointment from "../_components/BookAppointment";

const page = ({ params }) => {
  const router = useRouter();
  const { redordId } = params;
  const { data } = useGetDoctorInfo(redordId);
  const { data: categories } = useGetCategories();

  const doctor = data?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Doctor Info Section */}

      <div className="flex flex-col md:flex-row items-center lg:items-start gap-8 mb-8">
        <div className="w-full lg:w-5/12">
          <Image
            src={doctor?.image.url}
            alt={doctor?.Name}
            className="rounded-lg shadow-md"
            width={400}
            height={400}
          />
        </div>
        <div className="w-full lg:w-7/12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Dr. {doctor?.Name}
          </h2>
          <p className="text-xs bg-black text-white p-1 rounded-full px-2 w-fit my-1">
            {doctor?.categories?.[0]?.Name}
          </p>

          <p className="text-base text-gray-600 mb-6">
            {doctor?.Year_of_Experience} years of experience
          </p>
          <p className="text-base text-gray-600 mb-6">{doctor?.Address}</p>

          <div className="mt-2">
            <BookAppointment doctorId={doctor?.documentId} />
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Availability
        </h3>
      </div>

      {/* Doctor Category Links */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Explore Other Categories
        </h3>
        <div className="flex flex-wrap gap-4">
          {categories?.data.map((category) => (
            <Button
              key={category}
              variant="outline"
              onClick={() => router.push(`/search/${category.Name}`)}
              className="px-4 py-2"
            >
              {category.Name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
