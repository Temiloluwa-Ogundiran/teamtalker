"use client";

import { ServerWithMember } from "@/types";
import { MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "members";
  server?: ServerWithMember;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Memebers" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
