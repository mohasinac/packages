import type { TableColumn, ColumnExtensionOpts } from "@mohasinac/contracts";
import type { PreOrderItem } from "../types";

/**
 * Default admin columns for pre-order items.
 * Use `buildPreOrderColumns()` to customise via overrides / extras / omit.
 */
export const preOrderAdminColumns: TableColumn<PreOrderItem>[] = [
  {
    key: "customerEmail",
    header: "Customer",
    sortable: false,
  },
  {
    key: "productTitle",
    header: "Product",
    sortable: false,
  },
  {
    key: "quantity",
    header: "Qty",
    sortable: true,
  },
  {
    key: "totalAmount",
    header: "Total",
    sortable: true,
    render: (item) => `${item.currency ?? "INR"} ${item.totalAmount}`,
  },
  {
    key: "status",
    header: "Status",
    sortable: false,
  },
  {
    key: "estimatedFulfillmentDate",
    header: "Est. Ship",
    sortable: true,
  },
  {
    key: "depositPaid",
    header: "Deposit",
    sortable: false,
    render: (item) => (item.depositPaid ? "Paid" : "No"),
  },
  {
    key: "createdAt",
    header: "Ordered",
    sortable: true,
  },
];

/**
 * Factory that returns columns for the pre-orders admin table.
 *
 * @example
 * const cols = buildPreOrderColumns<MyPreOrderItem>({
 *   extras: [{ key: "customAttributes", header: "Custom", render: (p) => JSON.stringify(p.customAttributes) }],
 *   omit: ["depositPaid"],
 * });
 */
export function buildPreOrderColumns<T extends PreOrderItem = PreOrderItem>(
  opts?: ColumnExtensionOpts<T>
): TableColumn<T>[] {
  let base = preOrderAdminColumns as unknown as TableColumn<T>[];

  if (opts?.omit?.length) {
    base = base.filter((c) => !opts.omit!.includes(c.key as string));
  }

  if (opts?.overrides) {
    base = base.map((c) => {
      const override = (opts.overrides as Record<string, Partial<TableColumn<T>>>)[c.key as string];
      return override ? { ...c, ...override } : c;
    });
  }

  if (opts?.extras?.length) {
    base = [...base, ...opts.extras];
  }

  return base;
}
