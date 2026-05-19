import { Response } from 'express';


export function setTokenInCookies(res: Response, refreshToken: string) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
  });
}
