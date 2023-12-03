"use client";
import { Tldraw, track, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "@/useYjsStore";

import { useEffect, useState } from "react";
import { Profile, Server } from "@prisma/client";
import axios from "axios";
import { MobileToggle } from "@/components/mobile-toggle";

const ServerPage = ({ params }: { params: { serverId: string } }) => {
  const [profile, setProfile] = useState<Profile>();
  const [server, setServer] = useState<Server>();

  const HOST_URL = "ws://localhost:1234";

  const store = useYjsStore({
    roomId: params.serverId,
    hostUrl: HOST_URL,
  });

  useEffect(() => {
    const getProps = async () => {
      const server = await axios.get(`/api/servers/${params.serverId}`);
      const profile = await axios.get(`/api/profile`);

      setProfile(profile.data);
      setServer(server.data);
    };

    getProps();
  }, []);

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
  const editor = useEditor();

  const { color } = editor.user;
  useEffect(() => {
    const getProps = async () => {
      const profile = await axios.get(`/api/profile`);

      setProfile(profile.data);
    };

    getProps();
  }, []);

  useEffect(() => {
    editor.user.updateUserPreferences({
      name: profile?.name,
    });
  }, [profile]);

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
