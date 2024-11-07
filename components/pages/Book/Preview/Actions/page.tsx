"use client";

import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { LuMoreVertical } from "react-icons/lu";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Dialog from "@/components/shared/Dialog/page";
import IBook from "@/interfaces/bookDTO.interface";
import useDeleteBook from "@/hooks/useDeleteBook";
import IDropdownItem from "@/interfaces/dropdownItem.interface";

interface IActionsProps {
  book: IBook;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Actions(props: IActionsProps) {
  const session = useSession();
  const router = useRouter();

  const deleteCartModal = useDisclosure();

  const deleteBook = useDeleteBook(props.book.id);

  const dropdownItems: IDropdownItem[] = [
    {
      key: "edit",
      children: "Edit",
      startContent: <MdModeEdit size={20} />,
      onClick: () => props.setIsEditing(true),
      isDisabled:
        props.isEditing || (session?.data?.user?.current?.role ?? 0) <= 0,
    },
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
          <Button isIconOnly variant="light">
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
