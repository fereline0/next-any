import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import { Image } from "@nextui-org/image";
import IBook from "@/interfaces/book.interface";
import authorService from "@/services/author.service";
import { formatPrice } from "@/utils/format";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { LuShoppingCart } from "react-icons/lu";

interface BookProps {
  book: IBook;
}

export default async function Book(props: BookProps) {
  const author = await authorService(props.book.authorId, 1, 0);

  const formattedPrice = formatPrice(props.book.price);

  return (
    <Content>
      <SideBar>
        <div className="space-y-2">
          <Card>
            <CardBody className="gap-2">
              <Image
                alt={props.book.title}
                src={props.book.image ?? "/no-avatar.jpg"}
              />
              <span className="text-center">{formattedPrice}</span>
              <Button
                color="primary"
                startContent={<LuShoppingCart size={20} />}
                fullWidth
              >
                Add to cart
              </Button>
            </CardBody>
          </Card>
        </div>
      </SideBar>
      <Main>
        <Card>
          <CardBody>
            <div className="text-pretty space-y-2">
              <b className="text-xl">{props.book.title}</b>
              <p>{props.book.description}</p>
              <div></div>
              <Link href={`/authors/${author.data?.id}`}>
                {author.data?.name}
              </Link>
            </div>
          </CardBody>
        </Card>
      </Main>
    </Content>
  );
}
