import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function TermsAndCondition() {
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
      <div className="pxpx mx-2xl pp-inner">
        <h1 className="lg:text-[60px] text-[30px] font-[600] mb-[20px] uppercase ">
          TERMS & CONDITIONS / PURCHASE POLICY
        </h1>

        <ol className="list-decimal list-inside mt-4 ">
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold ">
            INTRODUCTION
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram Limited (“Naitram”, “we”, “us”, “our”) is a company
              registered in England and Wales under company number 14667184,
              with registered offices at 5 Holborn Circus, London, United
              Kingdom, EC1N2HB.
            </li>
            <li>
              We operate an online marketplace where you can purchase primary
              tickets, resale primary tickets, transfer primary tickets, and
              other items in connection on with an event. The term “Ticket(s)”
              means primary event tickets ( tickets sold directly by an Event
              Partner (also referred to as event promoters) for sale through
              Naitram). Our platform also supports Web3 and NFT (Non-Fungible
              Token) transacations.
            </li>
          </ol>
          {/* 2 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            DEFINITIONS
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              "Event Partner" refers to event promoters who provide tickets for
              sale through Naitram.
            </li>
            <li>
              "Service" means the services provided by Naitram through its
              online marketplace, including Web3 and NFT transactions.
            </li>
            <li>
              "User" refers to any individual or entity using the Service,
              including purchasers, promoters, partners, representatives, and
              resellers.
            </li>
            <li>
              "Primary Tickets" are tickets sold directly by an Event Partner for
              initial sale.
            </li>
            <li>
              "Resale Tickets" are previously purchased tickets that are resold
              through Naitram's marketplace.
            </li>
            <li>
              "Web3" refers to the decentralized web that utilizes blockchain
              technology to enhance security, privacy, and user control.
            </li>
            <li>
              "NFT" (Non-Fungible Token) is a digital asset representing
              ownership or proof of authen city of a unique item or piece of
              content, verified using blockchain technology.
            </li>
            <li>
              "Wallet" refers to a digital wallet used for storing
              cryptocurrencies and NFTs.
            </li>
          </ol>
          {/* 3 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            COMMENCEMENT OF AGREEMENT
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4 ">
            <li>
              This agreement begins when you access or use our Service and continues if you use our Service.
            </li>
          </ol>
          {/* 4 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            TERMS APPLICABLE
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              These terms and conditions apply to all users of the Service. By
              using the Service, you agree to comply with these terms.
            </li>
          </ol>
          {/* 5 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USE OF THE SERVICE
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>Users must be at least 18 years old to use the Service.</li>

            <li>
              Users agree to provide accurate and current information when using
              the Service.{" "}
            </li>
            <li>
              Users are responsible for maintaining the confidentiality of their
              account and password.{" "}
            </li>
            <li>
              Users engaging in Web3 and NFT transacations must ensure their
              wallets are secure and adhere to blockchain protocols.{" "}
            </li>
            <li>
              Naitram reserves the right to ban any user from the app and/or
              events for violation of these terms, inappropriate conduct, or any
              other reason deemed necessary by Naitram.{" "}
            </li>
          </ol>
          {/* 6 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            STANDARD RESTRICTIONS
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              In some circumstances, events will be hosted for individuals below
              the age of 18. The terms of the same:
              <ol className="list-alpha  pt-[10px] space-y-1 ml-4 ">
                <li>
                  <p className="ms-3">
                    8-13 years, you’ll need to a end with an adult (18+) and
                    only book seated and/or balcony tickets{" "}
                  </p>
                </li>
                <li>
                  <p className="ms-3">
                    Shows that are rated 14+ mean that you can come without an
                    adult over 18 and be in the standing area
                  </p>
                </li>
              </ol>
            </li>
          </ol>
          {/* 7 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USE OF THE SERVICE BY PROMOTERS
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Promoters must comply with all applicable laws and regulations when
              listng tickets on the Service.
            </li>
            <li>
              Promoters are responsible for ensuring that the event details and
              ticket information provided are accurate.
            </li>
            <li>
              Promoters may utilize NFTs to enhance the event experience, such
              as offering NFT-based tickets or collectibles.
            </li>
          </ol>
          {/* 8 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USE OF THE SERVICE BY PARTNERS AND REPS
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Partners and representatives must adhere to the guidelines
              provided by Naitram.
            </li>
            <li>
              Partners and reps are responsible for ensuring the authenticity
              and validity of the tickets and NFTs they manage.
            </li>
          </ol>
          {/* 9 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USE OF THE SERVICE BY RESELLERS
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Resellers must comply with Naitram's policies on ticket resales.
            </li>
            <li>
              Resellers are responsible for the tickets and NFTs they list and
              must ensure that they are valid and transferable.
            </li>
          </ol>
          {/* 10 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            PAYMENTS
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>All payments must be made through the Naitram platform.</li>
            <li>
              Payment methods and terms will be specified at the time of
              purchase.
            </li>
            <li>
              Naitram reserves the right to change payment terms at any time.
            </li>
            <li>
              Payments for NFT transacations may involve cryptocurrencies and
              require blockchain confirmations.
            </li>
          </ol>
          {/* 11 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            STATUS OF NAITRAM
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram acts as an intermediary between buyers and sellers of
              tickets and NFTs and is not the promoter of the events.
            </li>
          </ol>

          {/* 12 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            INTELLECTUAL PROPERTY
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              All content on the Naitram website, including logos, trademarks,
              and software, is the property of Naitram or its licensors.
            </li>
            <li>
              Users must not use any intellectual property belonging to Naitram
              without prior written consent.
            </li>
          </ol>
          {/* 13 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USER WARRANTIES
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Users warrant that they will comply with all applicable laws and
              regulations.
            </li>
            <li>
              Users warrant that they have the legal right to enter into this
              agreement.
            </li>
          </ol>

          {/* 14 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USER REPRESENTATIONS
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Users represent that the information on they provide is true and
              accurate.
            </li>
            <li>
              Users represent that they will not use the Service for any
              unlawful purposes.
            </li>
            <li>
              Users represent that they will not engage in fraudulent activities
              related to Web3 and NFT transacations.
            </li>
          </ol>
          {/* 15 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            BUGS, VIRUSES, AND PDPs
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram does not guarantee that the Service will be free from
              bugs, viruses, or other harmful components.
            </li>
            <li>
              Users are responsible for implementing sufficient security measures
              to protect their systems and wallets.
            </li>
          </ol>
          {/* 16 bullet */}

          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            USE OF DATA AND DATA PROTECTION
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram will process user data in accordance with its Privacy
              Policy.
            </li>
            <li>
              Users consent to the collection and use of their data as described
              in the Privacy Policy.
            </li>
            <li>
              Data related to Web3 and NFT transacations will be processed in
              compliance with blockchain technology standards.
            </li>
          </ol>
          {/* 17 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            EXCLUSION OF WARRANTIES
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              The Service is provided on an "as is" and "as available" basis.{" "}
            </li>
            <li>
              The Service is provided on an "as is" and "as available" basis.
              Naitram disclaims all warranties, express or implied, to the
              fullest extent permitted by law.
            </li>
          </ol>
          {/* 18 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            LIMITATION OF LIABILITIES
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram shall not be liable for any indirect, incidental, special,
              or consequential damages arising from the use of the Service.{" "}
            </li>
            <li>
              Naitram shall not be liable for any indirect, incidental, special,
              or consequential damages arising from the use of the Service.
              Naitram's total liability to any user shall not exceed the amount
              paid by the user for the ticket or NFT.
            </li>
          </ol>

          {/* 19 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            INDEMNITIES
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Users agree to indemnify and hold Naitram harmless from any
              claims, damages, or expenses arising from their use of the
              Service.
            </li>
          </ol>

          {/* 20 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            LINKS TO OTHER SITES
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              The Service may contain links to third-party websites. Naitram is
              not responsible for the content or practices of these websites.
            </li>
          </ol>

          {/* 21 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            FORCE MAJEURE
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram is not liable for any failure to perform due to causes
              beyond its reasonable control, including acts of God, war, or
              natural disasters.
            </li>
          </ol>

          {/* 22 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            TERMINATION
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram reserves the right to terminate any user's access to the
              Service at any time, without notice, for any reason.
            </li>
          </ol>

          {/* 23 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            WAIVER
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              No waiver of any term of this agreement shall be deemed a further
              or continuing waiver of such term.
            </li>
          </ol>

          {/* 24 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            ASSIGNMENT
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Users may not assign their rights or obligations under this
              agreement without Naitram's prior written consent.
            </li>
          </ol>

          {/* 25 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Notices
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Notices to users will be made via email or through the Naitram
              platform. Notices to Naitram should be sent to:
              <ul className="list-type-none space-y-2 mt-2">
                <li> 5 Holborn Circus</li>
                <li> London</li>

                <li> United Kingdom</li>

                <li> EC1N2HB</li>
              </ul>
            </li>
          </ol>

          {/* 26 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            INVALIDITY
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              If any provision of this agreement is found to be invalid, the
              remaining provisions will remain in full force and effect.
            </li>
          </ol>

          {/* 27 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            AGREEMENT
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              This agreement constitutes the entire agreement between the user
              and Naitram regarding the use of the Service.
            </li>
          </ol>

          {/* 28 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            LAW AND JURISDICTION
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              This agreement is governed by the laws of England and Wales. Any
              disputes arising from this agreement shall be subject to the
              exclusive jurisdic on of the courts of England and Wales.
            </li>
          </ol>

          {/* 29 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            THIRD PARTIES
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              This agreement does not confer any rights on any third parties.
            </li>
          </ol>

          {/* 30 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            QUERIES, COMPLAINTS AND DISPUTE RESOLUTION
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Users should direct any queries or complaints to Naitram's
              customer service department.
            </li>

            <li>
              Naitram will make reasonable efforts to resolve any disputes in
              good faith.
            </li>
          </ol>

          {/* 31 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            EVENT CHAT FUNCTION
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram provides an event chat function to facilitate communication
              among users attending the same event.
            </li>
            <li>
              Users are expected to engage in respectful and appropriate
              communication. Unacceptable behaviour includes but is not limited
              to:
              <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
                <li>Hate speech or discriminatory language</li>
                <li>Harassment or threats towards others</li>
                <li>Sharing of inappropriate or offensive content </li>
              </ul>
            </li>

            <li>
              Users encountering unacceptable behaviour should report it
              immediately to Naitram's customer service.
            </li>
            <li>
              Naitram reserves the right to take appropriate action, including
              banning users from the event chat or the plaform, in response to
              reports of unacceptable behaviour.
            </li>

            <p className="pt-4">- - -</p>
            <p className="pt-4">
              This document outlines the terms and conditions for using the
              Naitram ticket selling app, including considerations for Web3 and
              NFT transacations, as well as guidelines for using the event chat
              function, ensuring clarity and compliance for all parties involved.
            </p>
          </ol>
        </ol>
      </div>
    </section>
  );
}
