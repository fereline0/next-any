import BookCart from "../../screens/BookCart/page";

import ICart from "@/interfaces/cart.interface";
import IPaginate from "@/interfaces/paginate.interface";
import ServerPaginate from "@/components/shared/ServerPaginate/page";

interface ICartProps extends IPaginate {
  cartFromUser: ICart[];
}

export default function Cart(props: ICartProps) {
  return (
    <div className="space-y-2">
      <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {props.cartFromUser.map((item) => (
          <BookCart key={item.id} item={item} />
        ))}
      </div>
      <ServerPaginate limit={props.limit} total={props.total} />
    </div>
  );
}
