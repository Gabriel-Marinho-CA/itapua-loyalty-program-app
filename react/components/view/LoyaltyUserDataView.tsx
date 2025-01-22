import React from "react";
import { ILoyaltyUserData } from "../../interfaces/ApiInterfaces";

interface ILoyaltyUserDataView {
  loalty: ILoyaltyUserData;
}

export function LoyaltyUserDataView({ loalty }: ILoyaltyUserDataView) {
  const { nome, totalpontos, valorpontos, dataexpiracao } = loalty;
  console.log("LoyaltyUserDataView:", loalty);

  return (
    <>
      <h1 style={{ marginBottom: "4rem" }}>
        🎉 Programa de Fidelidade Itapuã 🎉
      </h1>
      <h3 style={{ marginBottom: "2rem" }}>Bem-vindo(a), {nome}</h3>
      <div>
        <p>💳 Você possui {totalpontos} pontos</p>
        <p>
          💰 Isso equivale a{" "}
          <strong style={{ color: "#e8132c" }}>{valorpontos}</strong>
        </p>
        <p>📅 Expiram em: {dataexpiracao}</p>
      </div>
    </>
  );
}
