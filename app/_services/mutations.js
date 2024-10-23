"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { BookAppointment } from "./GlobalApi";

export function useBookAppointment() {
  return useMutation({
    queryFn: (data) => BookAppointment(data),
    queryKey: ["appointment"],
    onSuccess: () => {
      toast("success");
    },
  });
}
