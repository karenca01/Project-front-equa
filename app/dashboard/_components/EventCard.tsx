"use client";

import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { Event } from "@/entities";

export default function EventCard({ event }: { event: Event }) {
    return(
        <div className="p-10">
            <Card className="hover:scale-110 transition-all max-w-[350px]">
            <CardHeader><b>{event.eventName}</b></CardHeader>
            <Divider/>
            <CardBody>
                <p>{event.eventDescription}</p>
                <p><b>Creado por:</b> {typeof event.createdBy === "string"
                    ? event.createdBy
                    : event.createdBy?.username ?? "Desconocido"}
                </p>
                <p><b>Participantes:</b> {event.participants?.length}</p>
            </CardBody>
            </Card>
        </div>
    )
}