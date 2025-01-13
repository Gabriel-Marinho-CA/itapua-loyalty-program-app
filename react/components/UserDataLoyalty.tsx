import React, { Dispatch, SetStateAction, useEffect } from "react";
import { LoyaltyUserDataView } from "./view/LoyaltyUserDataView";
// import { useLoyaltyApi } from "../hooks/useLoyaltyApi";
import { ILoyaltyUserDataMock } from "../interfaces/MockInterfaces";

interface IUserData {
  cpf: string;
  setUserDataApi: Dispatch<SetStateAction<ILoyaltyUserDataMock | null>>;
}

export default function UserDataLoyalty({ cpf, setUserDataApi }: IUserData) {
  // const { loyaltyUserData, apiLoading, apiError } = useLoyaltyApi(cpf);
  console.log("dataLoyaly", cpf);

  const loyaltyUserData = {
    // cpfcnpj: "087.442.787-80",
    cpfcnpj: "xxx.xxx.xxx-xx",
    // nome: "CARLOS EDUARDO KLEIN",
    nome: "XXXX",
    totalpontos: "1462",
    valorpontos: "146.20",
    dataexpiracao: "2024-10-27T03:00:00.000Z",
  };

  // useEffect(() => {
  //   if (loyaltyUserData) setUserDataApi(loyaltyUserData);
  // }, [loyaltyUserData]);
  useEffect(() => {
    setUserDataApi(loyaltyUserData);
  }, [cpf]);

  // if (apiLoading) return <p>Loading data...</p>;
  // if (apiError) return <p>Error retriving data...</p>;
  if (!loyaltyUserData)
    return (
      <h1
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem",
        }}
      >
        Você não participa do programa de fidelidade
        <a href="#">Saiba mais.</a>
      </h1>
    );

  return loyaltyUserData && <LoyaltyUserDataView loalty={loyaltyUserData} />;
}
