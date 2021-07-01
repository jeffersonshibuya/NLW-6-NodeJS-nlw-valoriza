import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    //Verficar se email existe
    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error('E-mail/Password incorrect')
    }

    //Verificar se senha esta corretament
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('E-mail/Password incorrect')
    }

    //Gerar o token
    const token = sign({ email: user.email }, 'my-secret', {
      subject: user.id,
      expiresIn: "1d"
    })

    return token;
  }
}

export { AuthenticateUserService }