"use client";

import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { Event } from "@/entities";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
    return(
        <div className="p-2 w-full">
            <Card className="hover:scale-110 transition-all w-[200px]">
            <CardBody>
                <b>
                    <Link href={`/dashboard/events/${event.eventId}`}>
                        {event.eventName}
                    </Link>
                </b>
            </CardBody>
            </Card>
        </div>
    )
}