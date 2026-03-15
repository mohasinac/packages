import { FirebaseSieveRepository } from "@mohasinac/db-firebase";
import type { CollectionItem } from "../types";

export class CollectionsRepository extends FirebaseSieveRepository<CollectionItem> {
  constructor() {
    super("curated_collections");
  }

  async findBySlug(slug: string): Promise<CollectionItem | null> {
    return this.findById(slug);
  }

  async findActive(): Promise<CollectionItem[]> {
    const result = await this.findAll({
      filters: "active==true",
      sort: "sortOrder",
      order: "asc",
    });
    return result.data;
  }
}
