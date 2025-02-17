import { ILoyaltyUserDataApiResponse } from "../interfaces/ApiInterfaces";

export async function getLoyaltyUserData(cpf: string): Promise<ILoyaltyUserDataApiResponse>{
    const url = `https://api.itapua.etc.br/searchLoality?cpfCnpj=${cpf}`;

    const headers = {
        "Itp-Api-Apptoken":
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEc19UZXJjZWlybyI6IlJlc3VsdGF0ZSIsImlhdCI6MTczMDI5ODg2Nn0.WwLbY_h_xSwNQiP-Fy584uMUrsN-YNJv86pda33KUUc",
    };
    try {
        const request = await fetch(url, { headers: headers });
        const response = await request.json();
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}