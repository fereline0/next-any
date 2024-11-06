"use client";

import IDropdownItem from "@/interfaces/dropdownItem.interface";
import { MdOutlineDelete } from "react-icons/md";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { LuMoreVertical } from "react-icons/lu";
import Dialog from "@/components/shared/Dialog/page";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import IBook from "@/interfaces/book.interface";
import useDeleteBook from "@/hooks/useDeleteBook";
import { useSession } from "next-auth/react";

interface IActionsProps {
  book: IBook;
}

export default function Actions(props: IActionsProps) {
  const session = useSession();
  const router = useRouter();

  const deleteCartModal = useDisclosure();

  const deleteBook = useDeleteBook(props.book.id);

  const dropdownItems: IDropdownItem[] = [
    {
      key: "delete",
      children: "Delete",
      color: "danger",
      onPress: () => deleteCartModal.onOpenChange(),
      startContent: <MdOutlineDelete size={20} />,
      isDisabled: (session?.data?.user?.current?.role ?? 0) <= 0,
    },
  ];

  const handleDeleteCart = async () => {
    await deleteBook.trigger();
    deleteCartModal.onOpenChange();
    router.refresh();
  };

  return (
    <>
      <Dropdown backdrop="blur" placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <LuMoreVertical size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow">
          {dropdownItems
            .filter((item) => !item.isDisabled)
            .map(({ key, ...item }) => (
              <DropdownItem key={key} {...item} />
            ))}
        </DropdownMenu>
      </Dropdown>
      <Dialog
        actions={[
          {
            key: "delete",
            children: "Delete",
            onPress: async () => await handleDeleteCart(),
            color: "danger",
            isLoading: deleteBook.isMutating,
          },
        ]}
        description="Are you sure you want to permanently delete this book?"
        isOpen={deleteCartModal.isOpen}
        title="Delete"
        onOpenChange={deleteCartModal.onOpenChange}
      />
    </>
  );
}
