"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";

import ICategory from "@/interfaces/category.interface";

interface CategoriesProps {
  categories: ICategory[];
  children: React.ReactNode;
}

export default function Categories(props: CategoriesProps) {
  const session = useSession();
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <div className="sticky top-20 z-50">
        <Card isBlurred>
          <CardBody>
            <Tabs selectedKey={pathname}>
              {props.categories.map((category) => (
                <Tab
                  key={`/${category.id}`}
                  as={Link}
                  href={`/${category.id}`}
                  title={category.name}
                />
              ))}
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <div className="space-y-2">
        {(session.data?.user?.current?.role ?? 0) > 0 && (
          <div className="flex justify-end">
            <Button as={Link} color="primary" href="/books/create">
              Create book
            </Button>
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
}
