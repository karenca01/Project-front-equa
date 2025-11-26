//solo es el modal para añadir gasto

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

export default function AddExpense({children}: {children: ReactNode}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className='w-fit' color='success' variant='flat' onPress={onOpen}>Agregar gasto {<LuPlus size="20"/>}</Button>
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