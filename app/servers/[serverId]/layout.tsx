import { ServerSidebar } from "@/components/server/server-sidebar";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const serverIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await initialProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default serverIdLayout;
