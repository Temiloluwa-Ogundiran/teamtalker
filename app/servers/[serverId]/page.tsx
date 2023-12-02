import { PageHeader } from "@/components/page-header";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "@/useYjsStore";
import { profile } from "console";

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const HOST_URL =
    process.env.NODE_ENV === "development"
      ? "ws://localhost:3000"
      : "wss://.....";

  const store = useYjsStore({
    roomId: params.serverId,
    hostUrl: HOST_URL,
  });
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
      <div className="tldraw__editor">
        <Tldraw autoFocus store={store} shareZone={<NameEditor />} />
      </div>
    </div>
  );
};

const NameEditor = track(() => {
  const editor = useEditor();

  const { color } = editor.user;

  editor.user.updateUserPreferences({
    name: profile.name,
  });

  return (
    <div style={{ pointerEvents: "all", display: "flex" }}>
      <input
        type="color"
        value={color}
        onChange={(e) => {
          editor.user.updateUserPreferences({
            color: e.currentTarget.value,
          });
        }}
      />
    </div>
  );
});

export default ServerPage;
