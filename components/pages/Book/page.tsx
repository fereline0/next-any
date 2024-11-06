import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import IBook from "@/interfaces/book.interface";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import Preview from "./Preview/page";
import IAuthor from "@/interfaces/author.interface";

interface BookProps {
  book: IBook;
  author: IAuthor;
}

export default async function Book(props: BookProps) {
  return (
    <Content>
      <SideBar>
        <Preview book={props.book} />
      </SideBar>
      <Main>
        <Card>
          <CardBody>
            <div className="text-pretty space-y-2">
              <b className="text-xl">{props.book.title}</b>
              <p>{props.book.description}</p>
              <Link href={`/authors/${props.author.id}`}>
                {props.author.name}
              </Link>
            </div>
          </CardBody>
        </Card>
      </Main>
    </Content>
  );
}
