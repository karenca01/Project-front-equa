import AuthButton from "./AuthButton";

export default function WelcomeMessage() {
    return (
        <div className="flex flex-col justify-center items-center bg-gris-fuerte text-white w-full min-h-screen px-4">
            <div className="max-w-xl w-full text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold">
                    Bienvenido a <span className="text-indigo-800">Equa</span>
                </h1>
                <p className="text-md md:text-lg text-gray-300">
                    Una aplicación de gestión de gastos para mantener tus cuentas organizadas y modernas.
                </p>

                <div className="mt-6">
                    <AuthButton />
                </div>
            </div>
        </div>
    );
}
