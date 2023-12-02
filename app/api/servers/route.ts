import { currentProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new Response("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};