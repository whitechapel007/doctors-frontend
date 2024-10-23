"use client";
import { Button } from "@/components/ui/button";
import { HeaderMenu } from "@/utils/HeaderMenu";
import Image from "next/image";
import Link from "next/link";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiOutlineCaretDown } from "react-icons/ai";



const Header = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-10">

      <Link href={"/"}>
        <Image
          src="/logo.png"
          width={80}
          height={50}
          className=""
          alt="doctors picture"
          />
          </Link>

        <ul className="md:flex gap-8 hidden">
          {HeaderMenu.map((item, index) => (
            <Link
              href={item.path}
              className="hover:text-primary hover:text-opacity-30 hover:scale-105 transition-all ease-in-out cursor-pointer"
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-1">
              <Image
                src={user.picture}
                width={50}
                height={50}
                alt="profile-picture"
                className="rounded-full"
              />
              <AiOutlineCaretDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-44 flex flex-col gap-2">
            <p className="cursor-pointer hover:bg-slate-100">Profile</p>
            <p className="cursor-pointer hover:bg-slate-100">My Bookings</p>

            <Button>
              {" "}
              <LogoutLink> Logout </LogoutLink>
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button> Login </Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;
