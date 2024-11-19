import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function Eventpromoter() {
  return (
    <>
        <section
      style={{
        backgroundImage: "url(/contact-ellipse.png)",
        backgroundPosition: " top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
      className="min-h-screen bg-cover bg-no-repeat pb-[80px]"
    >
      <div className="pxpx mx-2xl pt-[150px] md:pt-[180px]">
        <h1 className="lg:text-[60px] text-[30px] font-[600] mb-[20px] uppercase ">
          Naitram Event Promoter/Organiser Agreement Effective Date: 27
          September 2024{" "}
        </h1>
        <p className="pb-[20px] lg:text-xl text-[17px]">
          This Agreement (“Agreement”) governs the terms and conditions under
          which event promoters and organisers ("Promoter" or "Organiser") may
          use the Naitram platform to create, manage, and sell tickets for
          events. By creating an event on the Naitram platform, the Promoter
          agrees to the following terms, rights, and responsibilities toward
          Naitram and ticket holders.
        </p>
        <ol className="mt-4 ">
          {/* 1 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4 ">
            1. Event Creation and Platform Usage{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">1.1</p>
              <p>
                The Promoter is authorised to use the Naitram platform to create
                and manage events, subject to compliance with this Agreement
              </p>
            </div>
            <div className="flex">
              <p className="me-3">1.2</p>
              <p>
                The Promoter must provide accurate and complete information
                about the event, including but not limited to date, time,
                location, ticket prices, and any special restrictions.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">1.3</p>
              <p>
                The Promoter must ensure all promotional materials (e.g., event
                descriptions, images) provided to Naitram are legal, accurate,
                and do not infringe upon third-party rights.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">1.4</p>
              <p>
                {" "}
                Naitram reserves the right to review, approve, or reject events
                listed on the platform for any reason, including non-compliance
                with legal or ethical standards.
              </p>
            </div>
          </ol>
          {/* 2 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4 ">
            2. Promoter Responsibilities Toward Ticket Holders{" "}
          </p>
          <ol className="ml-4 space-y-4 ">
            <div className="flex">
              <p className="me-3">2.1</p>
              <p>
                The Promoter must fulfill all obligations toward ticket holders,
                including ensuring that the event occurs as advertised unless
                prevented by force majeure (see clause 14).
              </p>
            </div>
            <div className="flex">
              <p className="me-3">2.2</p>
              <p>
                The Promoter must communicate any changes to the event (e.g.,
                cancellation, postponement) to ticket holders through the
                Naitram platform in a timely manner.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">2.3</p>
              <p>
                {" "}
                The Promoter is responsible for issuing refunds in the event of
                cancellations, postponements, or significant changes to the
                event details, in accordance with Naitram’s refund policy.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">2.4</p>
              <p>
                {" "}
                The Promoter must ensure that ticket holders are admitted to the
                event, subject to compliance with any event-specific entry
                conditions or restrictions (e.g., age, dress code).
              </p>
            </div>
          </ol>
          {/* 3 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            3. Ticket Sales and Resale{" "}
          </p>
          <ol className="ml-4 space-y-4 ">
            <div className="flex">
              <p className="me-3">3.1</p>
              <p>
                The Promoter acknowledges that Naitram allows ticket holders to
                resell or transfer tickets through the platform until 48 hours
                before the event.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">3.2</p>
              <p>
                The Promoter must not restrict or invalidate ticket transfers or
                resales completed through Naitram, except where fraud or
                violation of event-specific terms is proven.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">3.3</p>
              <p>
                The Promoter is responsible for setting the original ticket
                price and ensuring the accuracy of all ticketing information.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">3.4</p>
              <p>
                {" "}
                The Promoter agrees that Naitram will collect a service fee for
                each ticket sale made through the platform, which will be
                disclosed prior to ticket listing.
              </p>
            </div>
          </ol>
          {/* 4 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            4. Insurance Requirements{" "}
          </p>
          <ol className="ml-4 space-y-4 ">
            <div className="flex">
              <p className="me-3">4.1</p>
              <p>
                {" "}
                The Promoter must maintain adequate insurance coverage for each
                event, including but not limited to public liability insurance,
                which covers potential risks to attendees, staff, and third
                parties.
              </p>
            </div>

            <div className="flex">
              <p className="me-3">4.2</p>
              <p>
                {" "}
                The Promoter must provide proof of insurance to Naitram upon
                request and before the event goes live on the platform.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">4.3</p>
              <p>
                {" "}
                The insurance must cover any liabilities arising from event
                cancellations, attendee injuries, or property damage that may
                occur during the event.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">4.4</p>
              <p>
                {" "}
                The Promoter is solely responsible for all claims, losses,
                damages, or expenses arising from any breach of the insurance
                requirements.{" "}
              </p>
            </div>
          </ol>
          {/* 5 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            5. Promoter’s Obligations for Event Safety{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">5.1</p>
              <p>
                The Promoter is responsible for ensuring that the event venue
                complies with all applicable health and safety regulations.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">5.2</p>
              <p>
                The Promoter must implement appropriate security measures,
                including crowd control, emergency planning, and accessibility
                for all attendees.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">5.3</p>
              <p>
                The Promoter must ensure that all necessary permits, licenses,
                and approvals (e.g., alcohol licensing, noise control) are
                obtained before the event date.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">5.4</p>
              <p>
                Any breach of safety regulations or failure to obtain required
                permits may result in the event being delisted from the Naitram
                platform, and the Promoter may be held liable for any damages
                incurred.{" "}
              </p>
            </div>
          </ol>
          {/* 6 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            6. Event Cancellations and Postponements{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">6.1</p>
              <p>
                In the event of a cancellation or postponement, the Promoter
                must notify Naitram and all ticket holders immediately through
                the platform.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">6.2</p>
              <p>
                {" "}
                The Promoter is responsible for providing clear instructions on
                refund procedures and any alternative arrangements (e.g.,
                rescheduling).
              </p>
            </div>{" "}
            <div className="flex">
              <p className="me-3">6.3</p>
              <p>
                Naitram reserves the right to mediate disputes between ticket
                holders and the Promoter, but the Promoter remains solely
                responsible for refunding ticket holders
              </p>
            </div>
            <div className="flex">
              <p className="me-3">6.4</p>
              <p>
                {" "}
                Failure to issue refunds in accordance with Naitram’s policy may
                result in penalties, including but not limited to removal from
                the platform and legal action
              </p>
            </div>
          </ol>
          {/* 7 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            7. Fees and Payment Terms{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">7.1</p>
              <p>
                {" "}
                Naitram will collect a service fee from the Promoter for each
                ticket sold via the platform. The applicable fees will be
                clearly communicated prior to the event listing.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">7.2</p>
              <p>
                {" "}
                Ticket sale proceeds, minus applicable fees, will be remitted to
                the Promoter after the event has successfully taken place,
                subject to compliance with all terms of this Agreement.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">7.3</p>
              <p>
                {" "}
                Naitram reserves the right to withhold payments in cases of
                event cancellations, refund claims, or disputes until such
                issues are resolved.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">7.4</p>
              <p>
                {" "}
                Any unpaid fees owed to Naitram by the Promoter must be settled
                within 30 days of the invoice date, failing which Naitram may
                charge interest and suspend access to the platform.
              </p>
            </div>
          </ol>
          {/* 8 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            8. Ticketing and Blockchain Verification{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">8.1</p>
              <p>
                {" "}
                Naitram uses blockchain technology to verify ticket authenticity
                and prevent fraud. The Promoter agrees to cooperate fully with
                the platform’s verification processes.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">8.2</p>
              <p>
                {" "}
                The Promoter must ensure that all ticket entries, seat
                allocations, and event details are accurate at the time of
                listing.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">8.3</p>
              <p>
                {" "}
                The Promoter cannot cancel or invalidate tickets after they have
                been transferred or resold via Naitram unless there is evidence
                of fraud or breach of the terms of sale.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">8.4</p>
              <p>
                {" "}
                Any attempt by the Promoter to manipulate ticket sales or
                defraud buyers will result in immediate delisting of the event
                and potential legal action
              </p>
            </div>
          </ol>
          {/* 9 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            9. Intellectual Property Rights
          </p>
          <ol className="space-y-4 ml-4 ">
            <div className="flex">
              <p className="me-3">9.1</p>
              <p>
                {" "}
                The Promoter grants Naitram a non-exclusive, royalty-free
                license to use any trademarks, logos, or promotional materials
                related to the event for the purpose of promoting ticket sales
                on the platform.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">9.2</p>
              <p>
                {" "}
                The Promoter represents that they have the legal right to use
                any intellectual property (e.g., music, images) associated with
                the event and that such use does not infringe on third-party
                rights.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">9.3</p>
              <p>
                {" "}
                The Promoter agrees to indemnify Naitram against any claims,
                damages, or losses arising from intellectual property
                infringement.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">9.4</p>
              <p>
                {" "}
                Naitram will not claim ownership over any intellectual property
                provided by the Promoter, but reserves the right to retain
                promotional materials for platform-related purposes.
              </p>
            </div>
          </ol>
          {/* 10 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            10. Marketing and Promotion{" "}
          </p>
          <ol className=" ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">10.1</p>
              <p>
                {" "}
                The Promoter is responsible for marketing and promoting their
                event, although Naitram may assist in event promotion at its
                discretion.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">10.2</p>
              <p>
                {" "}
                The Promoter must ensure that all marketing communications are
                accurate, comply with applicable advertising regulations, and do
                not mislead potential attendees.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">10.3</p>
              <p>
                Naitram reserves the right to review and approve any event
                marketing materials that use the Naitram platform or logo.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">10.4</p>
              <p>
                {" "}
                Any false or misleading promotions may result in event delisting
                and possible legal consequences for the Promoter.
              </p>
            </div>
          </ol>

          {/* 11 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            11. Dispute Resolution{" "}
          </p>
          <ol className=" ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">11.1</p>
              <p>
                {" "}
                Any disputes between the Promoter and ticket holders (e.g.,
                refunds, event changes) should be addressed by the Promoter in
                good faith and resolved in accordance with Naitram’s policies
              </p>
            </div>
            <div className="flex">
              <p className="me-3">11.2</p>
              <p>
                {" "}
                Naitram may mediate disputes at its discretion but assumes no
                liability for resolving conflicts between ticket holders and the
                Promoter.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">11.3</p>
              <p>
                {" "}
                Disputes between Naitram and the Promoter will be resolved
                through binding arbitration in accordance with the laws of
                England and Wales.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">11.4</p>
              <p>
                {" "}
                Any legal costs arising from disputes will be borne by the party
                found in breach of this Agreement.
              </p>
            </div>
          </ol>
          {/* 12 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            12. Data Protection and Privacy{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">12.1</p>
              <p>
                {" "}
                The Promoter must comply with all applicable data protection
                laws, including the UK GDPR, in relation to the collection,
                processing, and storage of ticket holder data.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">12.2</p>
              <p>
                {" "}
                Naitram will provide access to necessary ticket holder
                information for event management purposes only. The Promoter
                must not use this data for any unauthorised marketing or
                promotional purposes.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">12.3</p>
              <p>
                {" "}
                The Promoter must implement appropriate security measures to
                protect ticket holder data from unauthorised access, loss, or
                theft
              </p>
            </div>
            <div className="flex">
              <p className="me-3">12.4</p>
              <p>
                {" "}
                In the event of a data breach, the Promoter must immediately
                notify Naitram and comply with all relevant reporting
                obligations under data protection laws.
              </p>
            </div>
          </ol>

          {/* 13 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            13. Compliance with Laws{" "}
          </p>
          <ol className=" ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">13.1</p>
              <p>
                {" "}
                The Promoter agrees to comply with all applicable laws,
                regulations, and codes of conduct governing the organisation and
                execution of events.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">13.2</p>
              <p>
                {" "}
                The Promoter is solely responsible for ensuring that the event
                venue complies with all local laws, including health and safety
                regulations, accessibility requirements, and environmental
                standards.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">13.3</p>
              <p>
                {" "}
                Naitram reserves the right to delist events that do not comply
                with applicable laws or that are associated with illegal or
                unethical activities.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">13.4</p>
              <p>
                {" "}
                Any legal penalties or fines resulting from the Promoter’s
                failure to comply with laws and regulations will be borne solely
                by the Promoter.
              </p>
            </div>
          </ol>
          {/* 14 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            14. Force Majeure{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">14.1</p>
              <p>
                {" "}
                Neither party will be liable for any failure to perform its
                obligations under this Agreement if such failure results from
                circumstances beyond its reasonable control (e.g., natural
                disasters, strikes, government actions).
              </p>
            </div>
            <div className="flex">
              <p className="me-3">14.2</p>
              <p>
                {" "}
                In the event of force majeure, the affected party must notify
                the other party as soon as reasonably possible.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">14.3</p>
              <p>
                {" "}
                The Promoter remains responsible for refunding ticket holders if
                an event is cancelled due to force majeure, unless alternative
                arrangements are agreed upon by both parties.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">14.4</p>
              <p>
                {" "}
                Naitram will not be responsible for any losses incurred by the
                Promoter due to a force majeure event.
              </p>
            </div>
          </ol>
          {/* 15 bullet */}

          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            15. Termination of Agreement{" "}
          </p>
          <ol className=" ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">15.1</p>
              <p>
                {" "}
                Naitram reserves the right to terminate this Agreement at any
                time if the Promoter breaches any of the terms and conditions
                outlined in this Agreement.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">15.2</p>
              <p>
                {" "}
                The Promoter may terminate this Agreement by providing Naitram
                with written notice, but only if no active or upcoming events
                are listed on the platform.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">15.3</p>
              <p>
                {" "}
                Upon termination, the Promoter must settle any outstanding
                payments owed to Naitram and ensure all ticket holders are
                informed of the event status and any refunds due.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">15.4</p>
              <p>
                {" "}
                Termination of this Agreement does not absolve either party from
                their obligations under any active events or unresolved disputes
              </p>
            </div>
          </ol>
          {/* 16 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            16. Indemnity and Liability{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">16.1</p>
              <p>
                {" "}
                The Promoter agrees to indemnify, defend, and hold harmless
                Naitram and its affiliates from any claims, liabilities,
                damages, or expenses arising out of or related to the Promoter’s
                breach of this Agreement.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">16.2</p>
              <p>
                {" "}
                Naitram will not be held liable for any indirect, incidental, or
                consequential damages arising from the Promoter’s use of the
                platform, including but not limited to loss of profits, loss of
                business, or loss of goodwill.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">16.3</p>
              <p>
                {" "}
                Naitram’s total liability for any claims arising out of this
                Agreement shall be limited to the fees paid by the Promoter to
                Naitram for the relevant event.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">16.4</p>
              <p>
                {" "}
                The Promoter remains fully responsible for the safety, legality,
                and organisation of the event and acknowledges that Naitram acts
                solely as a facilitator of ticket sales.
              </p>
            </div>
          </ol>
          {/* 17 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            17. Governing Law and Jurisdiction{" "}
          </p>
          <ol className=" ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">17.1</p>
              <p>
                {" "}
                This Agreement is governed by and construed in accordance with
                the laws of England and Wales.{" "}
              </p>
            </div>
            <div className="flex">
              <p className="me-3">17.2</p>
              <p>
                {" "}
                Any disputes arising from this Agreement shall be subject to the
                exclusive jurisdiction of the courts of England and Wales.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">17.3</p>
              <p>
                {" "}
                The Promoter agrees to comply with all applicable laws and
                regulations in the jurisdiction where the event takes place.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">17.4</p>
              <p>
                {" "}
                If any provision of this Agreement is found to be invalid or
                unenforceable, the remaining provisions shall remain in full
                force and effect.
              </p>
            </div>
          </ol>

          {/* 18 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            18. Confidentiality
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">18.1</p>
              <p>
                {" "}
                The Promoter agrees to keep all confidential information
                received from Naitram, including pricing, fees, and user data,
                secure and not disclose it to any third party without prior
                written consent from Naitram.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">18.2</p>
              <p>
                Any breach of confidentiality by the Promoter will result in
                immediate termination of this Agreement and may lead to legal
                action.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">18.3</p>
              <p>
                {" "}
                Confidential information excludes information that is publicly
                available or already known to the Promoter before entering into
                this Agreement.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">18.4</p>
              <p>
                {" "}
                The obligations of confidentiality will survive the termination
                of this Agreement
              </p>
            </div>
          </ol>

          {/* 19 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            19. Amendments and Modifications{" "}
          </p>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">19.1</p>
              <p>
                {" "}
                Naitram reserves the right to modify or amend the terms of this
                Agreement at any time.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">19.2</p>
              <p>
                {" "}
                Any changes to the Agreement will be communicated to the
                Promoter via email or the Naitram platform, and continued use of
                the platform constitutes acceptance of the new terms.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">19.3</p>
              <p>
                {" "}
                If the Promoter does not agree to the modified terms, they must
                notify Naitram within 14 days of the notice and cease using the
                platform for event listings.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">19.4</p>
              <p>
                {" "}
                No changes or modifications by the Promoter are valid unless
                agreed to in writing by Naitram.
              </p>
            </div>
          </ol>

          {/* 20 bullet */}
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
            20. Entire Agreement{" "}
          </p>
          <ol className="ml-4 space-y-4">
            <div className="flex">
              <p className="me-3">20.4</p>
              <p>
                {" "}
                This Agreement constitutes the entire agreement between the
                parties and supersedes all prior agreements or understandings,
                whether written or oral, relating to its subject matter.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">20.2</p>
              <p>
                {" "}
                Any additional agreements or representations made by either
                party that are not included in this Agreement will not be
                binding unless made in writing and signed by both parties.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">20.3</p>
              <p>
                {" "}
                The Promoter acknowledges that they have not relied on any
                statements or representations by Naitram that are not explicitly
                set out in this Agreement.
              </p>
            </div>
            <div className="flex">
              <p className="me-3">20.4</p>
              <p>
                {" "}
                Any waiver of any right or provision of this Agreement must be
                in writing to be valid and does not constitute a waiver of
                future rights or provisions
              </p>
            </div>
          </ol>
          <p className="mt-4">
            By using the Naitram platform, the Promoter acknowledges and agrees
            to the terms and conditions set forth in this Agreement.
          </p>
        </ol>
      </div>
    </section>

      
    </>
  );
}
