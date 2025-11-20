"use client";

import { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { LuUserPlus } from "react-icons/lu";

export default function AddParticipantsModal({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="w-[40px] h-[40px] rounded-full" onPress={onOpen}>
        <LuUserPlus size="20" />
      </Button>

      <Modal className="bg-gris-intermedio" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <ModalBody>
              {children}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
