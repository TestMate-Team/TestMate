export interface AppData {
  id: number;
  title: string;
  shortDescription: string;
  longDescription?: string;
  iconUrl: string;
  screenshots?: string[];
  groupUrl?: string;
  storeUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
