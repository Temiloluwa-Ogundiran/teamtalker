"use client";
import { Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "@/useYjsStore";

import { useEffect, useState } from "react";
import { Profile, Server } from "@prisma/client";
import axios from "axios";
import { MobileToggle } from "@/components/mobile-toggle";
import { useParams } from "next/navigation";

const ServerPage = ({ params }: { params: { serverId: string } }) => {
  const HOST_URL =
    process.env.NODE_ENV === "development"
      ? "ws://localhost:1234"
      : "wss://170.187.203.33:1234";

  const store = useYjsStore({
    roomId: params.serverId,
    hostUrl: HOST_URL,
  });

  return (
    <div className="bg-white dark:bg-[#313338] flex h-full">
      <div className="mob">
        <MobileToggle serverId={params.serverId} />
      </div>
      <div className="tldraw__editor">
        <Tldraw autoFocus store={store} shareZone={<NameEditor />} />
      </div>
    </div>
  );
};

const NameEditor = track(() => {
  const [profile, setProfile] = useState<Profile>();
  const [server, setServer] = useState<Server>();
  const params = useParams();
  const editor = useEditor();

  const { color } = editor.user;
  useEffect(() => {
    const getProps = async () => {
      const profile = await axios.get(`/api/profile`);
      const server = await axios.get(`/api/servers/${params.serverId}`);

      setProfile(profile.data);
      setServer(server.data);
    };

    getProps();
  }, [params.serverId]);

  useEffect(() => {
    editor.user.updateUserPreferences({
      name: profile?.name,
      isDarkMode: true,
    });
  }, [profile, editor.user]);

  return (
    <div style={{ pointerEvents: "all", display: "flex" }}>
      {server && (
        <div className="mr-28 font-bold text-xl dark:text-white bg-[#313338]">{`${server?.name} Server`}</div>
      )}

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
