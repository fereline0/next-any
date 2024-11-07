import { notFound } from "next/navigation";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

import Actions from "./Actions/page";

import { formatPrice } from "@/utils/format";
import authorService from "@/services/author.service";
import bookService from "@/services/book.service";
import ICart from "@/interfaces/cart.interface";

interface IBookCartProps {
  item: ICart;
}

export default async function BookCart(props: IBookCartProps) {
  const book = await bookService(props.item.bookId);

  if (book.error || !book.data) {
    return notFound();
  }

  const author = await authorService(book.data.authorId);

  if (author.error || !author.data) {
    return notFound();
  }

  const formattedPrice = formatPrice(book.data.price);

  return (
    <Card>
      <CardBody className="items-center">
        {book.data.image && (
          <Image alt={book.data.title} src={book.data.image} />
        )}
      </CardBody>
      <CardFooter className="flex-wrap gap-2 justify-between">
        <div className="flex flex-col text-pretty">
          <Link href={`/books/${book.data.id}`}>{book.data.title}</Link>
          <Link className="text-gray-400" href={`/authors/${author.data.id}`}>
            {author.data.name}
          </Link>
          <span>{formattedPrice}</span>
        </div>
        <Actions cart={props.item} />
      </CardFooter>
    </Card>
  );
}
