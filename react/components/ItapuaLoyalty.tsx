import React, { useEffect, useState } from "react";
import UserDataLoyalty from "./UserDataLoyalty";
import { CupomDataLoyalty } from "./CupomDataLoyalty";

// import { ContentWrapper } from "vtex.my-account-commons";
import { ILoyaltyUserDataMock } from "../interfaces/MockInterfaces";

const ItapuaLoyalty = () => {
  const [userDataApi, setUserDataApi] = useState<
    any | ILoyaltyUserDataMock | null
  >(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);
  const [cpf, setCpf] = useState<null | string>(null);

  // GET USER DOCUMENT - CPF

  useEffect(() => {
    async function getUserData() {
      try {
        const request = await fetch("/api/checkout/pub/orderForm");
        const response = await request.json();

        if (request.ok) {
          setIsLoading(false);
          setUserDataApi(response);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (userDataApi) {
      setCpf(userDataApi?.clientProfileData?.document);
    }
  }, [userDataApi]);

  useEffect(() => {
    console.log("CPF4: ", cpf);
  }, [cpf]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error retriving data...</p>;

  if (!cpf)
    return (
      <div style={{ display: cpf ? "none" : "block" }}>
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
          CPF não encontrado,
          <a style={{ display: "block " }} href="/account#/profile">
            por favor cadastre seu cpf
          </a>{" "}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p>Caso ja tenha se cadastrado </p>
          <button
            style={{
              background: "#e8132c",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              borderRadius: "6px",
              padding: ".5rem 1rem",
            }}
            onClick={() => window.location.reload()}
          >
            Recarregue a página
          </button>
        </div>
      </div>
    );

  return (
    <div style={{ height: "100%" }}>
      <div
        className="wrapper-loyaly-data"
        style={{ padding: "1.5rem", height: "100%" }}
      >
        <UserDataLoyalty cpf={cpf} setUserDataApi={setUserDataApi} />
         {userDataApi && (
          <CupomDataLoyalty cpf={cpf} userDataApi={userDataApi} />
        )}  
      </div>
    </div>
  );
};

export default ItapuaLoyalty;
