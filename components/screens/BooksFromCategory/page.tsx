import BookPreview from "../BookPreview/page";

import IBook from "@/interfaces/book.interface";
import Marginer from "@/components/shared/Marginer/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";

interface IBooksFromCategory extends IPaginate {
  books: IBook[];
}

export default function BooksFromCategory(props: IBooksFromCategory) {
  return (
    <Marginer y={8}>
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {props.books.map((book) => {
          return <BookPreview key={book.id} book={book} />;
        })}
      </div>
      <ServerPaginate limit={props.limit} total={props.total} />
    </Marginer>
  );
}
