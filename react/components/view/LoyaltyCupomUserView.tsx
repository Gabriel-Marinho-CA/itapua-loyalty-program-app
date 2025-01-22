// import React, { Dispatch, useState } from "react";
// import { ILoyaltyCreatedCupomUserDataMock } from "../../interfaces/MockInterfaces";

// interface ILoyaltyCupomUser {
//   loyaltyCupomGenerate: ILoyaltyCreatedCupomUserDataMock;
//   handleAttachCoupomToCart: () => void;
//   cuponInCart: boolean;
//   textcuponInCart: string;
//   setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
//   isModalOpen: boolean;
// }

// export function LoyaltyCupomUserView({
//   loyaltyCupomGenerate,
//   handleAttachCoupomToCart,
//   cuponInCart,
//   textcuponInCart,
//   setIsModalOpen,
//   isModalOpen,
// }: ILoyaltyCupomUser) {
//   const [openToolTip, setOpenToolTip] = useState(false);
  
//   const handleModalToggle = () => {
//     setIsModalOpen((prev) => !prev);
//   };

//   const {
//     nominalDiscountValue,
//     totalValueFloor,
//     coupon,
//     expiresAt,
//   } = loyaltyCupomGenerate;

//   return (
//     <div
//       style={{
//         display: isModalOpen ? "block" : "none",
//         zIndex: 2,
//         top: "50%",
//         left: "50%",
//         width: "90%",
//         maxWidth: "400px",
//         position: "fixed",
//         background: "#fff",
//         padding: "2rem",
//         borderRadius: "4px",
//         boxShadow: "0px 3px 6px #cecece",
//         border: "1px solid rgb(206, 206, 206)",
//         transform: "translate(-50%,-50%)",
//       }}
//     >
//       <button
//         style={{
//           fontSize: "15px",
//           color: "red",
//           fontWeight: "bold",
//           textAlign: "end",
//           display: "block",
//           width: "100%",
//           fontFamily: "cursive",
//           border: "none",
//           background: "none",
//         }}
//         onClick={() => setIsModalOpen(false)}
//       >
//         X
//       </button>
//       <h3 style={{ color: "green", marginBottom: "2rem" }}>
//         Cupom gerado com sucesso!
//       </h3>
//       <p>
//         Use{" "}
//         <strong
//           onClick={() => {
//             navigator.clipboard.writeText(coupon[0]);
//             setOpenToolTip(true);
//             setTimeout(() => {
//               setOpenToolTip(false);
//             }, 2500);
//           }}
//           style={{
//             border: "2px dashed #e8132c",
//             padding: ".2rem 1rem",
//             color: "#e8132c",
//             backgroundColor: "#fde6e6",
//             cursor: "pointer",
//             position: "relative",
//           }}
//         >
//           {coupon[0]}
//           {openToolTip && (
//             <span
//               style={{
//                 position: "absolute",
//                 top: "-25px",
//                 color: "#fff",
//                 backgroundColor: "#000",
//                 padding: "0.2rem",
//                 fontSize: "13px",
//                 borderRadius: "2px",
//               }}
//             >
//               Copiado!
//             </span>
//           )}
//         </strong>{" "}
//         para ganhar desconto.
//       </p>
//       <p>
//         Desconto de {nominalDiscountValue} para uma compra mínima de{" "}
//         <strong> {totalValueFloor}</strong>
//       </p>
//       <p style={{ color: "red" }}>Expira em: {formattedDate2}</p>
//       <button
//         style={{
//           marginTop: "1.5rem",
//           background: "#e8132c",
//           color: "#fff",
//           border: "none",
//           cursor: "pointer",
//           borderRadius: "6px",
//           padding: ".5rem 1rem",
//         }}
//         onClick={handleAttachCoupomToCart}
//       >
//         Adicionar cupom ao carrinho
//       </button>

//       {cuponInCart && (
//         <p style={{ color: "green", marginTop: "1rem" }}>{textcuponInCart}</p>
//       )}
//     </div>
//   );
// }
