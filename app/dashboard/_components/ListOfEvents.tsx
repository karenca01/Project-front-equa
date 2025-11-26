//lista de todos lo eventos
//creados y unidos

"use client";

import { API_URL } from "@/constants";
import { Event } from "@/entities";
import EventCard from "./EventCard";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

export default function ListOfEvents() {
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
          (ev) =>
            ev.createdBy?.userId === user.userId || // creados por él
            ev.participants?.some((p) => p.userId === user.userId) // donde participa
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
      <div className="flex justify-center items-center h-[300px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] bg-gris-claro rounded-md p-4 text-gray-500">
        <p>No has creado o participado en ningún evento todavía.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-sm w-full h-[300px] overflow-y-auto">
      {events.map((event: Event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}