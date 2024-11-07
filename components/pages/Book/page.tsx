"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@nextui-org/react";

import Preview from "./Preview/page";

import ICategory from "@/interfaces/category.interface";
import bookRequest from "@/requests/book.request";
import useEditBook from "@/hooks/useEditBook";
import IAuthor from "@/interfaces/author.interface";
import IBook from "@/interfaces/book.interface";
import SideBar from "@/components/shared/Content/SideBar/page";
import Content from "@/components/shared/Content/page";
import Main from "@/components/shared/Content/Main/page";

interface BookProps {
  book: IBook;
  author: IAuthor;
  categories: ICategory[];
}

export default function Book(props: BookProps) {
  const router = useRouter();

  const [title, setTitle] = useState(props.book.title);
  const [description, setDescription] = useState(props.book.description);
  const [price, setPrice] = useState(props.book.price.toString());
  const [image, setImage] = useState(props.book.image || "");
  const [categories, setCategories] = useState<Selection>(
    new Set(props.categories?.map((category) => category.id.toString())),
  );
  const [isEditing, setIsEditing] = useState(false);

  const categoriesToArray = Array.from(categories).map(Number);

  const bookValidation = useForm({
    resolver: zodResolver(bookRequest),
    values: {
      price: Number(price),
      categories: categoriesToArray,
      author: props.author.id.toString(),
      title,
      description,
    },
  });

  const editBook = useEditBook(
    props.book.id,
    title,
    description,
    price,
    image,
    props.author.id.toString(),
  );

  const handleSave = async () => {
    await editBook.trigger();
    router.refresh();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(props.book.title);
    setDescription(props.book.description);
    setPrice(props.book.price.toString());
    setImage(props.book.image || "");
    setIsEditing(false);
  };

  return (
    <Content>
      <SideBar>
        <Preview
          book={props.book}
          image={image}
          isEditing={isEditing}
          price={price}
          priceError={bookValidation.formState.errors.price?.message}
          setImage={setImage}
          setIsEditing={setIsEditing}
          setPrice={setPrice}
        />
      </SideBar>
      <Main>
        <Card>
          <CardBody>
            <div className="text-pretty space-y-2">
              {isEditing ? (
                <>
                  <Input
                    errorMessage={
                      bookValidation.formState.errors.title?.message
                    }
                    isInvalid={!!bookValidation.formState.errors.title}
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  <Select
                    multiple
                    errorMessage={
                      bookValidation.formState.errors.categories?.message
                    }
                    isInvalid={!!bookValidation.formState.errors.categories}
                    label="Category"
                    selectedKeys={categories}
                    selectionMode="multiple"
                    onSelectionChange={setCategories}
                  >
                    {props.categories.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                  <div className="flex justify-end gap-2">
                    <Button
                      color="primary"
                      isLoading={editBook.isMutating}
                      onPress={async () =>
                        await bookValidation.handleSubmit(
                          async () => await handleSave(),
                        )()
                      }
                    >
                      Save
                    </Button>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <b className="text-xl">{title}</b>
                  <p>{description}</p>
                  <Link href={`/authors/${props.author.id}`}>
                    {props.author.name}
                  </Link>
                </>
              )}
            </div>
          </CardBody>
        </Card>
      </Main>
    </Content>
  );
}
