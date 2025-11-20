"use client";

import { API_URL } from "@/constants";
import { User } from "@/entities";
import { useEffect, useState } from "react";
import { Spinner, Button } from "@heroui/react";
import { LuTrash2 } from "react-icons/lu";

export default function ListParticipants({ eventId }: { eventId: string }) {
  const [participants, setParticipants] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchParticipants = async () => {
      try {
        const res = await fetch(`${API_URL}/events/${eventId}/participants`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Error al obtener participantes");

        const data: User[] = await res.json();
        setParticipants(data);
      } catch (err) {
        console.error("Error al cargar los participantes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  const handleDelete = async (userId: string) => {
    try {
      setDeleting(userId);

      const res = await fetch(`${API_URL}/events/${eventId}/participants`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: [userId],
        }),
      });

      if (!res.ok) throw new Error("Error al eliminar participante");

      setParticipants((prev) =>
        prev.filter((p) => p.userId !== userId)
      );
    } catch (err) {
      console.error("Error al eliminar participante:", err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50px] text-gray-500">
        <p>No hay participantes registrados en este evento.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-fit bg-gris-claro rounded-md flex flex-col gap-3 p-4">
      <h1 className="text-xl font-semibold">Participantes</h1>

      {participants.map((p) => (
        <div
          key={p.userId}
          className="border rounded-lg p-3 shadow-sm bg-white flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{p.userFullName}</p>
            <p className="text-sm text-gray-600">{p.userEmail}</p>
          </div>

          <Button
            isIconOnly
            color="danger"
            variant="flat"
            onClick={() => handleDelete(p.userId)}
            isDisabled={deleting === p.userId}
          >
            {deleting === p.userId ? (
              <Spinner size="sm" />
            ) : (
              <LuTrash2 size={15} />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
