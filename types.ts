import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMember = Server & {
  members: (Member & { profile: Profile })[];
};
