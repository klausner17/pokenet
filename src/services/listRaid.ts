import { ListRaid } from "../models/ListRaid";
import { IFindOptions } from "sequelize-typescript";
import { Pokemon } from "../models/Pokemon";
import { Gym } from "../models/Gym";
import { User } from "../models/User";
import { RaidTrainer } from "../models/RaidTrainer";
import { Trainer } from "../models/Trainer";

export class ListRaidService {
  async getAllActives(): Promise<ListRaid[]> {
    const date = new Date();
    const options: IFindOptions = {
      where: { meetingTime: { $gte: date } },
      include: [Pokemon, Gym]
    };
    let raids = ListRaid.findAll<ListRaid>(options);
    return raids;
  }

  async get(raidId: number): Promise<ListRaid> {
    const options: IFindOptions = {
      include: [Pokemon, Gym, {
        model: User,
        attributes: ['id', 'name', 'level']
      },
        {
          model: RaidTrainer,
          include: [Trainer]
        }]
    }
    let raid = ListRaid.findById<ListRaid>(raidId);
    return raid;
  }
}
