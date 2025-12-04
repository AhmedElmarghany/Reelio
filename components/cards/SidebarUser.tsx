"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutIcon from "../icons/LogoutIcon"
import EllipsisIcon from "../icons/EllipsisIcon"
import { useState } from "react"
export function SidebarUser({
  user,
  setOpen
}: {
  user: {
    name: string
    username: string
    avatar: string
  }
  setOpen: (open: boolean) => void
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOpenLogoutDialog = () => {
    // Close dropdown first to prevent pointer-events conflict
    setDropdownOpen(false);
    // Small delay to ensure dropdown is fully closed
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className="flex items-center justify-between hover:bg-neutral-900 w-64 max-lg:w-fit p-3 rounded-full -ml-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight max-lg:hidden">
              <span className="truncate font-semibold text-[16px] text-neutral-300">{user.name}</span>
              <span className="text-muted-foreground truncate text-[14px]">
                @{user.username}
              </span>
            </div>
          </div>
          <div className=" max-lg:hidden">
          <EllipsisIcon color="#737373"/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full min-w-56 rounded-xl bg-background border-border-dark"
          side="top"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuItem onClick={handleOpenLogoutDialog} className="flex gap-3 items-center bg-background leading-8 text-[16px] hover:bg-muted">
            <LogoutIcon size={22} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
