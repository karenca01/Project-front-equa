"use client";

import { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { addParticipants } from "@/actions/events/addParticipants";
import { API_URL } from "@/constants";

export default function ParticipantsSelector({ eventId }: { eventId: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  // Buscar usuarios
  useEffect(() => {
    if (query.length < 2) return;

    const fetchUsers = async () => {
      const res = await fetch(`${API_URL}/users/search?q=${query}`);
      const data = await res.json();

      // console.log("SEARCH RESULT:", data);
      setResults(data);
    };

    fetchUsers();
  }, [query]);

  // Agregar usuario a seleccionados
  function addUser(user: any) {
    if (!selected.find((u) => u.userId === user.userId)) {
      setSelected([...selected, user]);
    }
  }

  // Eliminar usuario
  function removeUser(userId: string) {
    setSelected(selected.filter((u) => u.userId !== userId));
  }

  return (
    <form action={addParticipants} className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-semibold">Agregar participantes</h1>

      <input type="hidden" name="eventId" value={eventId} />
      <input
        type="hidden"
        name="participants"
        value={JSON.stringify(selected.map((u) => u.userId))}
      />

      <Input
        label="Buscar usuario"
        placeholder="Escribe el nombre o email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Resultados */}
      <div className="space-y-2">
        {results.map((user: any) => (
          <div
            key={user.userId}
            className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => addUser(user)}
          >
            {user.userFullName} — {user.userEmail}
          </div>
        ))}
      </div>

      {/* Seleccionados */}
      {selected.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Seleccionados:</h3>

          {selected.map((user: any) => (
            <div
              key={user.userId}
              className="p-2 bg-gray-200 rounded flex items-center justify-between"
            >
              {user.userFullName}

              <Button
                size="sm"
                variant="flat"
                onPress={() => removeUser(user.userId)}
              >
                Quitar
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="submit"
        className="w-fit"
        color="primary"
        variant="flat"
      >
        Guardar
      </Button>
    </form>
  );
}
