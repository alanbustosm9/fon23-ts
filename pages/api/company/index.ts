// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

import { ICompany, IState, IMessage } from "../../../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: ICompany | null;
};

type DataPost = {
  message: IMessage;
  state: IState;
  data: string | null;
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      token: string;
    };
  }
}

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getData(req, res);
    case "POST":
      return postData(req, res);
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
    console.log(`${process.env.API_BACK}liempresas`);
    const response = await axios.post(
      `${process.env.API_BACK}liempresas.json`,
      {},
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

async function postData(req: NextApiRequest, res: NextApiResponse<DataPost>) {
  try {
    const obj = req.body;

    console.log(`${process.env.API_BACK}crempresa`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}crempresa.json`,
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
      message: "Error al obtener el reporte",
      data: null,
      state: "ERROR",
    });
  }
}
