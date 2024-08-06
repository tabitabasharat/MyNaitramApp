"use client";

import BuyTicketModal from "@/components/checkout/BuyTicketModal";
import CompleteYourProfileModal from "@/components/checkout/CompleteYourProfileModal";
import PaymentsModal from "@/components/checkout/PaymentsModal";
import TicketPurchaseExpire from "@/components/checkout/TicketPurchaseExpire";
import TicketPurchaseSuccess from "@/components/checkout/TicketPurchaseSuccess";
import { useState, useEffect } from "react";

const CheckOutModal = ({ event }: any) => {
  const [currentModal, setCurrentModal] = useState("BuyTicket");
  const [ticketPrice, setTicketPrice] = useState<any>();
  const [profileInformation, setProfileInformation] = useState<any>();

  console.log("this is ticketPrice", ticketPrice, profileInformation, event);

  const handleNext = (nextModal: string) => {
    setCurrentModal(nextModal);
  };
  return (
    <>
      {currentModal === "BuyTicket" && (
        <BuyTicketModal
          onNext={() => handleNext("CompleteYourProfile")}
          setTicketPrice={setTicketPrice}
        />
      )}
      {currentModal === "CompleteYourProfile" && (
        <CompleteYourProfileModal
          handleNext={handleNext}
          onNext={() => handleNext("Payments")}
          setProfileInformation={setProfileInformation}
        />
      )}
      {currentModal === "Payments" && (
        <PaymentsModal
          ticketPrice={ticketPrice}
          profileInformation={profileInformation}
          event={event}
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
