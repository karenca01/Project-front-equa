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
    // Esperamos a tener la info del usuario
    if (loading || !user) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL}/events`, {
          method: "GET",
          credentials: "include", // incluye las cookies de sesión
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener los eventos");

        const data: Event[] = await res.json();
        // Filtramos los eventos creados por el usuario autenticado
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
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        <p>No has creado ningún evento todavía.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-sm w-full h-full">
      {events.map((event: Event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}
