"use client";

import useCartIsCreated from "@/hooks/useCartIsCreated";
import useCreateCart from "@/hooks/useCreateCart";
import useDeleteCart from "@/hooks/useDeleteCart";
import IBook from "@/interfaces/book.interface";
import { formatPrice } from "@/utils/format";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";
import { LuShoppingCart } from "react-icons/lu";
import Actions from "./Actions/page";

interface IPreviewProps {
  book: IBook;
}

export default function Preview(props: IPreviewProps) {
  const session = useSession();

  const formattedPrice = formatPrice(props.book.price);

  const cartIsCreated = useCartIsCreated(
    props.book.id,
    session.data?.user.current?.id,
  );

  const createCart = useCreateCart(
    props.book.id,
    session.data?.user.current?.id,
  );

  const deleteCart = useDeleteCart(cartIsCreated.data?.id);

  const handleCreateCart = async () => {
    await createCart.trigger();
    await cartIsCreated.mutate();
  };

  const handleDeleteCart = async () => {
    await deleteCart.trigger();
    await cartIsCreated.mutate();
  };

  return (
    <div className="space-y-2">
      <Card>
        <CardBody className="gap-2">
          {props.book.image && (
            <Image alt={props.book.title} src={props.book.image} />
          )}
          <span className="text-center">{formattedPrice}</span>
          {session.data?.user.current && (
            <div className="flex gap-2">
              {cartIsCreated.isLoading ? (
                <Spinner />
              ) : cartIsCreated.data?.id ? (
                <Button
                  color="danger"
                  startContent={<LuShoppingCart size={20} />}
                  fullWidth
                  isLoading={deleteCart.isMutating}
                  onPress={async () => await handleDeleteCart()}
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  color="primary"
                  startContent={<LuShoppingCart size={20} />}
                  fullWidth
                  isLoading={createCart.isMutating}
                  onPress={async () => await handleCreateCart()}
                >
                  Add to cart
                </Button>
              )}
              {(session?.data?.user?.current?.role ?? 0) > 0 && (
                <Actions book={props.book} />
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
