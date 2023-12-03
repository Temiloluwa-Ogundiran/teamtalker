import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./server/server-sidebar";

import { Button } from "./ui/button";
import "flowbite";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    // <Sheet>
    //   <SheetTrigger asChild>
    //     <Button variant="outline" size="icon">
    //       <Menu />
    //     </Button>
    //   </SheetTrigger>
    //   <SheetContent side="left" classNameNameNameName="p-0 flex gap-0">
    //     <div classNameNameNameName="w-[72px]">
    //       <NavigationSidebar serverId={serverId} />
    //     </div>
    //     <ServerSidebar serverId={serverId} />
    //   </SheetContent>
    // </Sheet>

    <>
      <div className="text-center">
        <button
          className="bg-[#313338] hover:bg-[#313338] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-[#313338] dark:hover:bg-[#313338] focus:outline-none dark:focus:bg-[#313338]"
          type="button"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
        >
          <Menu />
        </button>
      </div>

      <div
        id="drawer-example"
        className="fixed top-0 left-0 z-40 h-full  transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800 p-0 flex gap-0"
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
        <button
          type="button"
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="w-[72px]">
          <NavigationSidebar serverId={serverId} />
        </div>
        <ServerSidebar serverId={serverId} />
      </div>
    </>
  );
};
