import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSection } from "./server-section";
import { ServerMember } from "./server-member";
import { useEffect, useState } from "react";
import axios from "axios";
import { ServerWithMember } from "@/types";
import { Profile } from "@prisma/client";

export const ServerSidebar = ({ serverId }: { serverId: string }) => {
  const [profile, setProfile] = useState<Profile>();
  const [server, setServers] = useState<ServerWithMember>();

  useEffect(() => {
    const getProps = async () => {
      const server = await axios.get(`/api/servers/${serverId}`);
      const profile = await axios.get(`/api/profile`);

      setProfile(profile.data);

      setServers(server.data);
    };

    getProps();
  }, []);

  if (!server || !profile) {
    return;
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        {server.members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            {server.members?.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
