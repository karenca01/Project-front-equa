import AuthButton from "./AuthButton";

export default function WelcomeMessage() {
    return (
        <div className="flex flex-col justify-center items-center bg-gris-fuerte w-full h-screen">
            <div>
                <p className="text-3xl text-center"><b>Bienvenido a Equa</b></p>
                <div className="flex flex-col w-[60vh] py-2">
                    <p className="text-center">Bienvenido a Equa, una aplicación de gestión de gastos para tener cuentas más organizadas y modernas.</p>
                </div>
            </div>
            <div>
                <AuthButton />
            </div>
        </div>
    )
}