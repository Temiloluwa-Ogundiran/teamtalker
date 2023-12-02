import { MobileToggle } from "./mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name?: string;
  imageUrl?: string;
}

export const PageHeader = ({ serverId, name, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
};
