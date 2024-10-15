import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function Eventpromoter() {
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
        <ol className="list-decimal list-inside mt-4 ">
          {/* 1 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Event Creation and Platform Usage{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              The Promoter is authorised to use the Naitram platform to create
              and manage events, subject to compliance with this Agreement
            </li>
            <li>
              The Promoter must provide accurate and complete information about
              the event, including but not limited to date, time, location,
              ticket prices, and any special restrictions.
            </li>
            <li>
              The Promoter must ensure all promotional materials (e.g., event
              descriptions, images) provided to Naitram are legal, accurate, and
              do not infringe upon third-party rights.
            </li>
            <li>
              Naitram reserves the right to review, approve, or reject events
              listed on the platform for any reason, including non-compliance
              with legal or ethical standards.
            </li>
          </ol>
          {/* 2 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Promoter Responsibilities Toward Ticket Holders{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4 ">
            <li>
              The Promoter must fulfill all obligations toward ticket holders,
              including ensuring that the event occurs as advertised unless
              prevented by force majeure (see clause 14).
            </li>
            <li>
              The Promoter must communicate any changes to the event (e.g.,
              cancellation, postponement) to ticket holders through the Naitram
              platform in a timely manner.
            </li>
            <li>
              The Promoter is responsible for issuing refunds in the event of
              cancellations, postponements, or significant changes to the event
              details, in accordance with Naitram’s refund policy.
            </li>
            <li>
              The Promoter must ensure that ticket holders are admitted to the
              event, subject to compliance with any event-specific entry
              conditions or restrictions (e.g., age, dress code).
            </li>
          </ol>
          {/* 3 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Ticket Sales and Resale{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4 ">
            <li>
              The Promoter acknowledges that Naitram allows ticket holders to
              resell or transfer tickets through the platform until 48 hours
              before the event.
            </li>
            <li>
              The Promoter must not restrict or invalidate ticket transfers or
              resales completed through Naitram, except where fraud or violation
              of event-specific terms is proven.
            </li>
            <li>
              The Promoter is responsible for setting the original ticket price
              and ensuring the accuracy of all ticketing information.
            </li>
            <li>
              The Promoter agrees that Naitram will collect a service fee for
              each ticket sale made through the platform, which will be
              disclosed prior to ticket listing.
            </li>
          </ol>
          {/* 4 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Insurance Requirements{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              The Promoter must maintain adequate insurance coverage for each
              event, including but not limited to public liability insurance,
              which covers potential risks to attendees, staff, and third
              parties.
            </li>

            <li>
              The Promoter must provide proof of insurance to Naitram upon
              request and before the event goes live on the platform.{" "}
            </li>
            <li>
              The insurance must cover any liabilities arising from event
              cancellations, attendee injuries, or property damage that may
              occur during the event.{" "}
            </li>
            <li>
              The Promoter is solely responsible for all claims, losses,
              damages, or expenses arising from any breach of the insurance
              requirements.{" "}
            </li>
          </ol>
          {/* 5 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Promoter’s Obligations for Event Safety{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              The Promoter is responsible for ensuring that the event venue
              complies with all applicable health and safety regulations.
            </li>

            <li>
              The Promoter must implement appropriate security measures,
              including crowd control, emergency planning, and accessibility for
              all attendees.{" "}
            </li>
            <li>
              The Promoter must ensure that all necessary permits, licenses, and
              approvals (e.g., alcohol licensing, noise control) are obtained
              before the event date.{" "}
            </li>
            <li>
              Any breach of safety regulations or failure to obtain required
              permits may result in the event being delisted from the Naitram
              platform, and the Promoter may be held liable for any damages
              incurred.{" "}
            </li>
          </ol>
          {/* 6 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Event Cancellations and Postponements{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              In the event of a cancellation or postponement, the Promoter must
              notify Naitram and all ticket holders immediately through the
              platform.
            </li>
            <li>
              The Promoter is responsible for providing clear instructions on
              refund procedures and any alternative arrangements (e.g.,
              rescheduling).
            </li>{" "}
            <li>
              Naitram reserves the right to mediate disputes between ticket
              holders and the Promoter, but the Promoter remains solely
              responsible for refunding ticket holders
            </li>
            <li>
              Failure to issue refunds in accordance with Naitram’s policy may
              result in penalties, including but not limited to removal from the
              platform and legal action
            </li>
          </ol>
          {/* 7 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Fees and Payment Terms{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram will collect a service fee from the Promoter for each
              ticket sold via the platform. The applicable fees will be clearly
              communicated prior to the event listing.
            </li>
            <li>
              Ticket sale proceeds, minus applicable fees, will be remitted to
              the Promoter after the event has successfully taken place, subject
              to compliance with all terms of this Agreement.
            </li>
            <li>
              Naitram reserves the right to withhold payments in cases of event
              cancellations, refund claims, or disputes until such issues are
              resolved.
            </li>
            <li>
              Any unpaid fees owed to Naitram by the Promoter must be settled
              within 30 days of the invoice date, failing which Naitram may
              charge interest and suspend access to the platform.
            </li>
          </ol>
          {/* 8 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Ticketing and Blockchain Verification{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram uses blockchain technology to verify ticket authenticity
              and prevent fraud. The Promoter agrees to cooperate fully with the
              platform’s verification processes.
            </li>
            <li>
              The Promoter must ensure that all ticket entries, seat
              allocations, and event details are accurate at the time of
              listing.
            </li>
            <li>
              The Promoter cannot cancel or invalidate tickets after they have
              been transferred or resold via Naitram unless there is evidence of
              fraud or breach of the terms of sale.
            </li>
            <li>
              Any attempt by the Promoter to manipulate ticket sales or defraud
              buyers will result in immediate delisting of the event and
              potential legal action
            </li>
          </ol>
          {/* 9 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Intellectual Property Rights
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              The Promoter grants Naitram a non-exclusive, royalty-free license
              to use any trademarks, logos, or promotional materials related to
              the event for the purpose of promoting ticket sales on the
              platform.
            </li>
            <li>
              The Promoter represents that they have the legal right to use any
              intellectual property (e.g., music, images) associated with the
              event and that such use does not infringe on third-party rights.
            </li>
            <li>
              The Promoter agrees to indemnify Naitram against any claims,
              damages, or losses arising from intellectual property
              infringement.
            </li>
            <li>
              Naitram will not claim ownership over any intellectual property
              provided by the Promoter, but reserves the right to retain
              promotional materials for platform-related purposes.
            </li>
          </ol>
          {/* 10 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Marketing and Promotion{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              The Promoter is responsible for marketing and promoting their
              event, although Naitram may assist in event promotion at its
              discretion.
            </li>
            <li>The Promoter must ensure that all marketing communications are 
accurate, comply with applicable advertising regulations, and do not mislead 
potential attendees.</li>
            <li>Naitram reserves the right to review and approve any event marketing 
            materials that use the Naitram platform or logo.</li>
            <li>Any false or misleading promotions may result in event delisting and 
            possible legal consequences for the Promoter.</li>
          </ol>

          {/* 11 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Dispute Resolution          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            Any disputes between the Promoter and ticket holders (e.g., refunds, 
event changes) should be addressed by the Promoter in good faith and 
resolved in accordance with Naitram’s policies
            </li>
            <li>Naitram may mediate disputes at its discretion but assumes no liability
            for resolving conflicts between ticket holders and the Promoter.</li>
            <li>Disputes between Naitram and the Promoter will be resolved through 
            binding arbitration in accordance with the laws of England and Wales.</li>
            <li>
            Any legal costs arising from disputes will be borne by the party found 
            in breach of this Agreement.
            </li>
          </ol>
          {/* 12 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Data Protection and Privacy          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            The Promoter must comply with all applicable data protection laws, 
including the UK GDPR, in relation to the collection, processing, and storage 
of ticket holder data.
            </li>
            <li>Naitram will provide access to necessary ticket holder information for 
event management purposes only. The Promoter must not use this data for 
any unauthorised marketing or promotional purposes.</li>
            <li>The Promoter must implement appropriate security measures to 
            protect ticket holder data from unauthorised access, loss, or theft</li>
            <li>
            In the event of a data breach, the Promoter must immediately notify 
Naitram and comply with all relevant reporting obligations under data 
protection laws.
            </li>
          </ol>

          {/* 13 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Compliance with Laws          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            The Promoter agrees to comply with all applicable laws, regulations, 
            and codes of conduct governing the organisation and execution of events.
            </li>
            <li>
            The Promoter is solely responsible for ensuring that the event venue 
complies with all local laws, including health and safety regulations, 
accessibility requirements, and environmental standards.
            </li>
            <li>Naitram reserves the right to delist events that do not comply with 
            applicable laws or that are associated with illegal or unethical activities.</li>
            <li>
            Any legal penalties or fines resulting from the Promoter’s failure to 
            comply with laws and regulations will be borne solely by the Promoter.
            </li>
          </ol>
          {/* 14 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Force Majeure          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            Neither party will be liable for any failure to perform its obligations 
under this Agreement if such failure results from circumstances beyond its 
reasonable control (e.g., natural disasters, strikes, government actions).
            </li>
            <li>In the event of force majeure, the affected party must notify the other 
            party as soon as reasonably possible.</li>
            <li>The Promoter remains responsible for refunding ticket holders if an 
event is cancelled due to force majeure, unless alternative arrangements are 
agreed upon by both parties.</li>
            <li>
            Naitram will not be responsible for any losses incurred by the Promoter 
            due to a force majeure event.
            </li>
          </ol>
          {/* 15 bullet */}

          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Termination of Agreement          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            Naitram reserves the right to terminate this Agreement at any time if 
the Promoter breaches any of the terms and conditions outlined in this 
Agreement.
            </li>
            <li>
            The Promoter may terminate this Agreement by providing Naitram with
written notice, but only if no active or upcoming events are listed on the 
platform.
            </li>
            <li>Upon termination, the Promoter must settle any outstanding payments 
owed to Naitram and ensure all ticket holders are informed of the event 
status and any refunds due.</li>
            <li>
            Termination of this Agreement does not absolve either party from their 
            obligations under any active events or unresolved disputes
            </li>
          </ol>
          {/* 16 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Indemnity and Liability          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            The Promoter agrees to indemnify, defend, and hold harmless Naitram 
and its affiliates from any claims, liabilities, damages, or expenses arising out
of or related to the Promoter’s breach of this Agreement.{" "}
            </li>
            <li>Naitram will not be held liable for any indirect, incidental, or 
consequential damages arising from the Promoter’s use of the platform, 
including but not limited to loss of profits, loss of business, or loss of goodwill</li>
            <li>Naitram’s total liability for any claims arising out of this Agreement 
shall be limited to the fees paid by the Promoter to Naitram for the relevant 
event. </li>
            <li>
            The Promoter remains fully responsible for the safety, legality, and 
organisation of the event and acknowledges that Naitram acts solely as a 
facilitator of ticket sales.
            </li>
          </ol>
          {/* 17 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Governing Law and Jurisdiction          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            This Agreement is governed by and construed in accordance with the 
            laws of England and Wales.{" "}
            </li>
            <li>Any disputes arising from this Agreement shall be subject to the 
            exclusive jurisdiction of the courts of England and Wales.</li>
            <li>The Promoter agrees to comply with all applicable laws and regulations
            in the jurisdiction where the event takes place.</li>
            <li>
            If any provision of this Agreement is found to be invalid or 
            unenforceable, the remaining provisions shall remain in full force and effect.
            </li>
          </ol>

          {/* 18 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Confidentiality
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
            The Promoter agrees to keep all confidential information received from 
Naitram, including pricing, fees, and user data, secure and not disclose it to 
any third party without prior written consent from Naitram.
            </li>
            <li>Any breach of confidentiality by the Promoter will result in immediate 
            termination of this Agreement and may lead to legal action.</li>
            <li>Confidential information excludes information that is publicly available 
            or already known to the Promoter before entering into this Agreement.</li>
            <li>The obligations of confidentiality will survive the termination of this 
            Agreement</li>
          </ol>

          {/* 19 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          Amendments and Modifications          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Naitram reserves the right to modify or amend the terms of this
              Agreement at any time.
            </li>
            <li>
              Any changes to the Agreement will be communicated to the Promoter
              via email or the Naitram platform, and continued use of the
              platform constitutes acceptance of the new terms.
            </li>
            <li>
              If the Promoter does not agree to the modified terms, they must
              notify Naitram within 14 days of the notice and cease using the
              platform for event listings.
            </li>
            <li>
              No changes or modifications by the Promoter are valid unless
              agreed to in writing by Naitram.
            </li>
          </ol>

          {/* 20 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Entire Agreement{" "}
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              This Agreement constitutes the entire agreement between the
              parties and supersedes all prior agreements or understandings,
              whether written or oral, relating to its subject matter.
            </li>
            <li>
              Any additional agreements or representations made by either party
              that are not included in this Agreement will not be binding unless
              made in writing and signed by both parties.
            </li>
            <li>
              The Promoter acknowledges that they have not relied on any
              statements or representations by Naitram that are not explicitly
              set out in this Agreement.
            </li>
            <li>
              Any waiver of any right or provision of this Agreement must be in
              writing to be valid and does not constitute a waiver of future
              rights or provisions
            </li>
          </ol>
          <p className="mt-4">
            By using the Naitram platform, the Promoter acknowledges and agrees
            to the terms and conditions set forth in this Agreement.
          </p>
        </ol>
      </div>
    </section>
  );
}
