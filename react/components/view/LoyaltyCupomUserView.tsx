import React, { useState } from "react";
import { attachCoupomToCart } from "../../api/attachCupom.vtex";
import {
  ILoyaltyCupomGenerateUser,
  ILoyaltyUserData,
} from "../../interfaces/ApiInterfaces";
import { generateUserCupom } from "../../api/generateUserCupom.loalty";

interface IProps {
  orderFormId: string | number;
  loalty: ILoyaltyUserData;
}

export const LoyaltyCupomUserView = ({ orderFormId, loalty }: IProps) => {
  const [openToolTip, setOpenToolTip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [createCupom, setCreateCupom] = useState<boolean>(false);
  const [cuponInCart, setCuponInCart] = useState<boolean>(false);
  const [textcuponInCart] = useState<string>("Cupom adicionado ao carrinho !");
  const [
    cupomUserData,
    setCupomUserData,
  ] = useState<ILoyaltyCupomGenerateUser | null>(null);

  const handleCupomModalState = () => {
    if (!createCupom) {
      setCreateCupom(true);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleGenerateCupom = async () => {
    const data = {
      cpfCnpj: loalty.cpfcnpj,
      discountValue: loalty.valorpontos,
    };

    const generateCupom = await generateUserCupom(data);
    console.log(generateCupom)
    setCupomUserData(generateCupom);
  };

  const handleAttachCoupomToCart = async () => {
    await attachCoupomToCart(
      orderFormId,
      cuponInCart,
      cupomUserData?.discountData.coupon[0]
    );

    setCuponInCart(true);
  };

  return (
    <div>
      <button
        onClick={createCupom ? handleCupomModalState : handleGenerateCupom}
        style={{
          marginLeft: "1.5rem",
          marginTop: "1.5rem",
          background: "#e8132c",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "6px",
          padding: ".5rem 1rem",
        }}
        className="renerate-cupom"
      >
        {createCupom ? "ABRIR CUPOM" : "GERAR CUPOM"}
      </button>
      <div
        style={{
          display: isModalOpen ? "block" : "none",
          zIndex: 2,
          top: "50%",
          left: "50%",
          width: "90%",
          maxWidth: "400px",
          position: "fixed",
          background: "#fff",
          padding: "2rem",
          borderRadius: "4px",
          boxShadow: "0px 3px 6px #cecece",
          border: "1px solid rgb(206, 206, 206)",
          transform: "translate(-50%,-50%)",
        }}
      >
        <button
          style={{
            fontSize: "15px",
            color: "red",
            fontWeight: "bold",
            textAlign: "end",
            display: "block",
            width: "100%",
            fontFamily: "cursive",
            border: "none",
            background: "none",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          X
        </button>
        <h3 style={{ color: "green", marginBottom: "2rem" }}>
          Cupom gerado com sucesso!
        </h3>
        <p>
          Use{" "}
          <strong
            onClick={() => {
              navigator.clipboard.writeText(
                cupomUserData?.discountData.coupon[0] as string
              );
              setOpenToolTip(true);
              setTimeout(() => {
                setOpenToolTip(false);
              }, 2500);
            }}
            style={{
              border: "2px dashed #e8132c",
              padding: ".2rem 1rem",
              color: "#e8132c",
              backgroundColor: "#fde6e6",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {cupomUserData?.discountData.coupon[0]}
            {openToolTip && (
              <span
                style={{
                  position: "absolute",
                  top: "-25px",
                  color: "#fff",
                  backgroundColor: "#000",
                  padding: "0.2rem",
                  fontSize: "13px",
                  borderRadius: "2px",
                }}
              >
                Copiado!
              </span>
            )}
          </strong>{" "}
          para ganhar desconto.
        </p>
        <p>
          Desconto de {cupomUserData?.discountData.nominalDiscountValue} para
          uma compra mínima de{" "}
          <strong> {cupomUserData?.discountData.totalValueFloor}</strong>
        </p>

        <p style={{ color: "red" }}>
          Expira em:{" "}
          {new Date(
            cupomUserData?.discountData.expiresAt as string
          ).toLocaleDateString("pt-BR")}
        </p>
        <button
          style={{
            marginTop: "1.5rem",
            background: "#e8132c",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
            padding: ".5rem 1rem",
          }}
          onClick={handleAttachCoupomToCart}
        >
          Adicionar cupom ao carrinho
        </button>

        {cuponInCart && (
          <p style={{ color: "green", marginTop: "1rem" }}>{textcuponInCart}</p>
        )}
      </div>
    </div>
  );
};
