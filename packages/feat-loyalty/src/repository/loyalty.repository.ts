import { FirebaseRepository, getAdminDb } from "@mohasinac/db-firebase";
import type { LoyaltyBalance, CoinHistoryEntry } from "../types";

export class LoyaltyRepository extends FirebaseRepository<LoyaltyBalance> {
  constructor() {
    super("users");
  }

  async getBalance(uid: string): Promise<LoyaltyBalance | null> {
    return this.findById(uid);
  }

  async addCoins(
    uid: string,
    delta: number,
    entry: Omit<CoinHistoryEntry, "timestamp">,
  ): Promise<void> {
    const db = getAdminDb();
    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();
    if (!snap.exists) return;
    const current = (snap.data()?.hcCoins as number) ?? 0;
    const history = (snap.data()?.coinHistory as CoinHistoryEntry[]) ?? [];
    await ref.update({
      hcCoins: current + delta,
      coinHistory: [
        ...history,
        { ...entry, delta, timestamp: new Date().toISOString() },
      ],
    });
  }
}
