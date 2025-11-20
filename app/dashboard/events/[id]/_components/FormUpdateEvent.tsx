"use client";

import updateEvent from "@/actions/events/update";
import { Event } from "@/entities";
import { Button, Input } from "@heroui/react";

export default function FormUpdateEvent({event}: {event: Event}){
    const {eventId} = event;
    const updateEventById = updateEvent.bind(null, eventId);

    return(
        <form action={updateEventById} className="bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl font-bold text-center">Detalles del evento</h1>
            <Input label="Nombre del evento" name="eventName" defaultValue={event.eventName}/>
            <Input label="Descripción" name="eventDescription" defaultValue={event.eventDescription}/>
            <Input label="Tipo de evento" name="eventType" defaultValue={event.eventType}/>
            {/* poner la lista de invitados y que se puedan eliminar */}
            <Button type="submit" className="bg-gris-fuerte hover:bg-gray-600">
                Guardar cambios
            </Button>
            {/* agregar modal para eliminar evento */}
        </form>
    )
}