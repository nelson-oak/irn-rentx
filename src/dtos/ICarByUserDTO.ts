import { ICarDTO } from "./ICarDTO";

export interface ICarByUserDTO {
  id: string
  user_id: string
  car: ICarDTO
  startDate: string
  endDate: string
}