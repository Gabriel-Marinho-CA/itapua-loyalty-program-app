export interface ILoyaltyUserData {
    cpfcnpj: string;
    nome: string;
    totalpontos: string;
    valorpontos: string;
    dataexpiracao: string;
}

export interface ILoyaltyNotFoundUserData {
    message: string;
}

export interface ILoyaltyUserDataApiResponse {
    loalty: ILoyaltyUserData & ILoyaltyNotFoundUserData
}

export interface ILoyaltyCreateCupomData {
    cpfCnpj: string;
    discountValue: string | number;
}

export interface ILoyaltyCreatedCupomUserData {
    customer: string;
    nominalDiscountValue: string;
    totalValueFloor: string;
    coupon: string[];
    expiresAt: string;
}

export interface ILoyaltyCupomGenerateUser {
    discountData: ILoyaltyCreatedCupomUserData;
}

