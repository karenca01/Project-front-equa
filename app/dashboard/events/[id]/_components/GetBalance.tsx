//obtener el balance al dar click

"use client";

import { useEffect, useState } from "react";
import { getEventBalance } from "@/actions/events/getBalance";
import { CardHeader, Divider, Spinner, Card, CardBody } from "@heroui/react";

type Participant = {
  userId: string;
  userFullName: string;
};

type BalancesMap = Record<string, Record<string, number>>;

export default function EventBalanceContent({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<{
    participants: Participant[];
    balances: BalancesMap;
  } | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getEventBalance(eventId);
      setBalance(data);
      setLoading(false);
    }
    load();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!balance) return <p className="text-center">No hay balances.</p>;

  const { participants, balances } = balance;

  return (
    <div className="flex flex-col gap-4 py-2">
      {participants.map((p: Participant) => (
        <Card
          key={p.userId}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gris-muy-fuerte">
              Pagar a {p.userFullName}
            </h3>
          </CardHeader>

          <Divider className="border-gray-600" />

          <CardBody className="flex flex-col gap-2">
            {participants.map((o: Participant) => {
              if (o.userId === p.userId) return null;

              const amount = balances[o.userId]?.[p.userId] ?? 0;

              if (amount <= 0)
                return (
                  <p key={o.userId} className="text-gray-400">
                    {o.userFullName} no debe nada
                  </p>
                );

              return (
                <div
                  key={o.userId}
                  className="flex justify-between py-1 px-2 bg-gray-100 rounded-md"
                >
                  <span className="font-semibold">{o.userFullName}</span>
                  <span className="font-bold">
                    ${amount.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}