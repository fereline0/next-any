import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import Content from "@/components/shared/Content/page";
import Main from "@/components/shared/Content/Main/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import IAuthor from "@/interfaces/author.interface";
import IBook from "@/interfaces/bookDTO.interface";
import IPaginate from "@/interfaces/paginate.interface";
import BookPreview from "@/components/screens/BookPreview/page";
import ServerPaginate from "@/components/shared/ServerPaginate/page";

interface IAuthorProps extends IPaginate {
  author: IAuthor;
  books: IBook[];
}

export default function Author(props: IAuthorProps) {
  return (
    <Content>
      <SideBar>
        <Card>
          <CardBody className="items-center">
            <div className="space-y">
              <Image
                alt={props.author.name}
                src={props.author.image ?? "/no-avatar.jpg"}
              />
            </div>
          </CardBody>
        </Card>
      </SideBar>
      <Main>
        <div className="space-y-2">
          <Card>
            <CardBody>
              <b className="text-xl">{props.author.name}</b>
              <p>{props.author.description}</p>
            </CardBody>
          </Card>
          <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
            {props.books.map((book) => {
              return <BookPreview key={book.id} book={book} />;
            })}
          </div>
          <ServerPaginate limit={props.limit} total={props.total} />
        </div>
      </Main>
    </Content>
  );
}
