import { FirebaseSieveRepository } from "@mohasinac/db-firebase";
import type { PreorderItem } from "../types";

export class PreordersRepository extends FirebaseSieveRepository<PreorderItem> {
  constructor() {
    super("products");
  }

  async findPreorders(): Promise<PreorderItem[]> {
    const result = await this.findAll({
      filters: "isPreorder==true,active==true",
      sort: "createdAt",
      order: "desc",
    });
    return result.data;
  }

  async findFeaturedPreorders(): Promise<PreorderItem[]> {
    const result = await this.findAll({
      filters: "isPreorder==true,active==true,isFeatured==true",
      sort: "createdAt",
      order: "desc",
    });
    return result.data;
  }
}
