import BookPreview from "../../screens/BookPreview/page";

import IBook from "@/interfaces/book.interface";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";
import IPaginate from "@/interfaces/paginate.interface";

interface BooksProps extends IPaginate {
  books: IBook[];
}

export default function Books(props: BooksProps) {
  return (
    <Content>
      <SideBar>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
        corporis? Ullam quae odio deserunt quaerat explicabo, placeat
        praesentium. Quasi provident consequuntur dignissimos aliquam cumque
        beatae, illo quam et voluptatum similique?
      </SideBar>
      <Main>
        <div className="space-y-2">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {props.books.map((book) => {
              return <BookPreview key={book.id} book={book} />;
            })}
          </div>
          <ServerPaginate total={props.total} limit={props.limit} />
        </div>
      </Main>
    </Content>
  );
}
