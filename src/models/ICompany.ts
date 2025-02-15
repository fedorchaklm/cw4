import {IAddress} from "@/models/IAddress";

export interface ICompany {
    department: string;
    name: string;
    title: string;
    address: IAddress;
    country: string;
}