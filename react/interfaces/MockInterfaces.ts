
export interface ILoyaltyUserDataMock {
    nome: string;
    totalpontos: string;
    valorpontos: string;
    dataexpiracao: string;
}


export interface ILoyaltyUserDataMockApiResponse {
    ok: boolean;
    data: ILoyaltyUserDataMock;
}

export interface ILoyaltyCreateCupomDataResquest {
    cpfCnpj: string,
    discountValue: string,
}

export interface ILoyaltyCreatedCupomUserDataMock {
    nominalDiscountValue: string | number;
    totalValueFloor: string | number;
    coupon: string[];
    expiresAt: string;
    customer?: string;
}

export interface ILoyaltyCreatedCupomUserDataMockResponse {
    discountData:ILoyaltyCreatedCupomUserDataMock
}

export interface ILoyaltyCreatedCupomUserDataMockApiResponse {
    ok: boolean;
    response: ILoyaltyCreatedCupomUserDataMock;
}