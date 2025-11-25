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
        className="w-[50px] h-[50px] rounded-full"
        onPress={onOpen}
        color="primary"
      >
        <LuCalculator size={20} />
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