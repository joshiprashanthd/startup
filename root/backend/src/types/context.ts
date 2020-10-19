import { Request, Response } from "express";
import { IDataloaders } from "../dataloaders";

export interface IContext {
	req: Request;
	res: Response;
	dataloaders: IDataloaders;
}
