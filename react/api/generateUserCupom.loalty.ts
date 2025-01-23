import { ILoyaltyCreateCupomData, ILoyaltyCupomGenerateUser } from "../interfaces/ApiInterfaces";

export async function generateUserCupom(data: ILoyaltyCreateCupomData): Promise<ILoyaltyCupomGenerateUser> {
    const url = `https://api.itapua.etc.br/createPromotion`;

    const headers = {
        "Itp-Api-Apptoken":
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEc19UZXJjZWlybyI6IlJlc3VsdGF0ZSIsImlhdCI6MTczMDI5ODg2Nn0.WwLbY_h_xSwNQiP-Fy584uMUrsN-YNJv86pda33KUUc",
            "Content-Type":"application/json"
    };
    try {
        const request = await fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data),
        });

        const response = await request.json();
        return response;

    } catch (error) {
        console.error(error);
        throw new Error("Error generating cupom [loyalty api]");
    }
}
