import { Event } from "@/entities";
import { API_URL } from "@/constants";
import FormAddExpense from "./_components/FormAddExpense";
import AddExpense from "./_components/AddExpense";
import AddParticipantsModal from "./_components/AddParticipant";
import ParticipantsSelector from "./_components/ParticipantsSelector";
import UpdateEvent from "./_components/UpdateEvent";
import FormUpdateEvent from "./_components/FormUpdateEvent";
import EventExpensesList from "./_components/EventExpensesList";

type PartialEvent = Omit<Event, "eventType" | "createdBy"> & {
  eventType?: string;
  createdBy?: string | { userName?: string };
};

export default async function EventPage({
  params,
}: {
  // params: { id: string };
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const { id } = params;
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
          <div className="flex flex-row items-center gap-5">
            <h1 className="text-5xl font-bold py-4">{event.eventName}</h1>
            <UpdateEvent>
              <FormUpdateEvent event={event as Event}/>
            </UpdateEvent>
          </div>
          <p className="text-xl">{event.eventDescription}</p>
        </div>
        <div className="flex flex-row justify-center items-center w-3/12 pt-4 h-full gap-2">
          <AddExpense>
            <FormAddExpense eventId={id}/>
          </AddExpense>
          <AddParticipantsModal>
            <ParticipantsSelector eventId={id}/>
          </AddParticipantsModal>
        </div>
      </div>
      <div className="w-full bg-gris-fuerte h-1"/>
      <div className="w-full h-9/12 p-5 overflow-y-auto">
        <EventExpensesList eventId={id}/>
      </div>
    </div>
  );
}
