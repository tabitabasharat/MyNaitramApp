import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function Dataprotection() {
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
          Privacy Disclaimer for Naitram Ltd (England and Wales)
        </h1>
        <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mb-[14.4px]">
          Effective Date: 27 September 2024
        </h3>

        <p className="pb-[20px] lg:text-xl text-[17px]">
          At Naitram, we are committed to protecting your privacy and ensuring
          that your personal information is handled responsibly. This Privacy
          Disclaimer outlines how we collect, use, and protect your personal
          information when you use our platform, including our website and
          mobile application.
        </p>

        <ol className="list-decimal list-inside mt-4 ">
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold ">
            Data Collection and Use
          </li>

          <p>
            We collect personal data when you interact with our platform,
            including but not limited to:
          </p>
          <ul className="dashed list-inside ml-2 py-[10px] space-y-1">
            <li>
              Personal Information: Full name, email address, payment
              information, contact details, and any other information necessary
              to process ticket purchases, transfers, or sales.
            </li>
            <li>
              Usage Data: Information about your interactions with our platform,
              such as browsing history, IP addresses, and other metadata.
            </li>
            <li>
              Transaction Data: Data related to ticket purchases, sales, and
              transfers, including the events you attend and tickets bought or
              sold through the platform.
            </li>
          </ul>
          <p>We use this data to:</p>
          <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
            <li>Facilitate ticket sales and exchanges.</li>
            <li>
              Improve user experience by personalising content and services.{" "}
            </li>
            <li>Provide customer support and handle transaction disputes.</li>
            <li>
              Ensure compliance with legal obligations, including those related
              to fraud prevention and anti-money laundering.
            </li>
          </ul>
          {/* 2 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Assumption of Risk
          </li>
          <p>
            By using the Naitram platform, you understand and agree to the
            following risks and limitations:
          </p>
          <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
            <li>
              Event Cancellation: The event promoter or organiser assumes full
              responsibility for any event cancellations, rescheduling, or
              alterations. Naitram is not liable for refunds or compensation in
              case of event cancellations or changes. Any claims or disputes
              must be addressed directly with the event promoter or organiser.
            </li>
            <li>
              Ticket Authenticity: Naitram employs blockchain technology to
              create a secure environment for ticket transactions. However, you
              assume the risk associated with the purchase, sale, or transfer of
              tickets. Naitram provides no warranties concerning the accuracy,
              completeness, or legality of tickets bought, sold, or exchanged on
              the platform.{" "}
            </li>
            <li>
              Limited Warranties: Naitram does not warrant that our platform
              will always operate without errors or that defects will be
              corrected promptly. We cannot guarantee that any event ticket
              listed on our platform is not subject to third-party rights or
              other restrictions.
            </li>
          </ul>
          {/* 3 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Assumption of Liability
          </li>
          <p>Naitram does not assume liability for::</p>
          <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
            <li>
              Personal or Property Damage: Any injury or loss resulting from
              attending events for which tickets are purchased via our platform.{" "}
            </li>
            <li>
            Third-Party Websites or Content: Links to third-party websites, content, or services are for informational purposes only, and we do not accept responsibility for their content, security, or privacy practices.
            </li>{" "}
          </ul>
          {/* 4 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Your Rights{" "}
          </li>
          <p>You have the right to:</p>
          <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
            <li>
              Access Your Data: Request copies of the personal data we store.
            </li>
            <li>
              Delete Your Data: Request the deletion of your personal data,
              subject to legal and contractual limitations.
            </li>{" "}
            <li>
              Withdraw Consent: Revoke consent for the processing of personal
              data where applicable{" "}
            </li>
          </ul>
          {/* 5 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Cookies and Tracking{" "}
          </li>
          <p>
            We use cookies and similar tracking technologies to enhance user
            experience and for analytical purposes. You can manage or disable
            cookies through your browser settings, although doing so may affect
            your experience on our platform
          </p>
          {/* 6 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Changes to the Policy{" "}
          </li>
          <p className="list-inside ml-2 pt-[10px] space-y-1">
            We may update this Privacy Disclaimer from time to time. Users will
            be notified of any significant changes through our platform.
            Continued use of our services after such updates constitutes
            acceptance of the revised terms.
          </p>
          {/* 7 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Contact Information{" "}
          </li>
          <p className="list-inside ml-2 pt-[10px] space-y-1">
            For any questions or concerns regarding this Privacy Disclaimer,
            please contact us at: support@naitram.live
          </p>
        </ol>
      </div>
    </section>
  );
}
