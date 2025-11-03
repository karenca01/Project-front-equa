import { Event } from "@/entities";
import EventCard from "../../_components/EventCard";
import { API_URL } from "@/constants";

type PartialEvent = Omit<Event, "eventType" | "createdBy"> & {
  eventType?: string;
  createdBy?: string | { userName?: string };
};

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  let event: PartialEvent | null = null;

  try {
    const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("No se pudo obtener el evento");
    event = await res.json();
  } catch (error) {
    console.error("Error al obtener el evento:", error);
  }

  if (!event) {
    return <div>No se encontró el evento</div>;
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <EventCard event={event as Event} />
    </div>
  );
}
