import { Request, Response } from "express";

class BaseController {
  protected jsonResponse(
    res: Response,
    data: any,
    statusCode: number = 200
  ): any {
    res.status(statusCode).json({
      success: true,
      data,
    });
  }
}

export default BaseController;
