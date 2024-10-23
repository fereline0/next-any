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

import ThemeSwitcher from "./ThemeSwitcher/page";

import Dialog from "@/components/shared/Dialog/page";
import IDropdownItem from "@/interfaces/dropdownItem.interface";
import { siteConfig } from "@/config/site";

export default function Header() {
  const session = useSession();

  const {
    isOpen: isOpenSignOutModal,
    onOpen: onOpenSignOutModal,
    onOpenChange: onOpenChangeSignOutModal,
  } = useDisclosure();

  const handleSignOut = async () => {
    await signOut();
    onOpenChangeSignOutModal();
  };

  const dropdownItems: IDropdownItem[] = [
    {
      key: "user",
      children: session.data?.user.current?.name,
      startContent: <FiUser size={20} />,
    },
    {
      key: "settings",
      children: "Settings",
      startContent: <IoSettingsOutline size={20} />,
    },
    {
      key: "signOut",
      children: "Sign out",
      color: "danger",
      startContent: <IoLogInOutline size={20} />,
      onPress: onOpenSignOutModal,
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
        {session.status === "loading" ? (
          <Spinner />
        ) : session.status === "authenticated" && session.data.user.current ? (
          <NavbarItem>
            <Dropdown backdrop="blur" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  className="cursor-pointer"
                  size="sm"
                  src={session.data.user.current.image ?? "/no-avatar.jpg"}
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
                  onPress: async () => await handleSignOut(),
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
              href="/auth"
              startContent={<IoLogInOutline size={20} />}
            >
              Auth
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
