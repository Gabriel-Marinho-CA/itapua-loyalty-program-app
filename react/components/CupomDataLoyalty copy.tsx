// import React, { useState } from "react";
// // import { useLoyaltyCreateCupom } from "../hooks/useLoyaltyCreateCupom";
// import { LoyaltyCupomUserView } from "./view/LoyaltyCupomUserView";
// import {
//   // ILoyaltyCreatedCupomUserDataMockResponse,
//   ILoyaltyUserDataMock,
// } from "../interfaces/MockInterfaces";

// interface ICupomData {
//   cpf: string;
//   userDataApi: ILoyaltyUserDataMock;
//   orderForm: any;
// }

// export function CupomDataLoyalty({ cpf, userDataApi, orderForm }: ICupomData) {
//   const [cuponInCart, setCuponInCart] = useState<boolean>(false);
//   const [createCupom, setCreateCupom] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [textcuponInCart, setTextCuponInCart] = useState<string>(
//     "Cupom adicionado ao carrinho !"
//   );

//   console.log("CupomDataLoyalty:", cpf, userDataApi);

//   const handleAttachCoupomToCart = () => {
//   };
  
//   if (res.ok) {
//     setCuponInCart(true);
//   } else {
//     setTextCuponInCart("Erro ao adicionar cupom ao carrinho");
//   }
//   const handleCupomModalState = () => {
//     if (!createCupom) {
//       setCreateCupom(true);
//       setIsModalOpen(true);
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={handleCupomModalState}
//         style={{
//           marginTop: "1.5rem",
//           background: "#e8132c",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer",
//           borderRadius: "6px",
//           padding: ".5rem 1rem",
//         }}
//         className="renerate-cupom"
//       >
//         {createCupom ? "ABRIR CUPOM" : "GERAR CUPOM"}
//       </button>
//       {loyaltyCupomGenerate && isModalOpen && (
//         <LoyaltyCupomUserView
//           loyaltyCupomGenerate={loyaltyCupomGenerate}
//           cuponInCart={cuponInCart}
//           handleAttachCoupomToCart={handleAttachCoupomToCart}
//           textcuponInCart={textcuponInCart}
//           setIsModalOpen={setIsModalOpen}
//           isModalOpen={isModalOpen}
//         />
//       )}
//     </>
//   );
// }
