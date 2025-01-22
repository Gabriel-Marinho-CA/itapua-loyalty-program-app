import React, { useState } from "react";
// import Modal from "vtex.styleguide/react/EXPERIMENTAL_Modal";

const ItapuaLoyaltyMock = () => {
  const [openToolTip, setOpenToolTip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [createCupom, setCreateCupom] = useState<boolean>(false);
  const [cuponInCart, setCuponInCart] = useState<boolean>(false);
  const [textcuponInCart, setTextCuponInCart] = useState<string>(
    "Cupom adicionado ao carrinho !"
  );

  console.log("0.0.259");

  // const handleModalToggle = () => {
  //   setIsModalOpen((prev) => !prev);
  // };
  const handleCupomModalState = () => {
    if (!createCupom) {
      setCreateCupom(true);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleAttachCoupomToCart = async () => {
    // setCuponInCart(true);
    // setTextCuponInCart("Erro ao adicionar cupom ao carrinho");
    const req = await fetch("/api/checkout/pub/orderForm");
    const orderForm = await req.json();

    const { orderFormId } = orderForm;
    console.log(orderFormId);

    if (!cuponInCart) {
      fetch(`/api/checkout/pub/orderForm/${orderFormId}/coupons`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "testeloyalty" }),
      }).then((res) => {
        if (res.ok) {
          setCuponInCart(true);
        } else {
          setTextCuponInCart("Erro ao adicionar cupom ao carrinho");
        }
      });
    }
  };

  const mock = {
    cpfcnpj: "xxx.xxx.xxx-xx",
    nome: "John Doe",
    totalpontos: "1462",
    valorpontos: "146.20",
    dataexpiracao: "2024-10-27T03:00:00.000Z",
  };

  const mockCupomGenerate = {
    customer: "xxx.xxx.xxx-xx",
    nominalDiscountValue: 146,
    totalValueFloor: 487,
    coupon: ["testeloyalty"],
    expiresAt: "2024-12-05T22:54:45.475Z",
  };

  const { totalpontos, valorpontos, nome, dataexpiracao } = mock;
  const {
    coupon,
    expiresAt,
    nominalDiscountValue,
    totalValueFloor,
  } = mockCupomGenerate;

  const date = new Date(dataexpiracao);

  const formattedDate = date.toLocaleDateString("pt-BR");

  const date2 = new Date(expiresAt);

  const formattedDate2 = date2.toLocaleDateString("pt-BR");

  return (
    <div>
      <div
        className="wrapper-loyaly-data"
        style={{ padding: "1.5rem", height: "auto" }}
      >
        <>
          <h1 style={{ marginBottom: "4rem" }}>
            🎉 Programa de Fidelidade Itapuã 🎉
          </h1>
          <h3 style={{ marginBottom: "2rem" }}>Bem-vindo(a), {nome}</h3>
          <div>
            <p>💳 Você possui {totalpontos} pontos</p>
            <p>
              💰 Isso equivale a{" "}
              <strong style={{ color: "#e8132c" }}>R${valorpontos}</strong>
            </p>
            <p>📅 Expiram em: {formattedDate}</p>
          </div>
        </>
      </div>

      <button
        onClick={handleCupomModalState}
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
        <p style={{ color: "red" }}>Expira em: {formattedDate2}</p>
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

        {cuponInCart && <p style={{ color: 'green',marginTop:'1rem'}}>{textcuponInCart}</p>}
      </div>
    </div>
  );
};

export default ItapuaLoyaltyMock;
