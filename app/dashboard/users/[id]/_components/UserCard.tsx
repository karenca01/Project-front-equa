import { Card, CardBody } from "@heroui/card";
import { User } from "@/entities";

export function UserCard({user}: {user: User}){
    return(
        <Card className="w-full h-full">
            <CardBody>{user.username}</CardBody>
        </Card>
    )
}