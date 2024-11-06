import { VariantProps } from "@nextui-org/theme";
import { DropdownItem } from "@nextui-org/dropdown";

export default interface IDropdownItem
  extends VariantProps<typeof DropdownItem> {
  isDisabled?: boolean;
}
