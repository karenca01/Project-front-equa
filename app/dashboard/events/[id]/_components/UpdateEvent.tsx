'use client';
import { ReactNode } from 'react';

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { LuInfo } from 'react-icons/lu';

export default function UpdateEvent({children}: {children: ReactNode}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button isIconOnly color='default' variant='flat' onPress={onOpen}>{<LuInfo size="20"/>}</Button>
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