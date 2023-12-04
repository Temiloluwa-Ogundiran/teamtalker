"use client";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/naviagtion-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Server } from "@prisma/client";
import axios from "axios";
import { MagnifyingGlass, ThreeDots } from "react-loader-spinner";

export const NavigationSidebar = ({ serverId }: { serverId: string }) => {
  const [servers, setServers] = useState<Server[]>();

  useEffect(() => {
    const getProps = async () => {
      const servers = await axios.get(`/api/servers`);

      setServers(servers.data);
    };

    getProps();
  }, []);

  if (!servers) {
    return (
      <div className="centerLoader">
        {/* <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#313338"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        /> */}
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
