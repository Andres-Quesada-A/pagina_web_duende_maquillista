import { sign } from "jsonwebtoken";

export const GenerateToken = (name: string, lastName: string, email: string, typeUser: number) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        name,
        lastName,
        typeUser,
        email,
        creationDate: formattedDate,
      },
      "DuendeMaquillista"
    );
    return token
}