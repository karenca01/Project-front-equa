//para buscar eventos con id

"use client";

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { LuSearch } from "react-icons/lu";

export default function EventSearchBar({ onSearch }: { onSearch: (id: string) => void }) {
  const [eventId, setEventId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita que recargue la página
    if (!eventId.trim()) return;
    onSearch(eventId);
    setEventId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto mt-6"
    >
      <Input
        type="text"
        label="Buscar evento por ID"
        placeholder="Ejemplo: EVT-1023"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="flex-1"
      />
    </form>
  );
}
