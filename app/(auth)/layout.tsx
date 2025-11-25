import WelcomeMessage from "./_components/WelcomeMessage";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-row bg-gris-intermedio">
        <div className="w-1/2 flex flex-col justify-center items-center">
            {children}
        </div>
        <div className="w-1/2">
            <WelcomeMessage />
        </div>
    </div>
  );
}