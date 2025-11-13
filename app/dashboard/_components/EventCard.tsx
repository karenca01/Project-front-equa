"use client";

import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { Event } from "@/entities";

export default function EventCard({ event }: { event: Event }) {
    return(
        <div className="p-10">
            <Card className="hover:scale-110 transition-all w-[150px] h-[100px]">
            <CardHeader><b>{event.eventName}</b></CardHeader>
            <Divider/>
            <CardBody>
                <p>{event.eventDescription}</p>
                {/* <p><b>Participantes:</b> {event.participants?.length}</p> */}
            </CardBody>
            </Card>
        </div>
    )
}