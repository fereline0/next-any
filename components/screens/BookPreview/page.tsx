import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import IBook from "@/interfaces/book.interface";

interface IBookPreview {
  book: IBook;
}

export default function BookPreview(props: IBookPreview) {
  return (
    <Card isPressable as={Link} href={`/books/${props.book.id}`}>
      <CardBody>
        {props.book.images && (
          <Image alt={props.book.title} src={props.book.images[0]} />
        )}
      </CardBody>
      <CardFooter>
        <div className="w-full flex justify-between gap-2">
          <b>{props.book.title}</b>
          <span>{props.book.price}₽</span>
        </div>
      </CardFooter>
    </Card>
  );
}
