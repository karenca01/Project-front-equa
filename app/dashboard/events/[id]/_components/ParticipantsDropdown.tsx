//lista que aparece al agrergar el participante al split

"use client";

export function ParticipantsDropdown({
  participants = [],
  name,
}: {
  participants?: any[];
  name: string;
}) {
  return (
    <select
      name={name}
      className="border rounded-lg px-3 py-2 w-full bg-white"
      required
    >
      <option value="">Selecciona un participante</option>
      {participants.map((user) => (
        <option key={user.userId} value={user.userId}>
          {user.userFullName}
        </option>
      ))}
    </select>
  );
}