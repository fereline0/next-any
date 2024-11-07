"use client";

import { MdOutlineDelete } from "react-icons/md";
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

import ICart from "@/interfaces/cart.interface";
import useDeleteCart from "@/hooks/useDeleteCart";
import Dialog from "@/components/shared/Dialog/page";
import IDropdownItem from "@/interfaces/dropdownItem.interface";

interface IActionsProps {
  cart: ICart;
}

export default function Actions(props: IActionsProps) {
  const router = useRouter();

  const deleteCartModal = useDisclosure();

  const deleteCart = useDeleteCart(props.cart.id);

  const dropdownItems: IDropdownItem[] = [
    {
      key: "delete",
      children: "Delete",
      color: "danger",
      onPress: () => deleteCartModal.onOpenChange(),
      startContent: <MdOutlineDelete size={20} />,
    },
  ];

  const handleDeleteCart = async () => {
    await deleteCart.trigger();
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
            isLoading: deleteCart.isMutating,
          },
        ]}
        description="Are you sure you want to permanently delete this cart?"
        isOpen={deleteCartModal.isOpen}
        title="Delete"
        onOpenChange={deleteCartModal.onOpenChange}
      />
    </>
  );
}
