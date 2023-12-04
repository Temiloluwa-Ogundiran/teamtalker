"use client";
import { Menu } from "lucide-react";

import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./server/server-sidebar";
import { useEffect, useState, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <Menu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerContent>
          <DrawerCloseButton />

          <div className="p-0 flex gap-0 h-full">
            <div className="w-[72px]">
              <NavigationSidebar serverId={serverId} />
            </div>
            <ServerSidebar serverId={serverId} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
