import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function Ticketexchange() {
  return (
    <section
      style={{
        backgroundImage: "url(/contact-ellipse.png)",
        backgroundPosition: " top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
      className="min-h-screen  bg-cover bg-no-repeat pb-[80px]"
    >
      <div className="pxpx mx-2xl pt-[150px] md:pt-[180px]">
        <h1 className="lg:text-[60px] text-[30px] font-[600] mb-[20px] uppercase ">
          Naitram Ticket Exchange Policy{" "}
        </h1>
        <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mb-[14.4px]">
          Effective Date: Friday 27 September 2024{" "}
        </h3>

        <p className="pb-[20px] lg:text-xl text-[17px]">
          Naitram is committed to providing a secure and transparent platform
          for the resale and transfer of event tickets. This Ticket Exchange
          Policy outlines the terms under which ticket holders may resell or
          transfer their tickets, the rights and obligations of event promoters,
          and other key rules. By using Naitram, all parties agree to the terms
          described below.
        </p>

        <ol className="list-decimal list-inside mt-4 ">
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold ">
            Eligibility for Ticket Exchange{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Only tickets purchased through Naitram’s platform are eligible for
              resale or transfer.
            </li>
            <li>
              Tickets can be exchanged or transferred until 48 hours before the
              event start time. After this deadline, no exchanges or transfers
              will be allowed.{" "}
            </li>
          </ul>
          {/* 2 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Exchange Restrictions
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Tickets may only be resold at the original purchase price. Sellers
              are prohibited from marking up or discounting tickets.{" "}
            </li>
            <li>
              Tickets can only be transferred or resold through the Naitram
              platform. Off-platform transfers or sales are not permitted.{" "}
            </li>
          </ul>
          {/* 3 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Promoter’s Rights and Obligations{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Promoters may impose restrictions on ticket resale or transfer,
              including limiting the resale of specific ticket types (e.g., VIP
              or early-bird tickets). These restrictions must be clearly
              communicated at the time of purchase and will be enforced by
              Naitram.{" "}
            </li>
            <li>
              Promoters acknowledge that ticket holders are allowed to transfer
              or resell their tickets until 48 hours prior to the event, and
              promoters cannot invalidate tickets exchanged via Naitram unless
              fraud is detected.{" "}
            </li>
            <li>
              Promoters are responsible for ensuring that any event-specific
              terms (e.g., age restrictions, access limitations) are
              communicated to buyers at the time of ticket purchase.
            </li>
          </ul>
          {/* 4 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Processing Fees{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Naitram charges a processing fee for ticket resales. The fee will
              be displayed during the resale process and is non-refundable.
            </li>
            <li>
              No fees are charged for direct transfers between friends or family
              members.
            </li>
          </ul>
          {/* 5 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Exchange Deadline{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Ticket holders must complete all resales or transfers at least 48
              hours before the event. Once the 48-hour window begins, no further
              transactions are allowed.{" "}
            </li>
            <li>
              Naitram reserves the right to enforce this deadline strictly to
              maintain a secure ticketing system.
            </li>
          </ul>
          {/* 6 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Event Cancellations or Postponements{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              In the event of an **event cancellation or postponement**, the
              promoter is fully responsible for issuing refunds or offering
              alternative arrangements for ticket holders.
            </li>
            <li>
              Naitram will assist with refund processing for tickets purchased
              or resold via the platform but is not liable for the refund
              itself, as this responsibility falls on the event organiser or
              promoter.
            </li>
          </ul>

          {/* 7 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Refund Policy{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Tickets resold or transferred through Naitram are non-refundable,
              except in cases of event cancellation. Once a ticket has been
              transferred or resold, the transaction is final.
            </li>
            <li>
              Buyers assume all risks related to their ability to attend the
              event (e.g., travel, personal emergencies). No refunds will be
              provided for non- attendance.
            </li>
          </ul>
          {/* 8 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Transfer of Tickets{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Ticket holders can transfer tickets to friends or family members
              without reselling them. The recipient must accept the transfer via
              their Naitram account.
            </li>
            <li>
              Transfers can only occur until 48 hours before the event, after
              which the ticket will no longer be eligible for transfer.
            </li>
          </ul>
          {/* 9 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Promoter’s Enforcement of Event Restrictions{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Promoters may enforce event-specific restrictions (e.g., ID
              checks, access limitations for specific ticket types). Such
              restrictions must be disclosed at the time of ticket purchase.
            </li>
            <li>
              Naitram will ensure that these restrictions are enforced during
              the ticket transfer or resale process, but the responsibility for
              compliance ultimately rests with the promoter.
            </li>
          </ul>
          {/* 10 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            No Resale Markups or Price Gouging{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Naitram strictly prohibits ticket holders from reselling tickets
              at a higher price than the original purchase value. Any attempt to
              markup or engage in price gouging will result in the suspension of
              the user’s account and the cancellation of the transaction.
            </li>
          </ul>
          {/* 11 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Blockchain Technology and Ticket Security{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              All ticket transactions on Naitram are verified using **blockchain
              technology**, ensuring the security and authenticity of tickets.
              Naitram continuously monitors transactions for fraud or suspicious
              activity.
            </li>
            <li>
              Any detected fraud will result in the immediate cancellation of
              the ticket, and the user involved will be banned from the
              platform.
            </li>
          </ul>
          {/* 12 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Ticket Seller and Buyer Responsibilities{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Sellers are responsible for ensuring that the details of the
              ticket (including event date, time, seat information, etc.) are
              accurate. Misrepresentation may result in account suspension or
              other penalties.
            </li>
            <li>
              Buyers must review all event details, including any restrictions
              set by the promoter, before purchasing a ticket. Naitram will not
              be liable for buyer misunderstanding or failure to meet event
              entry requirements.
            </li>
          </ul>
          {/* 13 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Promoter’s Control over Ticket Validity{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              While promoters may impose restrictions on resold or transferred
              tickets, they must respect the resale and transfer rights of
              ticket holders until 48 hours before the event.
            </li>
            <li>
              Promoters may only invalidate a ticket transferred through Naitram
              if there is a clear indication of fraud or violation of
              event-specific terms. Arbitrary invalidation is not permitted.
            </li>
          </ul>
          {/* 14 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Dispute Resolution{" "}
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Any disputes between buyers, sellers, or promoters regarding the
              resale or transfer of tickets must first be addressed through
              Naitram’s customer support. Naitram will act as a mediator but
              does not assume liability for unresolved disputes.
            </li>
            <li>
              For disputes related to event cancellations, changes, or
              restrictions, ticket holders must communicate directly with the
              event promoter or organiser. Naitram will assist where necessary
              but does not assume responsibility for event-specific issues.
            </li>
          </ul>
        </ol>
      </div>
    </section>
  );
}
