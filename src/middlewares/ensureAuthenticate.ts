import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  // Recebe o token
  const authToken = request.headers.authorization;

  //Validar se token esta preenchido
  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')

  // Validar token
  try {
    const { sub } = verify(token, 'my-secret') as IPayload

    //Recuperar informacao do usuario
    request.user_id = sub

    return next();
  } catch (error) {
    return response.status(401).end();
  }



}