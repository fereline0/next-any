"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ICategory from "@/interfaces/category.interface";

interface CategoriesProps {
  categories: ICategory[];
  children: React.ReactNode;
}

export default function Categories(props: CategoriesProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <div className="sticky top-20 z-50">
        <Card isBlurred>
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
      </div>
      {props.children}
    </div>
  );
}
