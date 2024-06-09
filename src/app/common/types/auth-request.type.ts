import { Request as HttpRequest } from 'express';

interface UserJwtPayload {
  sub: string;
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload };
