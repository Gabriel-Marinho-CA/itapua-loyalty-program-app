import React from "react";
import { ILoyaltyUserDataMock } from "../../interfaces/MockInterfaces";

interface ILoyaltyUserDataView {
  loalty: ILoyaltyUserDataMock;
}

export function LoyaltyUserDataView({ loalty }: ILoyaltyUserDataView) {
  const { nome, totalpontos, valorpontos, dataexpiracao } = loalty;

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
