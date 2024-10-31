import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";

import IBook from "@/interfaces/book.interface";
import authorService from "@/services/author.service";
import { formatPrice } from "@/utils/format";

interface BookPreviewProps {
  book: IBook;
}

export default async function BookPreview(props: BookPreviewProps) {
  const author = await authorService(props.book.authorId, 1, 0);

  const formattedPrice = formatPrice(props.book.price);

  return (
    <Card isPressable as={Link} href={`/books/${props.book.id}`}>
      <CardBody>
        <Image
          alt={props.book.title}
          src={props.book.image ?? "/no-avatar.jpg"}
        />
      </CardBody>
      <CardFooter>
        <div className="text-pretty">
          <b>{props.book.title}</b>
          <p className="text-gray-400">{author.data?.name}</p>
          <span>{formattedPrice}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
