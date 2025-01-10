import { useEffect, useState } from "react";
import {
  ILoyaltyUserDataMock,
  ILoyaltyUserDataMockApiResponse,
} from "../interfaces/MockInterfaces";

export function useLoyaltyApi(cpf: string) {
  const [
    loyaltyUserData,
    setLoyaltyUserData,
  ] = useState<ILoyaltyUserDataMock | null>(null);

  const [apiLoading, setApiLoading] = useState<boolean>(true);

  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setApiLoading(true);
      setApiError(null);
      try {
        const req = await getLoyaltyUserDataMock();

        if (req.ok) {
          setLoyaltyUserData(req.data);
        } else {
          throw new Error("Erro na resposta da API");
        }
      } catch (error) {
        setApiError(error.message || "Erro ao buscar dados");
      } finally {
        setApiLoading(false);
      }
    };

    if (cpf) {
      fetchData();
    } else {
      setApiLoading(false);
    }
  }, [cpf]);

  return {
    loyaltyUserData,
    apiLoading,
    apiError,
  };
}

async function getLoyaltyUserDataMock(): Promise<
  ILoyaltyUserDataMockApiResponse
> {
  const mock = {
    loalty: {
      cpfcnpj: "087.442.787-80",
      nome: "CARLOS EDUARDO KLEIN",
      totalpontos: "1462",
      valorpontos: "146.20",
      dataexpiracao: "2024-10-27T03:00:00.000Z",
    },
  };

  const date = new Date(mock.loalty.dataexpiracao);

  const formattedDate = date.toLocaleDateString("pt-BR");

  const formattedCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(mock.loalty.valorpontos));

  const formattedMock: ILoyaltyUserDataMock = {
    nome: "CARLOS EDUARDO KLEIN",
    totalpontos: "1462",
    valorpontos: formattedCurrency,
    dataexpiracao: formattedDate,
  };

  const apiResponse: ILoyaltyUserDataMockApiResponse = {
    ok: true,
    data: formattedMock,
  };

  return apiResponse;
}

// async function getLoyaltData(cpf: string) {
//   const url = `http://apitp.itapua.etc.br/searchLoality?cpfCnpj=${cpf}`;

//   const headers = {
//     "Itp-Api-Apptoken":
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEc19UZXJjZWlybyI6IlJlc3VsdGF0ZSIsImlhdCI6MTczMDI5ODg2Nn0.WwLbY_h_xSwNQiP-Fy584uMUrsN-YNJv86pda33KUUc",
//   };
//   // 08744278780
//   try {
//     const request = await fetch(url, { headers: headers });
//     const response = await request.json();

//     if (!response.ok) throw new Error("Error calling loyalty api");
//     return response;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }
