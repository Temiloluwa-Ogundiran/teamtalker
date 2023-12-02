import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const profile = await initialProfile();

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
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <PageHeader
        name={server?.name}
        serverId={params.serverId}
        imageUrl={server?.imageUrl}
      />
    </div>
  );
};

export default ServerPage;
