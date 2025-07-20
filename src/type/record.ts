export type ReservedInfo = {
  reservedId: number;
  reservedAt: string;
  visitDate: string;
  storeId: number;
  storeName: string;
};

export type ReservedData = {
  ID: number;
  UserID: number;
  StoreID: number;
  StoreName: string;
  VisitDate: string;
  ReservedAt: string;
};

export type AdminReservedData = {
  ID: number;
  UserId: number;
  StoreID: number;
  VisitDate: string;
  ReservedAt: string;
  StoreName: string;
  UserName: string;
};