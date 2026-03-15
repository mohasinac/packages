import type { FeatureManifest } from "@mohasinac/contracts";

export const manifest: FeatureManifest = {
  name: "preorders",
  i18nNamespace: "preorders",
  envKeys: [],
  routes: [
    { segment: "[locale]/preorders", exports: { default: "PreordersPageView" } },
    { segment: "[locale]/preorders/[slug]", exports: { default: "PreorderDetailPage" } },
    { segment: "[locale]/admin/preorders", exports: { default: "AdminPreordersView" }, adminOnly: true },
  ],
  apiRoutes: [
    { segment: "api/preorders", methods: ["GET"] },
    { segment: "api/preorders/[slug]", methods: ["GET"] },
  ],
};
