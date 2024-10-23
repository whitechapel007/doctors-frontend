"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "../_services/queries";
import Image from "next/image";
import Link from "next/link";

const Recommended = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetCategories();

  // console.log(data);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    // const filtered = doctors.filter(
    //   (doctor) =>
    //     doctor.name.toLowerCase().includes(value) ||
    //     doctor.specialty.toLowerCase().includes(value) ||
    //     doctor.location.toLowerCase().includes(value)
    // );
    // setFilteredDoctors(filtered);
  };

  return (
    <section className="bg-gray-50 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find the Right Doctor
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Search and connect with doctors near you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search doctors by name, specialty, or location..."
            onChange={handleSearch}
            className="w-full h-12 px-4 rounded-md border border-gray-300 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Recommended Doctors */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data.length > 0 ? (
            data?.data.map((category) => (
              <Link
                href={`/search/${category.Name}`}
                key={category.id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center">
                  <Image
                    src={category.Icon.url}
                    width={50}
                    height={50}
                    alt={category.Icon.documentId}
                  />
                  <p className="text-xs text-gray-500">{category.Name}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No doctors found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recommended;
