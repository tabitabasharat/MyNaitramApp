"use client";

import Image from "next/image";
import "./ticket.css";
import girl from "../../assets/Section.svg";
import success from "../../assets/success.svg"

function TicketPurchaseSuccessPage({ setCurrentModal }: any) {
  return (
    <div className="main-div-stlying">
      <div className="LSH-div-stlying">
        <div>
          <Image src={girl} />
        </div>
        <div>
          <div className="ticket-purchase-div">
            <div>
                <Image src={success} className="success-img"/>
            </div>
            <div>
                <h3>Your ticket purchase is confirmed.We can't wait to see you there!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketPurchaseSuccessPage;
