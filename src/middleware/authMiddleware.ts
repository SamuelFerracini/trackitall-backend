import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
  static isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const token = req.headers.authorization;

    if (!token || token !== process.env.AUTH_TOKEN) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    next();
  }
}
