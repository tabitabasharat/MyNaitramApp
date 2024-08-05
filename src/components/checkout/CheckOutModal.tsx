"use client";

import BuyTicketModal from "@/components/checkout/BuyTicketModal";
import CompleteYourProfileModal from "@/components/checkout/CompleteYourProfileModal";
import PaymentsModal from "@/components/checkout/PaymentsModal";
import TicketPurchaseExpire from "@/components/checkout/TicketPurchaseExpire";
import TicketPurchaseSuccess from "@/components/checkout/TicketPurchaseSuccess";
import { useState, useEffect } from "react";


const CheckOutModal = () => {
  
  const [currentModal, setCurrentModal] = useState("BuyTicket");

  const handleNext = (nextModal: string) => {
    setCurrentModal(nextModal);
  };
  return (
    <>
      {currentModal === "BuyTicket" && (
        <BuyTicketModal onNext={() => handleNext("CompleteYourProfile")} />
      )}
      {currentModal === "CompleteYourProfile" && (
        <CompleteYourProfileModal
          handleNext={handleNext}
          onNext={() => handleNext("Payments")}
        />
      )}
      {currentModal === "Payments" && (
        <PaymentsModal
          handleNext={handleNext}
          onNext={() => handleNext("TicketPurchaseSuccess")}
        />
      )}
      {currentModal === "TicketPurchaseSuccess" && (
        <TicketPurchaseSuccess setCurrentModal={setCurrentModal} />
      )}
      {currentModal === "TicketPurchaseExpire" && <TicketPurchaseExpire />}
    </>
  );
};

export default CheckOutModal;
