"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ICategory from "@/interfaces/category.interface";
import Marginer from "@/components/shared/Marginer/page";

interface ICategories {
  categories: ICategory[];
  children: React.ReactNode;
}

export default function Categories(props: ICategories) {
  const pathname = usePathname();

  return (
    <Marginer y={8}>
      <Card>
        <CardBody>
          <Tabs selectedKey={pathname}>
            {props.categories.map((category) => {
              return (
                <Tab
                  key={`/${category.id}`}
                  as={Link}
                  href={`/${category.id}`}
                  title={category.name}
                />
              );
            })}
          </Tabs>
        </CardBody>
      </Card>
      {props.children}
    </Marginer>
  );
}
