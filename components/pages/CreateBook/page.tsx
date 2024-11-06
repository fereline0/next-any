"use client";

import Main from "@/components/shared/Content/Main/page";
import Content from "@/components/shared/Content/page";
import SideBar from "@/components/shared/Content/SideBar/page";
import ICategory from "@/interfaces/category.interface";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@nextui-org/react";
import { IoAddOutline } from "react-icons/io5";
import IAuthor from "@/interfaces/author.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bookRequest from "@/requests/book.request";
import { useState } from "react";
import useCreateBook from "@/hooks/useCreateBook";
import { useRouter } from "next/navigation";

interface ICreateBookProps {
  categories: ICategory[];
  authors: IAuthor[];
}

export default function CreateBook(props: ICreateBookProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Selection>(new Set([]));
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const categoriesToArray = Array.from(categories).map(Number);

  const bookValidation = useForm({
    resolver: zodResolver(bookRequest),
    values: {
      price: Number(price),
      categories: categoriesToArray,
      author,
      title,
      description,
    },
  });

  const createBook = useCreateBook(
    title,
    description,
    price,
    image,
    author,
    categoriesToArray,
  );

  const handleSubmit = async () => {
    await createBook.trigger();
    router.push("/");
  };

  return (
    <Content>
      <SideBar>
        <Card>
          <CardBody>
            <div className="space-y-2">
              <Select
                multiple
                errorMessage={
                  bookValidation.formState.errors.categories?.message
                }
                isInvalid={!!bookValidation.formState.errors.categories}
                selectionMode="multiple"
                selectedKeys={categories}
                onSelectionChange={setCategories}
                label="Category"
              >
                {props.categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
              <Select
                errorMessage={bookValidation.formState.errors.author?.message}
                isInvalid={!!bookValidation.formState.errors.author}
                selectedKeys={[author]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setAuthor(e.target.value)
                }
                label="Author"
              >
                {props.authors.map((author) => (
                  <SelectItem key={author.id}>{author.name}</SelectItem>
                ))}
              </Select>
              <Button
                onPress={async () =>
                  await bookValidation.handleSubmit(
                    async () => await handleSubmit(),
                  )()
                }
                isLoading={createBook.isMutating}
                color="primary"
                startContent={<IoAddOutline size={20} />}
                fullWidth
              >
                Create article
              </Button>
            </div>
          </CardBody>
        </Card>
      </SideBar>
      <Main>
        <Card>
          <CardBody>
            <div className="space-y-2">
              <Input
                errorMessage={bookValidation.formState.errors.title?.message}
                isInvalid={!!bookValidation.formState.errors.title}
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                type="number"
                label="Price"
                min={0}
                errorMessage={bookValidation.formState.errors.price?.message}
                isInvalid={!!bookValidation.formState.errors.price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Textarea
                errorMessage={
                  bookValidation.formState.errors.description?.message
                }
                isInvalid={!!bookValidation.formState.errors.description}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                label="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </CardBody>
        </Card>
      </Main>
    </Content>
  );
}
