import { Request, Response } from "express";

export const mockResponse = () => {
  let res = {} as Response;
  let req = {} as Request;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  req.cookies = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req) as Record<string, any>;

  return { req, res };
};
