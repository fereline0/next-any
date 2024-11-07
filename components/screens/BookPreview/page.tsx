import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import IBook from "@/interfaces/book.interface";
import authorService from "@/services/author.service";
import { formatPrice } from "@/utils/format";

interface BookPreviewProps {
  book: IBook;
}

export default async function BookPreview(props: BookPreviewProps) {
  const author = await authorService(props.book.authorId);

  if (author.error || author.data === null) {
    return notFound();
  }

  const formattedPrice = formatPrice(props.book.price);

  return (
    <Card isPressable as={Link} href={`/books/${props.book.id}`}>
      <CardBody className="items-center">
        {props.book.image && (
          <Image alt={props.book.title} src={props.book.image} />
        )}
      </CardBody>
      <CardFooter>
        <div className="text-pretty">
          <b>{props.book.title}</b>
          <p className="text-gray-400">{author.data.name}</p>
          <span>{formattedPrice}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
