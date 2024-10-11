import React from "react";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="pb-[20px] lg:text-xl text-[17px]">
          Naitram Limited ("Naitram", "we", "us", "our") is committed to
          protecting and respecting your privacy. This Privacy Policy explains
          how we collect, use, share, and protect your personal information when
          you use our services, including those related to Web3 and NFTs
          (Non-Fungible Tokens). By using the Naitram platform, you agree to the
          collection and use of information in accordance with this policy.
        </p>

        <ol className="list-decimal list-inside mt-4 ">
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold ">
            The Information We Collect and How We Collect It
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Personal Information: When you create a profile on Naitram, we
              collect your full name, mobile number, email address, and card
              details. Additionally, we may require you to verify your identity
              by providing a government-issued ID or other identification
              documents.
            </li>
            <li>
              Profile Information: You may also choose to provide a domain name
              as part of your profile.
            </li>
            <li>
              Event Interaction: We collect information when you interact in an
              event chat on the platform, pre-event. This includes chat
              messages, user interactions, and other data related to your
              participation in event discussions.
            </li>
            <li>
              Web3 and NFT Transactions: We collect information related to your
              Web3 interactions and NFT transactions on the platform, including
              wallet addresses, transaction history, and metadata associated
              with NFTs.
            </li>
            <li>
              Automatically Collected Information: We collect information about
              your device, browsing actions, and patterns, including:
              <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Time zone setting</li>
                <li>Browser plug-in types and versions</li>
                <li>Operating system and platform</li>
                <li>Referring URLs</li>
                <li>Pages you visit on our platform</li>
                <li>Access times and dates</li>
              </ul>
            </li>
            <li>
              Cookies and Tracking Technologies: We use cookies, pixel tags, and
              web storage to collect information about your online behavior and
              preferences. This helps us provide a more personalized experience
              and analyze site usage.
            </li>
          </ol>
          {/* 2 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            How Do We Use the Personal Information We Collect?
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Service Delivery: To provide, operate, and maintain our services,
              including processing transactions, managing your account,
              verifying your identity, and facilitating Web3 and NFT
              transactions.
            </li>
            <li>
              Communication: To communicate with you, including sending you
              updates, security alerts, and support messages.
            </li>
            <li>
              Improvement: To improve and customize our services, understand how
              users interact with our platform, and develop new features,
              including those related to Web3 and NFTs.
            </li>
            <li>
              Marketing: To send you promotional materials and offers, where
              permitted by law or with your consent.
            </li>
            <li>
              Security: To detect, prevent, and address fraud, security
              breaches, and other illegal activities. This includes verifying
              your identity and ensuring the integrity of transactions on our
              platform, including NFT transactions.
            </li>
            <li>
              Compliance: To comply with legal obligations, regulatory
              requirements, and industry standards.
            </li>
          </ol>
          {/* 3 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Who Do We Share Your Information With?
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4 ">
            <li>
              Service Providers: We may share your information with third-party
              service providers who perform services on our behalf, such as
              payment processing, data analysis, customer support, identity
              verification, and blockchain technology providers.
            </li>
            <li>
              Event Partners: Information may be shared with event partners for
              ticketing, event management, and security purposes.
            </li>
            <li>
              Legal Requirements: We may disclose your information if required
              to do so by law or in response to valid requests by public
              authorities.
            </li>
            <li>
              Business Transfers: In the event of a merger, acquisition, or sale
              of all or a portion of our assets, your information may be
              transferred to the new owner.
            </li>
          </ol>
          {/* 4 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            IP Addresses, Cookies, Pixel Tags, and Web Storage
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              IP Addresses: We use your IP address to help diagnose problems
              with our server, administer our platform, and gather demographic
              information.
            </li>
            <li>
              Cookies: We use cookies to enhance your experience, analyze site
              usage, and personalize content and advertisements. You can manage
              your cookie preferences through your browser settings.
            </li>
            <li>
              Pixel Tags: We use pixel tags to measure the effectiveness of our
              marketing campaigns and to track user interactions on our
              platform.
            </li>
            <li>
              Web Storage: We use web storage to store data locally on your
              device to improve performance and user experience.
            </li>
          </ol>
          {/* 5 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Where We Store Your Personal Data
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              Your personal data is stored on secure servers located within the
              European Economic Area (EEA). We take reasonable steps to protect
              your data, but we cannot guarantee its absolute security.
            </li>
          </ol>
          {/* 6 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Notice(s) of Security Breach Where Naitram is a Data Processor
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              In the event of a security breach, we will notify affected users
              and relevant authorities as required by law.
            </li>
          </ol>
          {/* 7 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Disclosure of Your Information
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              We may disclose your information to third parties in the following
              circumstances:
              <ul className="dashed list-inside ml-2 pt-[10px] space-y-1">
                <li>Compliance with legal obligations</li>
                <li>Protection of our rights and property</li>
                <li>Safeguarding the safety of our users and the public</li>
                <li>
                  As part of business transactions, such as mergers,
                  acquisitions, or sales
                </li>
              </ul>
            </li>
          </ol>
          {/* 8 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Updating Your Details
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              You can update your personal information through your account
              settings on the Naitram platform. Please ensure that your
              information is accurate and up to date.
            </li>
          </ol>
          {/* 9 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Your Rights
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              Access: You have the right to request access to the personal
              information we hold about you.
            </li>
            <li>
              Correction: You have the right to request correction of any
              inaccurate or incomplete information.
            </li>
            <li>
              Deletion: You have the right to request the deletion of your
              personal information, subject to certain conditions.
            </li>
            <li>
              Restriction: You have the right to request the restriction of
              processing of your personal information.
            </li>
            <li>
              Objection: You have the right to object to the processing of your
              personal information for direct marketing purposes.
            </li>
            <li>
              Portability: You have the right to request the transfer of your
              personal information to another service provider.
            </li>
          </ol>
          {/* 10 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Changes to This Privacy Policy
          </li>
          <ol className="list-decimal list-inside ml-4 ">
            <li>
              We may update this Privacy Policy from time to time. We will
              notify you of any significant changes by posting the new policy on
              our platform and updating the date at the top of this policy.
            </li>
          </ol>
          {/* 11 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Contacting Naitram and Making a Complaint
          </li>
          <ol className="list-decimal list-inside ml-4 space-y-4">
            <li>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at{" "}
              <a
                href="mailto:support@naitram.live"
                className="text-[#009540] font-extrabold underline cursor-pointer decoration-2 decoration-solid"
              >
                Support@naitram.live
              </a>
              .
            </li>
            <li>
              If you are not satisfied with our response, you have the right to
              lodge a complaint with the Information Commissioner's Office (ICO)
              or your local data protection authority.
            </li>
          </ol>
          <p className="pt-4">- - -</p>
          <p className="pt-4">
            This Privacy Policy provides detailed information on how Naitram
            collects, uses, shares, and protects your personal information,
            ensuring transparency and compliance with data protection on
            regulations, including considerations for Web3 and NFT interactions.
          </p>
        </ol>
      </div>
    </section>
  );
}
