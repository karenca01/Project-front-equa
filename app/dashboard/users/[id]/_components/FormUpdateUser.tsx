import { Button, Input } from "@heroui/react";
import { User } from "@/entities";
import updateUser from "@/actions/users/update";

export default function FormUpdateUser({user}: {user: User}){
    const { userId } = user;
    const updateUserById = updateUser.bind(null, userId);

    return(
        <form action={updateUserById} className="bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-2xl font-bold">Editar usuario</h1>
            <Input label="Nombre de usuario" name="username" defaultValue={user.username}/>
            <Input label="Nombre completo" name="userFullName" defaultValue={user.userFullName}/>
            <Input label="Correo electrónico" name="userEmail" defaultValue={user.userEmail}/>
            <Input label="Contraseña" name="userPassword" defaultValue={user.userPassword}/>
            <Button type="submit" color="primary">Guardar</Button>
        </form>
    )
}