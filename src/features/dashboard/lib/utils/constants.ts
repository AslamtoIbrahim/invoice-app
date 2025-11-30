export const defInvoice = {
  id: "7c6d7c8e-21f5-4a9e-9bfa-123456789abc",
  createdAt: new Date("2025-01-15T10:30:00Z"),
  updatedAt: new Date("2025-01-16T09:20:00Z"),
  code: "INV-2025-001",
  billFrom: {
    street: "123 Main Street",
    city: "Casablanca",
    postCode: "20000",
    country: "Morocco",
  },
  billTo: {
    name: "TechStore SARL TechStore SARL",
    email: "contact@techstore.ma",
    street: "45 Avenue Hassan II",
    city: "Rabat",
    postCode: "10000",
    country: "Morocco",
  },
  date: new Date("2025-01-20"),
  paymentTerm: "2025-09-20",
  status: "PAID" as const,
  description: "Purchase of electronics and accessories.",
  items: [
    {
      name: "Laptop Lenovo ThinkPad",
      qty: "2",
      price: "8500",
      _tempId: "temp-1"
    },
    {
      name: "Wireless Mouse Logitech",
      qty: "3",
      price: "250",
      _tempId: "temp-2"
    },
    {
      name: "HDMI Cable 2m",
      qty: "5",
      price: "40",
      _tempId: "temp-3"
    }
  ],
};
