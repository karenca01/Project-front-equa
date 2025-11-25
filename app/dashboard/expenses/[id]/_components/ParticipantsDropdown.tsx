export function ParticipantsDropdown({ participants, name, defaultUserId }: any) {
    // console.log("PARTICIPANTES", participants);

    return (
        <select
            name={name}
            defaultValue={defaultUserId}
            className="border rounded p-2 w-full"
        >
            <option value="">Selecciona un participante</option>

            {participants.map((p: any, index: number) => (
            <option key={`${p.expenseSplitId}-${index}`} value={p.user.userId}>
                {p.user.username}
            </option>
            ))}
        </select>
    );
}