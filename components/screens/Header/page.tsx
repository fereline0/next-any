"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import { signOut, useSession } from "next-auth/react";
import { IoLogInOutline, IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

import Dialog from "@/components/shared/Dialog/page";
import IDropdownItem from "@/interfaces/dropdownItem.interface";
import { siteConfig } from "@/config/site";
import ThemeSwitcher from "./ThemeSwitcher/page";

export default function Header() {
  const {
    isOpen: isOpenSignOutModal,
    onOpen: onOpenSignOutModal,
    onOpenChange: onOpenChangeSignOutModal,
  } = useDisclosure();
  const session = useSession();

  const handleSignOut = async () => {
    await signOut();
    onOpenChangeSignOutModal();
  };

  const dropdownItems: IDropdownItem[] = [
    {
      key: "signOut",
      children: "Sign out",
      color: "danger",
      startContent: <IoLogInOutline size={20} />,
      onClick: onOpenSignOutModal,
    },
  ];

  const enabledDropdownItems = dropdownItems.filter((item) => !item.isDisabled);

  return (
    <Navbar shouldHideOnScroll maxWidth="2xl">
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            {siteConfig.name}
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {session.status == "loading" ? (
          <Spinner />
        ) : session.status === "authenticated" ? (
          <NavbarItem>
            <Dropdown backdrop="blur" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  className="cursor-pointer"
                  size="sm"
                  src={session.data.user.image ?? "/no-avatar.jpg"}
                />
              </DropdownTrigger>
              <DropdownMenu variant="shadow">
                {enabledDropdownItems.map(({ isDisabled, key, ...item }) => (
                  <DropdownItem key={key} {...item} />
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dialog
              actions={[
                {
                  key: "signOut",
                  children: "Sign out",
                  onClick: async () => await handleSignOut(),
                  color: "danger",
                },
              ]}
              description="Are you sure you want to sign out of your account?"
              isOpen={isOpenSignOutModal}
              title="Sign out"
              onOpenChange={onOpenChangeSignOutModal}
            />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/login"
              startContent={<IoLogInOutline size={20} />}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
