"use client";

import React from "react";
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
import { IoLogInOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";

import ThemeSwitcher from "./ThemeSwitcher/page";
import Dialog from "@/components/shared/Dialog/page";
import { siteConfig } from "@/config/site";
import IDropdownItem from "@/interfaces/dropdownItem.interface";
import { VariantProps } from "@nextui-org/theme";
import { User } from "@nextui-org/user";

export default function Header() {
  const { data: session, status } = useSession();
  const {
    isOpen: isOpenSignOutModal,
    onOpen: onOpenSignOutModal,
    onOpenChange: onOpenChangeSignOutModal,
  } = useDisclosure();

  const dropdownItems: IDropdownItem[] = [
    {
      key: "cart",
      children: "Cart",
      href: `/users/${session?.user.current?.id}/cart`,
      startContent: <LuShoppingCart size={20} />,
    },
    {
      key: "signOut",
      children: "Sign out",
      color: "danger",
      startContent: <IoLogInOutline size={20} />,
      onPress: onOpenSignOutModal,
    },
  ];

  const navbarItems: VariantProps<typeof NavbarItem>[] = [
    {
      key: "themeSwitcher",
      children: <ThemeSwitcher />,
    },
  ];

  return (
    <Navbar maxWidth="2xl">
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            {siteConfig.name}
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        {navbarItems.map((item) => (
          <NavbarItem key={item.key}>{item.children}</NavbarItem>
        ))}
        {status === "loading" ? (
          <NavbarItem>
            <Spinner />
          </NavbarItem>
        ) : status === "authenticated" && session.user.current ? (
          <>
            <NavbarItem>
              <Dropdown backdrop="blur" placement="bottom-end">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      size: "sm",
                      src: session.user.current.image ?? "/no-avatar.jpg",
                    }}
                    name={session.user.current.name}
                    description={session.user.current.login}
                  />
                </DropdownTrigger>
                <DropdownMenu variant="shadow">
                  {dropdownItems
                    .filter((item) => !item.isDisabled)
                    .map(({ key, ...item }) => (
                      <DropdownItem key={key} {...item} />
                    ))}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <Dialog
              actions={[
                {
                  key: "signOut",
                  children: "Sign out",
                  onPress: () => {
                    signOut();
                    onOpenChangeSignOutModal();
                  },
                  color: "danger",
                },
              ]}
              description="Are you sure you want to sign out of your account?"
              isOpen={isOpenSignOutModal}
              title="Sign out"
              onOpenChange={onOpenChangeSignOutModal}
            />
          </>
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
