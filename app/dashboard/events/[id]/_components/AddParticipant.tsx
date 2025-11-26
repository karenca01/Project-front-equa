//modal para añadir participante

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
      <Button className="w-fit gap-5" color="primary" variant="flat" onPress={onOpen}>
        Participante
        {<LuUserPlus size="20" />}
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
