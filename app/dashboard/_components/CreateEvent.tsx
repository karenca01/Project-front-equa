'use client';
import { ReactNode } from 'react';

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { LuPlus } from 'react-icons/lu';

export default function CreateEvent({children}: {children: ReactNode}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className='w-[5px] h-auto'><LuPlus size="15"/></Button>
      <Modal className="bg-gris-intermedio" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='w-full'>
          {() => (
            <>
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}