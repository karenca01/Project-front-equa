import { createEvent } from "@/actions/events/create";
import { Input, Button } from "@heroui/react";

export default function FormCreateNewEvent() {
    return (
    <form action={createEvent} className="bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
      <h1 className="text-3xl font-bold text-center">Nuevo evento</h1>
      <Input isRequired label="Nombre" placeholder="Comida año nuevo" name="eventName"/>
      <Input isRequired label="Descripción" placeholder="Familia López Pérez" name="eventDescription"/>
      <Input label="Tipo" placeholder="Public" name="eventType" defaultValue="Public"/>
      <Button type="submit" className="bg-gris-fuerte hover:bg-gray-600">Crear</Button>
    </form>
  );
}