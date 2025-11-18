import { Event } from "@/entities";
import EventCard from "../../_components/EventCard";
import { API_URL } from "@/constants";
import AddExpense from "./_components/AddExpense";
import FormAddExpense from "./_components/FormAddExpense";

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
    <div className="flex flex-col p-5 w-9/12 h-[100vh]">
      {/* <EventCard event={event as Event} /> */}
      <div className="flex flex-row h-3/12">
        <div className="flex flex-col justify-center w-9/12 h-full">
          <h1 className="text-5xl font-bold py-4">{event.eventName}</h1>
          <p className="text-xl">{event.eventDescription}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-3/12 pt-4 h-full">
          {/* <p>+ gasto</p> */}
          <AddExpense>
            <FormAddExpense/>
          </AddExpense>
        </div>
      </div>
      <div className="w-full bg-gris-fuerte h-1"/>
      <div className="w-full h-9/12 p-5">
        <p>HACER LA LISTA DE GASTOS DEL EVENTO</p>
        <p>HACER LA LISTA DE GASTOS DEL EVENTO</p>
        <p>HACER LA LISTA DE GASTOS DEL EVENTO</p>
      </div>
    </div>
  );
}
