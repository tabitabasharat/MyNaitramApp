"use client";

import BuyTicketModal from "@/components/checkout/BuyTicketModal";
import CompleteYourProfileModal from "@/components/checkout/CompleteYourProfileModal";
import PaymentsModal from "@/components/checkout/PaymentsModal";
import TicketPurchaseExpire from "@/components/checkout/TicketPurchaseExpire";
import TicketPurchaseSuccess from "@/components/checkout/TicketPurchaseSuccess";
import RsvpSubmissionSuccess from "@/components/checkout/RscvSubModel";
import PasswordModel from "@/components/checkout/PaswordModel";
import { useState, useEffect } from "react";
import BuyTicketPopUp from "@/components/checkout/BuyTicketPopUp";
import WhiteListCode from "@/components/checkout/WhiteListCode";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const CheckOutModal = ({ event }: any) => {
  const dispatch = useAppDispatch();
  const [currentModal, setCurrentModal] = useState("BuyTicket");
  const [ticketPrice, setTicketPrice] = useState<any>();
  const [ticketType, setTicketType] = useState<any>();
  const [ticketIndex, setTicketIndex] = useState<any>();

  const [profileInformation, setProfileInformation] = useState<any>();

  console.log("this is ticketPrice", ticketPrice, profileInformation, event, ticketType);

  const handleNext = (nextModal: string) => {
    setCurrentModal(nextModal);
  };
  console.log("this is ticket index", ticketIndex);
  console.log("Thissssssssss iss EEEEEvent ", event);

  return (
    <>
      {currentModal === "BuyTicket" && (
        <BuyTicketModal
          onNext={() => handleNext("CompleteYourProfile")}
          setTicketPrice={setTicketPrice}
          setTicketType={setTicketType}
          setTicketIndex={setTicketIndex}
        />
      )}
      {/* {canbuyTicket == false &&(
        <BuyTicketPopUp
          onNext={() => handleNext("CompleteYourProfile")}
          setTicketPrice={setTicketPrice}
          setTicketType={setTicketType}
        />
      )} */}

      {/* {currentModal === "BuyTicket" && (
        <WhiteListCode
          onNext={() => handleNext("CompleteYourProfile")}
          setTicketPrice={setTicketPrice}
          setTicketType={setTicketType}
        />
      )} */}
      {currentModal === "CompleteYourProfile" && (
        <CompleteYourProfileModal
          handleNext={handleNext}
          onNext={() => handleNext("Payments")}
          setProfileInformation={setProfileInformation}
          currentTicketType={ticketType}
          setCurrentModal={setCurrentModal}
        />
      )}
      {currentModal === "Payments" && (
        <PaymentsModal
          ticketPrice={ticketPrice}
          profileInformation={profileInformation}
          event={event}
          ticketType={ticketType}
          handleNext={handleNext}
          ticketIndex={ticketIndex}
          onNext={() => handleNext("TicketPurchaseSuccess")}
        />
      )}
      {currentModal === "TicketPurchaseSuccess" && <TicketPurchaseSuccess setCurrentModal={setCurrentModal} />}
      {currentModal === "RSCVsubmissionModel" && <RsvpSubmissionSuccess setCurrentModal={setCurrentModal} />}
      {/* {currentModal === "PasswordModelOpen" && <PasswordModel setCurrentModal={setCurrentModal} />} */}
      {currentModal === "TicketPurchaseExpire" && <TicketPurchaseExpire />}
    </>
  );
};

export default CheckOutModal;
