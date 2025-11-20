import deleteEvent from "@/actions/events/delete"
import { Button } from "@heroui/react"

export default function DeleteButton({eventId} : {eventId: string}) {
    const deleteEvenetById = deleteEvent.bind(null, eventId)

    return(
        <form action={deleteEvenetById} className="flex">
            <Button className="w-[100px]" color="danger" type="submit">Estoy seguro</Button>
        </form>
    )
}