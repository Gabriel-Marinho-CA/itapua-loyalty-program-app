import React, { useState } from "react";

interface IProps {
  searchCpfManual: (cpf: string) => void;
}

const LoyaltySearchManualCpf = ({ searchCpfManual }: IProps) => {
  const [cpfManual, setCpfManual] = useState<string>("");

  const cpfMaskFormatter = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    const formattedValue = numericValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpfManual(formattedValue);
  };

  return (
    <div style={{ paddingInline: "1.5rem" }}>
      <h1
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem 0",
        }}
      >
        Não encontramos um CPF associado à sua conta.
      </h1>
      <p>
        Por favor, insira seu CPF abaixo para verificarmos seus pontos do
        programa de fidelidade.
      </p>
      <a
        style={{ display: "block", textDecoration: "none", color: "blue" }}
        href="/account#/profile"
      >
        Ou atualize seu cadastro.{" "}
        <span style={{ color: "#000", fontSize: "12px" }}>
          (pode demorar um tempo para atualizar o sistema)
        </span>
      </a>{" "}
      <div
        style={{
          marginTop: "1.4rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          style={{
            border: "1px solid #000",
            borderRadius: "4px",
            padding: ".25rem 1rem",
          }}
          type="text"
          placeholder="Digite seu CPF"
          maxLength={14}
          onChange={(ev) => cpfMaskFormatter(ev.target.value)}
          value={cpfManual}
        />
        <button
          onClick={() =>
            cpfManual.length == 14
              ? searchCpfManual(cpfManual)
              : alert("cpf inválido")
          }
          style={{
            background: "#e8132c",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            padding: ".5rem 1rem",
          }}
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
};

export default LoyaltySearchManualCpf;
