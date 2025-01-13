import React, { useState } from "react";
// import { useLoyaltyCreateCupom } from "../hooks/useLoyaltyCreateCupom";
import { OrderForm } from "vtex.order-manager";
import { LoyaltyCupomUserView } from "./view/LoyaltyCupomUserView";
import {
  // ILoyaltyCreatedCupomUserDataMockResponse,
  ILoyaltyUserDataMock,
} from "../interfaces/MockInterfaces";

interface ICupomData {
  cpf: string;
  userDataApi: ILoyaltyUserDataMock;
}

export function CupomDataLoyalty({ cpf, userDataApi }: ICupomData) {
  const [cuponInCart, setCuponInCart] = useState<boolean>(false);
  const [createCupom, setCreateCupom] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [textcuponInCart, setTextCuponInCart] = useState<string>(
    "Cupom adicionado ao carrinho !"
  );

  const { useOrderForm } = OrderForm;
  const { orderForm } = useOrderForm();

  console.log("CupomDataLoyalty:", cpf, userDataApi);
  // const { totalpontos } = userDataApi;

  // const userData = useMemo(
  //   () => ({
  //     cpfCnpj: cpf,
  //     discountValue: totalpontos,
  //   }),
  //   [cpf, totalpontos]
  // );

  // const {
  //   loyaltyCupomGenerate,
  //   apiCupomLoading,
  //   apiCupomError,
  // } = useLoyaltyCreateCupom(userData);

  const loyaltyCupomGenerate = {
    customer: "xxx.xxx.xxx-xx",
    nominalDiscountValue: 146,
    totalValueFloor: 487,
    coupon: ["ca08in80"],
    expiresAt: "2024-12-05T22:54:45.475Z",
  };

  // if (apiCupomLoading) return <p>Loading data...</p>;
  // if (apiCupomError) return <p>Error retriving data...</p>;

  const handleAttachCoupomToCart = () => {
    const { id } = orderForm;
    if (!cuponInCart) {
      fetch(`/api/checkout/pub/orderForm/${id}/coupons`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "isasaturno10" }),
      }).then((res) => {
        if (res.ok) {
          setCuponInCart(true);
        } else {
          setTextCuponInCart("Erro ao adicionar cupom ao carrinho");
        }
      });
    }
  };

  const handleCupomModalState = () => {
    if (!createCupom) {
      setCreateCupom(true);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleCupomModalState}
        style={{
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
      {loyaltyCupomGenerate && isModalOpen && (
        <LoyaltyCupomUserView
          loyaltyCupomGenerate={loyaltyCupomGenerate}
          cuponInCart={cuponInCart}
          handleAttachCoupomToCart={handleAttachCoupomToCart}
          textcuponInCart={textcuponInCart}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
}
