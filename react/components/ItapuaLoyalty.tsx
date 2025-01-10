import React, { useEffect, useState } from "react";
// @ts-ignore
import UserDataLoyalty from "./UserDataLoyalty";
// @ts-ignore
import { CupomDataLoyalty } from "./CupomDataLoyalty";

import { ContentWrapper } from "vtex.my-account-commons";
import { ILoyaltyUserDataMock } from "../interfaces/MockInterfaces";

const ItapuaLoyalty = () => {
  const [userDataApi, setUserDataApi] = useState<any | ILoyaltyUserDataMock | null>(
    null
  );
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(false);

  // GET USER DOCUMENT - CPF

  useEffect(() => {
    async function getUserData() {
      try {
        const request = await fetch("/api/checkout/pub/orderForm");
        const response = await request.json();

        if (response.ok) {
          setIsLoading(false);

          setUserDataApi(response);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getUserData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error retriving data...</p>;

  // const cpf = userDataApi.profileData?.profile?.customFields[0].value || null;
  const cpf = userDataApi.clientProfileData.document || null;

  if (!cpf)
    return (
      <>
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
      </>
    );

  return (
    <ContentWrapper titleId="Loyalty Program" namespace="itapua-loyalty">
      {() => (
        <div style={{ height: "100%" }}>
          {cpf && (
            <div
              className="wrapper-loyaly-data"
              style={{ padding: "1.5rem", height: "100%" }}
            >
              <UserDataLoyalty cpf={cpf} setUserDataApi={setUserDataApi} />
              {userDataApi && (
                <CupomDataLoyalty cpf={cpf} userDataApi={userDataApi} />
              )}
            </div>
          )}
        </div>
      )}
    </ContentWrapper>
  );
};

export default ItapuaLoyalty;
