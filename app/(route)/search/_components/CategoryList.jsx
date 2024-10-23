import { useGetCategories } from "@/app/_services/queries";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const CategoryList = () => {
  const { data } = useGetCategories();
  const { cname } = useParams();

  return (
    <aside className="lg:w-1/4 pr-8">
      <Command className="h-screen">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {data?.data?.map((each) => (
              <CommandItem
                key={each.documentId}
                className={` mb-2 ${cname === each.Name && "bg-slate-200"}`}
              >
                <Link
                  href={`/search/${each.Name}`}
                  className="p-2 flex gap-2 rounded-md cursor-pointer w-full"
                >
                  <Image
                    src={each.Icon.url}
                    width={25}
                    height={25}
                    alt="icon"
                  />
                  <label className="text-xs">{each.Name}</label>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </aside>
  );
};

export default CategoryList;
