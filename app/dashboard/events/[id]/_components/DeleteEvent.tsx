'use client';
import { ReactNode } from 'react';

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { LuTrash } from 'react-icons/lu';

export default function DeleteEvent({children}: {children: ReactNode}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className='w-fit' variant='flat' color="danger">
        Eliminar evento{<LuTrash size="20"/>}
        </Button>
      <Modal className="bg-gris-intermedio items-center" isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className='w-[300px]'>
          {(onClose) => (
            <>
              <ModalBody>
                {children}
                <Button className='w-[100px]' color='default' variant='flat' onPress={onClose}>Cancelar</Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}