import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function TermsAndCondition() {
  return (
    <>
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
            TERMS OF SERVICES / PURCHASE POLICY
          </h1>

          <ol className="list-decimal list-inside my-4 ">
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              1. INTRODUCTION{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">1.1</p>
                <p>
                  Naitram Limited (“Naitram”, “we”, “us”, “our”) is a company
                  registered in England and Wales under company number 14667184,
                  with registered offices at 5 Holborn Circus, London, United
                  Kingdom, EC1N2HB.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">1.2</p>
                <p>
                  We operate an online marketplace where you can purchase
                  primary tickets, resale primary tickets, transfer primary
                  tickets, and other items in connection on with an event. The
                  term “Ticket(s)” means primary event tickets ( tickets sold
                  directly by an Event Partner (also referred to as event
                  promoters) for sale through Naitram). Our platform also
                  supports Web3 and NFT (Non-Fungible Token) transactions.
                </p>
              </div>
            </ol>

            {/* 2 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              2. DEFINITIONS{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">2.1</p>
                <p>
                  "Event Partner" refers to event promoters who provide tickets
                  for sale through Naitram.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.2</p>
                <p>
                  "Service" means the services provided by Naitram through its
                  online marketplace, including Web3 and NFT transactions.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.3</p>
                <p>
                  "User" refers to any individual or entity using the Service,
                  including purchasers, promoters, partners, representatives,
                  and resellers.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.4</p>
                <p>
                  "Primary Tickets" are tickets sold directly by an Event
                  Partner for initial sale.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.5</p>
                <p>
                  "Resale Tickets" are previously purchased tickets that are
                  resold through Naitram's marketplace.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.6</p>
                <p>
                  "Web3" refers to the decentralized web that utilizes
                  blockchain technology to enhance security, privacy, and user
                  control.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.7</p>
                <p>
                  "NFT" (Non-Fungible Token) is a digital asset representing
                  ownership or proof of authenticity of a unique item or piece
                  of content, verified using blockchain technology.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">2.8</p>
                <p>
                  "Wallet" refers to a digital wallet used for storing
                  cryptocurrencies and NFTs.
                </p>
              </div>
            </ol>

            <ol className="list-decimal list-inside ml-4 space-y-4">
              {/* <li>
                "Event Partner" refers to event promoters who provide tickets
                for sale through Naitram.
              </li> */}
              {/* <li>
                "Service" means the services provided by Naitram through its
                online marketplace, including Web3 and NFT transactions.
              </li> */}
              {/* <li>
                "User" refers to any individual or entity using the Service,
                including purchasers, promoters, partners, representatives, and
                resellers.
              </li> */}
              {/* <li>
                "Primary Tickets" are tickets sold directly by an Event Partner
                for initial sale.
              </li> */}
              {/* <li>
                "Resale Tickets" are previously purchased tickets that are
                resold through Naitram's marketplace.
              </li> */}
              {/* <li>
                "Web3" refers to the decentralized web that utilizes blockchain
                technology to enhance security, privacy, and user control.
              </li> */}
              {/* <li>
                "NFT" (Non-Fungible Token) is a digital asset representing
                ownership or proof of authenticity of a unique item or piece of
                content, verified using blockchain technology.
              </li> */}
              {/* <li>
                "Wallet" refers to a digital wallet used for storing
                cryptocurrencies and NFTs.
              </li> */}
            </ol>

            {/* 3 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              3. COMMENCEMENT OF AGREEMENT{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">3.1</p>
                <p>
                  This agreement begins when you access or use our Service and
                  continues if you use our Service.
                </p>
              </div>
            </ol>
            {/* 4 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              4. TERMS APPLICABLE{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">4.1</p>
                <p>
                  These terms and conditions apply to all users of the Service.
                  By using the Service, you agree to comply with these terms.
                </p>
              </div>
            </ol>
            {/* 5 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              5. USE OF THE SERVICE{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">5.1</p>
                <p>Users must be at least 18 years old to use the Service.</p>
              </div>
              <div className="flex">
                <p className="me-3">5.2</p>
                <p>
                  Users agree to provide accurate and current information when
                  using the Service.{" "}
                </p>
              </div>
              <div className="flex">
                <p className="me-3">5.3</p>
                <p>
                  Users are responsible for maintaining the confidentiality of
                  their account and password.{" "}
                </p>
              </div>
              <div className="flex">
                <p className="me-3">5.4</p>
                <p>
                  Users engaging in Web3 and NFT transactions must ensure their
                  wallets are secure and adhere to blockchain protocols.{" "}
                </p>
              </div>
              <div className="flex">
                <p className="me-3">5.5</p>
                <p>
                  Naitram reserves the right to ban any user from the app and/or
                  events for violation of these terms, inappropriate conduct, or
                  any other reason deemed necessary by Naitram.{" "}
                </p>
              </div>
            </ol>

            {/* 6 bullet */}

            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              6. STANDARD RESTRICTIONS{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex flex-col">
                <div className="flex">
                  <p className="me-3">6.1</p>
                  <p>
                    In some circumstances, events will be hosted for individuals
                    below the age of 18. The terms of the same:
                  </p>
                </div>

                <ol className="ml-[34px] space-y-4 mt-2">
                  <div className="flex ">
                    <p className="me-3">a. </p>
                    <p>
                      8-13 years, you’ll need to a end with an adult (18+) and
                      only book seated and/or balcony tickets
                    </p>
                  </div>
                  <div className="flex ">
                    <p className="me-3">b. </p>
                    <p>
                      Shows that are rated 14+ mean that you can come without an
                      adult over 18 and be in the standing area
                    </p>
                  </div>
                </ol>
              </div>
            </ol>

            {/* 7 bullet */}

            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              7. USE OF THE SERVICE BY PROMOTERS{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">7.1</p>
                <p>
                  {" "}
                  Promoters must comply with all applicable laws and regulations
                  when listing tickets on the Service.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">7.2</p>
                <p>
                  Promoters are responsible for ensuring that the event details
                  and ticket information provided are accurate.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">7.3</p>
                <p>
                  Promoters may utilize NFTs to enhance the event experience,
                  such as offering NFT-based tickets or collectibles.
                </p>
              </div>
            </ol>

            {/* 8 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              8. USE OF THE SERVICE BY PARTNERS AND REPS{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">8.1</p>
                <p>
                  {" "}
                  Partners and representatives must adhere to the guidelines
                  provided by Naitram.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">8.2</p>
                <p>
                  Partners and reps are responsible for ensuring the
                  authenticity and validity of the tickets and NFTs they manage.
                </p>
              </div>
            </ol>

            {/* 9 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              9. USE OF THE SERVICE BY RESELLERS{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">9.1</p>
                <p>
                  {" "}
                  Resellers must comply with Naitram's policies on ticket
                  resales.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">9.2</p>
                <p>
                  Resellers are responsible for the tickets and NFTs they list
                  and must ensure that they are valid and transferable.
                </p>
              </div>
            </ol>

            {/* 10 bullet */}

            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              10. PAYMENTS{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">10.1</p>
                <p> All payments must be made through the Naitram platform.</p>
              </div>
              <div className="flex">
                <p className="me-3">10.2</p>
                <p>
                  Payment methods and terms will be specified at the time of
                  purchase.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">10.3</p>
                <p>
                  Naitram reserves the right to change payment terms at any
                  time.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">10.4</p>
                <p>
                  Payments for NFT transactions may involve cryptocurrencies and
                  require blockchain confirmations.
                </p>
              </div>
            </ol>

            {/* 11 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              11. STATUS OF NAITRAM{" "}
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">11.1</p>
                <p>
                  {" "}
                  Naitram acts as an intermediary between buyers and sellers of
                  tickets and NFTs and is not the promoter of the events.
                </p>
              </div>
            </ol>

            {/* 12 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              12. INTELLECTUAL PROPERTY
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">12.1</p>
                <p>
                  All content on the Naitram website, including logos,
                  trademarks, and software, is the property of Naitram or its
                  licensors.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">12.2</p>
                <p>
                  Users must not use any intellectual property belonging to
                  Naitram without prior written consent.
                </p>
              </div>
            </ol>

            {/* 13 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              13. USER WARRANTIES
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">13.1</p>
                <p>
                  Users warrant that they will comply with all applicable laws
                  and regulations.
                </p>
              </div>
            </ol>

            {/* 14 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              14. USER REPRESENTATIONS
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">14.1</p>
                <p>
                  Users represent that the information on they provide is true
                  and accurate.
                </p>
              </div>

              <div className="flex">
                <p className="me-3">14.2</p>
                <p>
                  Users represent that they will not use the Service for any
                  unlawful purposes.
                </p>
              </div>

              <div className="flex">
                <p className="me-3">14.3</p>
                <p>
                  Users represent that they will not engage in fraudulent
                  activities related to Web3 and NFT transactions.
                </p>
              </div>
            </ol>

            {/* 15 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              15. BUGS, VIRUSES, AND PDPs
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">15.1</p>
                <p>
                  Naitram does not guarantee that the Service will be free from
                  bugs, viruses, or other harmful components.
                </p>
              </div>

              <div className="flex">
                <p className="me-3">15.2</p>
                <p>
                  Users are responsible for implementing sufficient security
                  measures to protect their systems and wallets.
                </p>
              </div>
            </ol>

            {/* 16 bullet */}

            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              16. USE OF DATA AND DATA PROTECTION
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">16.1</p>
                <p>
                  Naitram will process user data in accordance with its Privacy
                  Policy.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">16.2</p>
                <p>
                  Users consent to the collection and use of their data as
                  described in the Privacy Policy.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">16.3</p>
                <p>
                  Data related to Web3 and NFT transactions will be processed in
                  compliance with blockchain technology standards.
                </p>
              </div>
            </ol>

            {/* 17 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              17. EXCLUSION OF WARRANTIES
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">17.1</p>
                <p>
                  The Service is provided on an "as is" and "as available"
                  basis.{" "}
                </p>
              </div>

              <div className="flex">
                <p className="me-3">17.2</p>
                <p>
                  The Service is provided on an "as is" and "as available"
                  basis. Naitram disclaims all warranties, express or implied,
                  to the fullest extent permitted by law.
                </p>
              </div>
            </ol>
            {/* 18 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              18. LIMITATION OF LIABILITIES
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">18.1</p>
                <p>
                  Naitram shall not be liable for any indirect, incidental,
                  special, or consequential damages arising from the use of the
                  Service.{" "}
                </p>
              </div>
              <div className="flex">
                <p className="me-3">18.2</p>
                <p>
                  Naitram shall not be liable for any indirect, incidental,
                  special, or consequential damages arising from the use of the
                  Service. Naitram's total liability to any user shall not
                  exceed the amount paid by the user for the ticket or NFT.
                </p>
              </div>
            </ol>

            {/* 19 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              19. INDEMNITIES
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">19.1</p>
                <p>
                  Users agree to indemnify and hold Naitram harmless from any
                  claims, damages, or expenses arising from their use of the
                  Service.
                </p>
              </div>
            </ol>

            {/* 20 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              20. LINKS TO OTHER SITES
            </p>
            <ol className="ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">20.1</p>
                <p>
                  The Service may contain links to third-party websites. Naitram
                  is not responsible for the content or practices of these
                  websites.
                </p>
              </div>
            </ol>

            {/* 21 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              21. FORCE MAJEURE
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">21.1</p>
                <p>
                  Naitram is not liable for any failure to perform due to causes
                  beyond its reasonable control, including acts of God, war, or
                  natural disasters.
                </p>
              </div>
            </ol>

            {/* 22 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              22. TERMINATION
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">22.1</p>
                <p>
                  Naitram reserves the right to terminate any user's access to
                  the Service at any time, without notice, for any reason.
                </p>
              </div>
            </ol>

            {/* 23 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              23. WAIVER
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">23.1</p>
                <p>
                  No waiver of any term of this agreement shall be deemed a
                  further or continuing waiver of such term.
                </p>
              </div>
            </ol>

            {/* 24 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              24. ASSIGNMENT
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">24.1</p>
                <p>
                  Users may not assign their rights or obligations under this
                  agreement without Naitram's prior written consent.
                </p>
              </div>
            </ol>

            {/* 25 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              25. Notices
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex flex-col">
                <div className="flex">
                  <p className="me-3">25.1</p>
                  <p>
                    Notices to users will be made via email or through the
                    Naitram platform. Notices to Naitram should be sent to:
                  </p>
                </div>
                <div className="ml-[45px] mt-2">
                  <p>-5 Holborn Circus</p>
                  <p className="mt-1">-London</p>

                  <p className="mt-1">-United Kingdom</p>

                  <p className="mt-1">-EC1N2HB</p>
                </div>
              </div>
            </ol>

            {/* 26 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              26. INVALIDITY
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">26.1</p>
                <p>
                  If any provision of this agreement is found to be invalid, the
                  remaining provisions will remain in full force and effect.
                </p>
              </div>
            </ol>

            {/* 27 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              27. AGREEMENT
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">27.1</p>
                <p>
                  This agreement constitutes the entire agreement between the
                  user and Naitram regarding the use of the Service.
                </p>
              </div>
            </ol>

            {/* 28 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              28. LAW AND JURISDICTION
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">28.1</p>
                <p>
                  This agreement is governed by the laws of England and Wales.
                  Any disputes arising from this agreement shall be subject to
                  the exclusive jurisdicton of the courts of England and Wales.
                </p>
              </div>
            </ol>

            {/* 29 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              29. THIRD PARTIES
            </p>
            <ol className=" ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">29.1</p>
                <p>
                  This agreement does not confer any rights on any third
                  parties.
                </p>
              </div>
            </ol>

            {/* 30 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              30. QUERIES, COMPLAINTS AND DISPUTE RESOLUTION
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">30.1</p>
                <p>
                  Users should direct any queries or complaints to Naitram's
                  customer service department.
                </p>
              </div>
              <div className="flex">
                <p className="me-3">30.2</p>
                <p>
                  Naitram will make reasonable efforts to resolve any disputes
                  in good faith.
                </p>
              </div>
            </ol>

            {/* 31 bullet */}
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
              31. EVENT CHAT FUNCTION
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-4">
              <div className="flex">
                <p className="me-3">31.1</p>
                <p>
                  Naitram provides an event chat function to facilitate
                  communication among users attending the same event.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex">
                  <p className="me-3">31.2</p>
                  <p>
                    Users are expected to engage in respectful and appropriate
                    communication. Unacceptable behaviour includes but is not
                    limited to:
                  </p>
                </div>
                <div className="ml-[45px] mt-2">
                  <div className="mt-1 flex">
                    <p> - </p>
                    <p className="ms-2">
                      {" "}
                      Hate speech or discriminatory language
                    </p>
                  </div>

                  <div className="mt-1 flex">
                    <p> - </p>
                    <p className="ms-2">
                      {" "}
                      Harassment or threats towards others
                    </p>
                  </div>

                  <div className="mt-1 flex">
                    <p> - </p>
                    <p className="ms-2">
                      {" "}
                      Sharing of inappropriate or offensive content
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex">
                <p className="me-3">31.3</p>
                <p>
                  Users encountering unacceptable behaviour should report it
                  immediately to Naitram's customer service.
                </p>
              </div>

              <div className="flex">
                <p className="me-3">31.4</p>
                <p>
                  Naitram reserves the right to take appropriate action,
                  including banning users from the event chat or the plaform, in
                  response to reports of unacceptable behaviour.
                </p>
              </div>

              {/* <p className="pt-4">- - -</p> */}
              <p className="pt-4">
                This document outlines the terms and conditions for using the
                Naitram ticket selling app, including considerations for Web3
                and NFT transactions, as well as guidelines for using the event
                chat function, ensuring clarity and compliance for all parties
                involved.
              </p>
            </ol>
          </ol>
        </div>
      </section>
    </>
  );
}
