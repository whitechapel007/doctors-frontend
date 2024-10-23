"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getDoctorInfo,
  getDoctors,
  getDoctorsByCategory,
} from "./GlobalApi";

export function useGetCategories() {
  return useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });
}

export function useGetDoctors() {
  return useQuery({
    queryFn: getDoctors,
    queryKey: ["doctors"],
  });
}

export function useGetDoctorsByCategory(category) {
  return useQuery({
    queryFn: () => getDoctorsByCategory(category),
    queryKey: ["doctors", category],
  });
}

export function useGetDoctorInfo(id) {
  return useQuery({
    queryFn: () => getDoctorInfo(id),
    queryKey: ["doctor", id],
  });
}
