"use client";

import { API_URL } from "@/constants";
import { Event } from "@/entities";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import EventCard from "../../../_components/EventCard";

export default function ListOfMyEvents() {
  const { user, loading } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    if (loading || !user) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`, {
          method: "GET",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener los eventos");

        const data: Event[] = await res.json();

        const filtered = data.filter(
          (ev) => ev.createdBy?.userId === user.userId
        );

        setEvents(filtered);
      } catch (err) {
        console.error("Error al cargar los eventos:", err);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [user, loading]);

  if (loading || loadingEvents) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-[150px] text-gray-500">
        <p>No has creado ningún evento todavía.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row rounded-sm w-full h-full">
      {events.map((event: Event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}