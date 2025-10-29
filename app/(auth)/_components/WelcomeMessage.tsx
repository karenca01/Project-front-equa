import AuthButton from "./AuthButton";

export default function WelcomeMessage() {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-600 w-full h-screen">
            <div>
                <p className="text-3xl text-center"><b>Bienvenido a Equa</b></p>
                <p className="text-center">Bienvenido a Equa, una aplicación de gestión de gastos para tener cuentas más organizadas y modernas.</p>
            </div>
            <div>
                <AuthButton />
            </div>
        </div>
    )
}