import React, { Dispatch, useState } from "react";
import { Modal } from "vtex.styleguide";
import { ILoyaltyCreatedCupomUserDataMock } from "../../interfaces/MockInterfaces";


interface ILoyaltyCupomUser {
  loyaltyCupomGenerate:ILoyaltyCreatedCupomUserDataMock ;
  handleAttachCoupomToCart: () => void;
  cuponInCart: boolean;
  textcuponInCart: string;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

export function LoyaltyCupomUserView({
  loyaltyCupomGenerate,
  handleAttachCoupomToCart,
  cuponInCart,
  textcuponInCart,
  setIsModalOpen,
  isModalOpen,
}: ILoyaltyCupomUser) {
  const [openToolTip, setOpenToolTip] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const {
    nominalDiscountValue,
    totalValueFloor,
    coupon,
    expiresAt,
  } = loyaltyCupomGenerate;

  return (
    <Modal centered isOpen={isModalOpen} onClose={handleModalToggle}>
      <div>
        <h3 style={{ color: "green", marginBottom: "2rem" }}>
          Cupom gerado com sucesso!
        </h3>
        <p>
          Use{" "}
          <strong
            onClick={() => {
              navigator.clipboard.writeText(coupon[0]);
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
            {coupon[0]}
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
          Desconto de {nominalDiscountValue} para uma compra mínima de{" "}
          <strong> {totalValueFloor}</strong>
        </p>
        <p style={{ color: "red" }}>Expira em: {expiresAt}</p>
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

        {cuponInCart && <p>{textcuponInCart}</p>}
      </div>
    </Modal>
  );
}
