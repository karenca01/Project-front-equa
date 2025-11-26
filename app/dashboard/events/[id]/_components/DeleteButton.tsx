//botón para confirmar el eliminar el evento

import deleteEvent from "@/actions/events/delete"
import { Button } from "@heroui/react"

export default function DeleteButton({eventId} : {eventId: string}) {
    const deleteEvenetById = deleteEvent.bind(null, eventId)

    return(
        <form action={deleteEvenetById} className="flex">
            <Button className="w-[100px]" color="danger" variant="flat" type="submit">Estoy seguro</Button>
        </form>
    )
}