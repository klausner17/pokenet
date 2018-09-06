import { Trainer } from "../models/Trainer";
import { IFindOptions } from "sequelize-typescript";
import { InstanceSaveOptions, UpdateOptions, DestroyOptions } from "sequelize";

export class TrainnerService {
  async getTrainersByUser(userId: number): Promise<Trainer[]> {
    const options: IFindOptions = {
      attributes: ['id', 'name', 'level'],
      where: {userId: userId}
    };
    let trainers = await Trainer.findAll<Trainer>(options);
    return trainers;
  }

  async add(trainer: Trainer): Promise<Trainer>  {
    return Trainer.create<Trainer>(trainer);
  }

  async get(trainerId: number): Promise<Trainer> {
    const option: IFindOptions = {
      where: { id: trainerId }
    };
    let trainer = await Trainer.findOne<Trainer>(option);
    return trainer;
  }

  async update(trainer: Trainer, userId: number): Promise<void> {
    const option: UpdateOptions = {
      where: { id: trainer.id, userId: userId }
    }
    Trainer.update<Trainer>(trainer, option);
  }

  async delete(trainerId: number, userId: number): Promise<void> {
    const options: DestroyOptions = {
      where: { id: trainerId, userId: userId }
    };
    Trainer.destroy(options);
  }

}
