"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";
import { LuShoppingCart } from "react-icons/lu";
import { Input } from "@nextui-org/input";

import Actions from "./Actions/page";

import { formatPrice } from "@/utils/format";
import IBook from "@/interfaces/book.interface";
import useDeleteCart from "@/hooks/useDeleteCart";
import useCreateCart from "@/hooks/useCreateCart";
import useCartIsCreated from "@/hooks/useCartIsCreated";

interface IPreviewProps {
  book: IBook;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  priceError?: string;
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
          {props.isEditing ? (
            <>
              <Input
                label="Image"
                value={props.image}
                onChange={(e) => props.setImage(e.target.value)}
              />
              <Input
                errorMessage={props.priceError}
                isInvalid={!!props.priceError}
                label="Price"
                type="number"
                value={props.price}
                onChange={(e) => props.setPrice(e.target.value)}
              />
            </>
          ) : (
            <>
              {props.book.image && (
                <Image alt={props.book.title} src={props.book.image} />
              )}
              <span className="text-center">{formattedPrice}</span>
            </>
          )}
          {session.data?.user.current && (
            <div className="flex gap-2">
              {cartIsCreated.isLoading ? (
                <Spinner />
              ) : cartIsCreated.data?.id ? (
                <Button
                  fullWidth
                  color="danger"
                  isLoading={deleteCart.isMutating}
                  startContent={<LuShoppingCart size={20} />}
                  onPress={async () => await handleDeleteCart()}
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  isLoading={createCart.isMutating}
                  startContent={<LuShoppingCart size={20} />}
                  onPress={async () => await handleCreateCart()}
                >
                  Add to cart
                </Button>
              )}
              {(session?.data?.user?.current?.role ?? 0) > 0 && (
                <Actions
                  book={props.book}
                  isEditing={props.isEditing}
                  setIsEditing={props.setIsEditing}
                />
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
