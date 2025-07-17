export type StoreData = {
  ID: number;
  Name: string;
  Address: string;
  BusinessStartTime: string;
  BusinessEndTime: string;
  Details: { String: string; Valid: boolean };
  CreatedAt: string;
};

export type StoreInfo = {
  name: string;
  address: string;
  businessHours: string;
  details: string;
};
