"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { User } from "@/entities";
import registerUser from "@/actions/users/create";

export default function SignupPage() {
    //falta agregar la lógica para crear la cuenta
    //por ahora solo es visual
    return (
        <div className="flex flex-col justify-center bg-gris-claro w-[60vh] h-[50vh] px-10 py-2 rounded-md">
            <form action={registerUser}>
                <p className="text-2xl my-4 text-center"><b>Crea tu cuenta</b></p>
                <div className="flex flex-col gap-2 my-4 items-center">
                    <Input label="Nombre completo" name="userFullName" type="text" isRequired={true} size="md"/>
                    <Input label="Nombre de usuario" name="username" type="text" isRequired={true} size="md"/>
                    <Input label="Email" name="userEmail" type="email" isRequired={true} size="md"/>
                    <Input label="Password" name="userPassword" type="password" isRequired={true} size="md"/>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <Button 
                    className="bg-gris-intermedio hover:bg-gris-fuerte text-white"
                    type="submit">
                        Crear
                    </Button>
                </div>
            </form>
        </div>
    )
}