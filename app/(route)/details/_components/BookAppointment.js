import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import useTimeSlot from "./useTimeSlot";
import { DialogClose } from "@radix-ui/react-dialog";
import { useBookAppointment } from "@/app/_services/mutations";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const BookAppointment = ({ doctorId }) => {
  const { user } = useKindeBrowserClient();
  const [date, setDate] = useState(new Date());

  const [note, setNote] = useState("");

  const [selectedTime, setSelectedTime] = useState("");
  const time = useTimeSlot();

  const isPastDay = (day) => day < new Date();

  const { mutate } = useBookAppointment();

  const bookAppointmentHandler = () => {
    mutate({
      data: {
        UserName: `${user.given_name} ${user.family_name}`,
        Email: user.email,
        Time: selectedTime,
        date: date,
        doctor: doctorId,
        Note: note,
      },
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <span className="bg-black text-white p-2 rounded-md px-3">
          Book Appointment
        </span>
      </DialogTrigger>
      <DialogContent>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col items-baseline">
            <p className="text-xs">select a date</p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={isPastDay}
            />
          </div>
          <div>
            <p className=" my-1 text-xs md:mt-0"> Select Time slot</p>
            <div className="grid grid-cols-3 gap-3 mt-3 md:mt-0">
              {time.map((each) => (
                <span
                  className={` border rounded-full flex justify-center text-xs items-center w-3/4 p-1 hover:bg-primary hover:text-white  cursor-pointer ${
                    each.time === selectedTime && "bg-primary text-white"
                  }`}
                  key={each.time}
                  onClick={() => setSelectedTime(each.time)}
                >
                  {each.time}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <textarea
            className="w-full border outline-black p-2 md:h-24"
            onChange={(e) => setNote(e.target.value)}
            placeholder="leave a note"
          ></textarea>
        </div>

        <DialogFooter className="">
          <div className="flex gap-3 w-full">
            <Button
              type="submit"
              disabled={!(selectedTime && date)}
              className="mb-1 flex-1 md:mb-0 inline-block"
              onClick={bookAppointmentHandler}
            >
              Confirm
            </Button>

            <DialogClose asChild className="flex-1">
              <Button
                type="submit"
                variant="outline"
                className="text-red-300 border-red-500"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
