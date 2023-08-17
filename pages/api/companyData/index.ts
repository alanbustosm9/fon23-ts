// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

import { ICompanyData, IState, IMessage } from "../../../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: ICompanyData | null;
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      token: string;
    };
  }
}

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getData(req, res);
    default:
      return res.status(400).json({
        message: "Bad request method",
        data: null,
        state: "ERROR",
      });
  }
}

async function getData(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const obj = req.query;

    console.log(`${process.env.API_BACK}obempresa`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}obempresa.json`,
      obj,
      {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      }
    );

    const data = response.data;

    return res.status(200).json({
      message: "Datos ok",
      state: "OK",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error API",
      data: null,
      state: "ERROR",
    });
  }
}
