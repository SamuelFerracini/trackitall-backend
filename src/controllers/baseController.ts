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

  protected notFound(res: Response): any {
    res.status(404).json({
      success: false,
      error: "Not found",
    });
  }
}

export default BaseController;
