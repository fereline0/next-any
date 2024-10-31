import BookPreview from "../../screens/BookPreview/page";

import IBook from "@/interfaces/book.interface";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import Main from "@/components/shared/Content/Main/page";

interface BooksFromCategoryProps {
  books: IBook[];
}

export default function BooksFromCategory(props: BooksFromCategoryProps) {
  return (
    <Content>
      <SideBar>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
        corporis? Ullam quae odio deserunt quaerat explicabo, placeat
        praesentium. Quasi provident consequuntur dignissimos aliquam cumque
        beatae, illo quam et voluptatum similique?
      </SideBar>
      <Main>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {props.books.map((book) => {
            return <BookPreview key={book.id} book={book} />;
          })}
        </div>
      </Main>
    </Content>
  );
}
