import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { VariantProps } from "@nextui-org/react";

interface DialogProps {
  title: string;
  description: string;
  actions: VariantProps<typeof Button>[];
  isOpen: boolean;
  onOpenChange: () => void;
  children?: React.ReactNode;
}

export default function Dialog(props: DialogProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
              <div className="space-y-2">
                <p>{props.description}</p>
                {props.children}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              {props.actions.map(({ key, ...action }) => (
                <Button key={key} {...action} />
              ))}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
