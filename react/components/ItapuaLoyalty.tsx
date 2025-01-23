import React, { useCallback, useEffect, useState } from "react";
import LoyaltySearchManualCpf from "./view/LoyaltySearchManualCpf";
import { getLoyaltyUserData } from "../api/getUserData.loalty";
import { ILoyaltyUserDataApiResponse } from "../interfaces/ApiInterfaces";
import { LoyaltyUserDataView } from "./view/LoyaltyUserDataView";
import { getUserData } from "../api/getOrderForm.vtex";
import { LoyaltyCupomUserView } from "./view/LoyaltyCupomUserView";
// import { CupomDataLoyalty } from "./CupomDataLoyalty copy";

const ItapuaLoyalty = () => {
  const [
    userDataApi,
    setUserDataApi,
  ] = useState<ILoyaltyUserDataApiResponse | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [showManualInput, setShowManualInput] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //@ts-ignore
  const [cpf, setCpf] = useState<string | null>(null);
  const [orderForm, setOrderForm] = useState<any>(null);

  const fetchLoyaltyData = useCallback(
    async (cpf: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getLoyaltyUserData(cpf);
        if ("message" in response.loalty) {
          setError(
            "Cliente não encontrado ou nenhum ponto de fidelidade disponível."
          );
        } else {
          setError(null);
          setShowManualInput(false);
          setUserDataApi(response);
        }
      } catch (err) {
        setError("Erro ao buscar dados de fidelidade.");
        console.error("Erro na requisição getLoyaltyUserData:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [getLoyaltyUserData]
  );

  useEffect(() => {
    console.log("v0.0.269");
    const fetchOrderFormDataAndInitialLoyaltyData = async () => {
      try {
        const orderFormResponse = await getUserData();
        setOrderForm(orderFormResponse);

        const initialCpf = orderFormResponse?.clientProfileData?.document;
        setCpf(initialCpf || null);

        if (!initialCpf || initialCpf.includes("*")) {
          setShowManualInput(true);
        } else {
          fetchLoyaltyData(initialCpf);
        }
        setIsLoading(false);
      } catch (error) {
        setError("Erro ao buscar dados do formulário de pedido.");
        console.error("Erro na requisição getUserData:", error);
        setIsLoading(false);
      }
    };

    fetchOrderFormDataAndInitialLoyaltyData();
  }, [fetchLoyaltyData]);

  useEffect(() => {
    console.log(userDataApi);
  }, [userDataApi]);

  const searchCpfManual = async (manualCpf: string) => {
    fetchLoyaltyData(manualCpf);
  };

  if (loading) return <p>Carregando...</p>;

  if (error)
    return <h2 style={{ color: "red", padding: "1.5rem" }}>{error}</h2>;

  if (showManualInput)
    return <LoyaltySearchManualCpf searchCpfManual={searchCpfManual} />;

  return (
    <div style={{ height: "auto" }}>
      <div
        className="wrapper-loyaly-data"
        style={{ padding: "1.5rem", height: "auto" }}
      >
        {userDataApi && (
          <>
            <LoyaltyUserDataView loalty={userDataApi.loalty} /> 
            <LoyaltyCupomUserView orderFormId={orderForm.id}  loalty={userDataApi.loalty}/>
          </>
        )}
      </div>
    </div>
  );
};

export default ItapuaLoyalty;
