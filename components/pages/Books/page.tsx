import BookPreview from "../../screens/BookPreview/page";

import IBook from "@/interfaces/book.interface";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";

interface BooksProps extends IPaginate {
  books: IBook[];
}

export default function Books(props: BooksProps) {
  return (
    <div className="space-y-2">
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {props.books.map((book) => {
          return <BookPreview key={book.id} book={book} />;
        })}
      </div>
      <ServerPaginate limit={props.limit} total={props.total} />
    </div>
  );
}
