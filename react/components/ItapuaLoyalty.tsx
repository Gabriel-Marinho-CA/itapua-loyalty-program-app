import React, { useCallback, useEffect, useState } from "react";
import LoyaltySearchManualCpf from "./view/LoyaltySearchManualCpf";
import { getLoyaltyUserData } from "../api/getUserData.loalty";
import { ILoyaltyUserDataApiResponse } from "../interfaces/ApiInterfaces";
import { LoyaltyUserDataView } from "./view/LoyaltyUserDataView";
import { getUserData } from "../api/getOrderForm.vtex";
import { LoyaltyCupomUserView } from "./view/LoyaltyCupomUserView";

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
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [getLoyaltyUserData]
  );

  useEffect(() => {
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
        <a
          href="/account#/"
          style={{
            color: "rgb(232, 19, 44)",
            display: "flex",
            textDecoration: "none",
            alignItems: "center",
            gap: ".25rem",
            marginBottom: "1rem",
          }}
        >
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 15.5002C5.75781 15.5002 5.92969 15.4169 6.10156 15.2502L11 10.5002L9.79687 9.33356L6.35938 12.6669L6.35938 0H4.64063L4.64062 12.6669L1.20312 9.33356L0 10.5002L4.89844 15.2502C5.07031 15.4169 5.24219 15.5002 5.5 15.5002Z"
              transform="translate(16.0002) rotate(90)"
              fill="currentColor"
            ></path>
          </svg>
          Voltar
        </a>
        {userDataApi && (
          <>
            <LoyaltyUserDataView loalty={userDataApi.loalty} />
            <LoyaltyCupomUserView
              orderFormId={orderForm.id}
              loalty={userDataApi.loalty}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ItapuaLoyalty;
