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
	id:number;
  name: string;
  address: string;
  businessHours: string;
  details: string;
};
