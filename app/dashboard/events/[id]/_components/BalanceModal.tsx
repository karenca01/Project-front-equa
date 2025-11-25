"use client";

import { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { LuCalculator } from "react-icons/lu";

export default function BalanceModal({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        variant="flat"
        className="w-full"
        onPress={onOpen}
        color="warning"
      >
        Genera tu cuenta {<LuCalculator size={20} />}
      </Button>

      <Modal
        className="bg-gris-intermedio"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => <ModalBody>{children}</ModalBody>}
        </ModalContent>
      </Modal>
    </>
  );
}