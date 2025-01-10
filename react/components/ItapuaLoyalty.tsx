import React, { useState } from "react";
import UserDataLoyalty from "./UserDataLoyalty";
import { useQuery } from "react-apollo";
import { CupomDataLoyalty } from "./CupomDataLoyalty";
import PROFILE from "../graphql/getSession.gql";
import { ContentWrapper } from "vtex.my-account-commons";
import { ILoyaltyUserDataMock } from "../interfaces/MockInterfaces";

const ItapuaLoyalty = () => {

  const [userDataApi, setUserDataApi] = useState<ILoyaltyUserDataMock | null>(null);

  // GET USER DOCUMENT - CPF
  const { data: profileData, loading, error } = useQuery(PROFILE);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error retriving data...</p>;

  const cpf = profileData?.profile?.customFields[0].value || null;

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
    </ContentWrapper>
  );
};

export default ItapuaLoyalty;
