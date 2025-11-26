//page del evento por id

import { Event } from "@/entities";
import { API_URL } from "@/constants";
import FormAddExpense from "./_components/FormAddExpense";
import AddExpense from "./_components/AddExpense";
import AddParticipantsModal from "./_components/AddParticipant";
import ParticipantsSelector from "./_components/ParticipantsSelector";
import UpdateEvent from "./_components/UpdateEvent";
import FormUpdateEvent from "./_components/FormUpdateEvent";
import EventExpensesList from "./_components/EventExpensesList";
import BalanceModal from "./_components/BalanceModal";
import GetBalance from "./_components/GetBalance";

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

  let participants: any[] = [];
  try {
    const resParticipants = await fetch(`${API_URL}/events/${id}/participants`, {
      cache: "no-store",
    });

    if (!resParticipants.ok) throw new Error("No se pudieron obtener los participantes");

    participants = await resParticipants.json();
  } catch (error) {
    console.error("Error al obtener los participantes:", error);
  }

  return (
    <div className="flex flex-col p-6 w-10/12 min-h-screen space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-bold">{event.eventName}</h1>
            <UpdateEvent>
              <FormUpdateEvent event={event as Event} />
            </UpdateEvent>
          </div>
          <p className="mt-2 text-lg md:text-xl">{event.eventDescription}</p>
        </div>

        <div className="flex flex-col gap-2 mt-4 md:mt-0">
          <AddExpense>
            <FormAddExpense eventId={id} participants={participants} />
          </AddExpense>
          <AddParticipantsModal>
            <ParticipantsSelector eventId={id} />
          </AddParticipantsModal>
        </div>
      </div>

      <div className="w-full border-t border-gris-muy-fuerte" />

      <div className="flex-1 overflow-y-auto">
        <EventExpensesList eventId={id} />
      </div>

      <div className="flex justify-center mt-4">
        <BalanceModal>
          <GetBalance eventId={id} />
        </BalanceModal>
      </div>
    </div>
  );
}
