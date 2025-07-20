export const status = {
  listed: "listed",
  sold: "sold",
  canceled: "canceled",
} as const;

export const statusToText = {
  listed: "anunciado",
  sold: "vendido",
  canceled: "cancelado",
};

export const statusOptions = [
  { value: "listed", label: "Anunciado" },
  { value: "sold", label: "Vendido" },
  { value: "canceled", label: "Cancelado" },
];

export const category = {
  toy: "toy",
  furniture: "furniture",
  stationery: "stationery",
  health_beauty: "health_beauty",
  utensil: "utensil",
  clothing: "clothing",
} as const;

export const categoryToText = {
  toy: "Brinquedo",
  furniture: "Móvel",
  stationery: "Papelaria",
  health_beauty: "Saúde & Beleza",
  utensil: "Utensílio",
  clothing: "Vestuário",
};

export const categoryOptions = [
  { value: "toy", label: "Brinquedo" },
  { value: "furniture", label: "Móvel" },
  { value: "stationery", label: "Papelaria" },
  { value: "health_beauty", label: "Saúde & Beleza" },
  { value: "utensil", label: "Utensílio" },
  { value: "clothing", label: "Vestuário" },
];
