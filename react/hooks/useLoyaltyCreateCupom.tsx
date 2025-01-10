import { useEffect, useState } from "react";
import {
  ILoyaltyCreateCupomDataResquest,
  ILoyaltyCreatedCupomUserDataMock,
  ILoyaltyCreatedCupomUserDataMockApiResponse,
  ILoyaltyCreatedCupomUserDataMockResponse,
} from "../interfaces/MockInterfaces";

export function useLoyaltyCreateCupom(data: ILoyaltyCreateCupomDataResquest) {
  const [
    loyaltyCupomGenerate,
    setLoyaltyCupomGenerate,
  ] = useState<ILoyaltyCreatedCupomUserDataMock | null>(null);

  const [apiCupomLoading, setApiCupomLoading] = useState<boolean>(true);
  const [apiCupomError, setApiCupomError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setApiCupomLoading(true);
      setApiCupomError(null);
      try {
        const req = await createLoyaltyCupomMock();

        if (req.ok) {
          setLoyaltyCupomGenerate(req.response);
        } else {
          throw new Error("Erro na resposta da API");
        }
      } catch (error) {
        setApiCupomError(error.message || "Erro ao buscar dados");
      } finally {
        setApiCupomLoading(false);
      }
    };

    if (data) {
      fetchData();
    } else {
      setApiCupomLoading(false);
    }
  }, [data]);

  return {
    loyaltyCupomGenerate,
    apiCupomLoading,
    apiCupomError,
  };
  //   createLoyaltyCupom(data);
}

async function createLoyaltyCupomMock() {
  const mock: ILoyaltyCreatedCupomUserDataMockResponse = {
    discountData: {
      customer: "087.442.787-80",
      nominalDiscountValue: 146,
      totalValueFloor: 487,
      coupon: ["ca08in80"],
      expiresAt: "2024-12-05T22:54:45.475Z",
    },
  };

  const date = new Date(mock.discountData.expiresAt);

  const formattedDate = date.toLocaleDateString("pt-BR");

  const formattedCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const nominalFormatted = formattedCurrency.format(
    mock.discountData.nominalDiscountValue as number
  );
  const totalValueFloorFormatted = formattedCurrency.format(
    mock.discountData.totalValueFloor as number
  );

  const formattedMock = {
    nominalDiscountValue: nominalFormatted,
    totalValueFloor: totalValueFloorFormatted,
    coupon: ["ca08in80"],
    expiresAt: formattedDate,
  };

  const apiResponse: ILoyaltyCreatedCupomUserDataMockApiResponse = {
    ok: true,
    response: formattedMock,
  };
  return apiResponse;
}

// async function createLoyaltyCupom(data) {
//   const url = `http://apitp.itapua.etc.br/createPromotion`;

//   const headers = {
//     "Itp-Api-Apptoken":
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEc19UZXJjZWlybyI6IlJlc3VsdGF0ZSIsImlhdCI6MTczMDI5ODg2Nn0.WwLbY_h_xSwNQiP-Fy584uMUrsN-YNJv86pda33KUUc",
//   };

//   // 087.442.787-80
//   try {
//     const request = await fetch(url, {
//       headers: headers,
//       method: "POST",
//       body: JSON.stringify(data),
//     });

//     const response = await request.json();

//     if (!response.ok) throw new Error("Error calling loyalty api");
//     return response;
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }
