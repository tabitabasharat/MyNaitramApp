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
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mb-4">
       1. The Information We Collect and How We Collect It
        </p>
        <ol className=" ml-4 space-y-4">
        <div className="flex">
            <p className="me-3">1.1</p>
            <p>               Personal Information: When you create a profile on Naitram, we
            collect your full name, mobile number, email address, and card
            details. Additionally, we may require you to verify your identity
            by providing a government-issued ID or other identification
            documents.</p>
          </div>
          <div className="flex">
            <p className="me-3">1.2</p>
            <p>               Profile Information: You may also choose to provide a domain name
            as part of your profile.</p>
          </div>
          <div className="flex">
            <p className="me-3">1.3</p>
            <p>               Event Interaction: We collect information when you interact in an
            event chat on the platform, pre-event. This includes chat
            messages, user interactions, and other data related to your
            participation in event discussions.</p>
          </div>
          <div className="flex">
            <p className="me-3">1.4</p>
            <p>               Web3 and NFT Transactions: We collect information related to your
            Web3 interactions and NFT transactions on the platform, including
            wallet addresses, transaction history, and metadata associated
            with NFTs.</p>
          </div>
          <div>
          <div className="flex">
            <p className="me-3">1.5</p>
            <p>               Automatically Collected Information: We collect information about
            your device, browsing actions, and patterns, including:</p>
            </div>
            <div>
            <ul className="dashed list-inside ml-10 pt-[10px] space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Time zone setting</li>
              <li>Browser plug-in types and versions</li>
              <li>Operating system and platform</li>
              <li>Referring URLs</li>
              <li>Pages you visit on our platform</li>
              <li>Access times and dates</li>
            </ul>
          </div>
          </div>
          <div className="flex">
            <p className="me-3">1.6</p>
            <p>               Cookies and Tracking Technologies: We use cookies, pixel tags, and
            web storage to collect information about your online behavior and
            preferences. This helps us provide a more personalized experience
            and analyze site usage.</p>
          </div>
        </ol>
        {/* 2 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4 ">
        2.  How Do We Use the Personal Information We Collect?
        </p>
        <ol className="list-decimal list-inside ml-4 space-y-4">
        <div className="flex">
            <p className="me-3">2.1</p>
            <p>               Service Delivery: To provide, operate, and maintain our services,
            including processing transactions, managing your account,
            verifying your identity, and facilitating Web3 and NFT
            transactions.</p>
          </div>
          <div className="flex">
            <p className="me-3">2.2</p>
            <p>               Communication: To communicate with you, including sending you
            updates, security alerts, and support messages.</p>
          </div>
          <div className="flex">
            <p className="me-3">2.3</p>
            <p>               Improvement: To improve and customize our services, understand how
            users interact with our platform, and develop new features,
            including those related to Web3 and NFTs.</p>
          </div>
          <div className="flex">
            <p className="me-3">2.4</p>
            <p>               Marketing: To send you promotional materials and offers, where
            permitted by law or with your consent.</p>
          </div>
          <div className="flex">
            <p className="me-3">2.5</p>
            <p>               Security: To detect, prevent, and address fraud, security
            breaches, and other illegal activities. This includes verifying
            your identity and ensuring the integrity of transactions on our
            platform, including NFT transactions.</p>
          </div>
          <div className="flex">
            <p className="me-3">2.6</p>
            <p>              Compliance: To comply with legal obligations, regulatory
            requirements, and industry standards.</p>
          </div>
        </ol>
        {/* 3 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4 ">
        3.  Who Do We Share Your Information With?
        </p>
        <ol className="ml-4 space-y-4 ">
        <div className="flex">
            <p className="me-3">3.1</p>
            <p>              Service Providers: We may share your information with third-party
            service providers who perform services on our behalf, such as
            payment processing, data analysis, customer support, identity
            verification, and blockchain technology providers.</p>
          </div>
          <div className="flex">
            <p className="me-3">3.2</p>
            <p>              Event Partners: Information may be shared with event partners for
            ticketing, event management, and security purposes.</p>
          </div>
          <div className="flex">
            <p className="me-3">3.3</p>
            <p>              Legal Requirements: We may disclose your information if required
            to do so by law or in response to valid requests by public
            authorities.</p>
          </div>
          <div className="flex">
            <p className="me-3">3.4</p>
            <p>
            Business Transfers: In the event of a merger, acquisition, or sale
            of all or a portion of our assets, your information may be
            transferred to the new owner.</p>
          </div>
        </ol>
        {/* 4 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
         4. IP Addresses, Cookies, Pixel Tags, and Web Storage
        </p>
        <ol className="ml-4 space-y-4">
        <div className="flex">
            <p className="me-3">4.1</p>
            <p>              IP Addresses: We use your IP address to help diagnose problems
            with our server, administer our platform, and gather demographic
            information.</p>
          </div>
          <div className="flex">
            <p className="me-3">4.2</p>
            <p>              Cookies: We use cookies to enhance your experience, analyze site
            usage, and personalize content and advertisements. You can manage
            your cookie preferences through your browser settings.</p>
          </div>
          <div className="flex">
            <p className="me-3">4.3</p>
            <p>              Pixel Tags: We use pixel tags to measure the effectiveness of our
            marketing campaigns and to track user interactions on our
            platform.</p>
          </div>
          <div className="flex">
            <p className="me-3">4.4</p>
            <p>
              {" "}
              Web Storage: We use web storage to store data locally on your
              device to improve performance and user experience.
            </p>
          </div>
        </ol>
        {/* 5 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
          5. Where We Store Your Personal Data
        </p>
        <ol className="space-y-4 ml-4 ">
          <div className="flex">
            <p className="me-3">5.1</p>
            <p>
              {" "}
              Your personal data is stored on secure servers located within
              the European Economic Area (EEA). We take reasonable steps to
              protect your data, but we cannot guarantee its absolute
              security.
            </p>
          </div>
        </ol>
        {/* 6 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
          6. Notice(s) of Security Breach Where Naitram is a Data Processor
        </p>
        <ol className="space-y-4 ml-4 ">
          <div className="flex">
            <p className="me-3">6.1</p>
            <p>
              {" "}
              In the event of a security breach, we will notify affected users
              and relevant authorities as required by law.
            </p>
          </div>
        </ol>
        {/* 7 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
          7. Disclosure of Your Information
        </p>
        <ol className=" ml-4 space-y-4">
          <div>
            <div className="flex">
              <p className="me-3">7.1</p>
              <p>
                We may disclose your information to third parties in the
                following circumstances:
              </p>
            </div>
            <div>
              <ul className="dashed list-inside ml-10 pt-[10px] space-y-1">
                <li>Compliance with legal obligations</li>
                <li>Protection of our rights and property</li>
                <li>Safeguarding the safety of our users and the public</li>
                <li>
                  As part of business transactions, such as mergers,
                  acquisitions, or sales
                </li>
              </ul>
            </div>
          </div>
        </ol>
        {/* 8 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
          8. Updating Your Details
        </p>
        <ol className="ml-4 space-y-4">
          <div className="flex">
            <p className="me-3">8.1</p>
            <p>
              {" "}
              You can update your personal information through your account
              settings on the Naitram platform. Please ensure that your
              information is accurate and up to date.
            </p>
          </div>
        </ol>
        {/* 9 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
          9. Your Rights
        </p>
        <ol className="list-decimal list-inside ml-4 space-y-4">
          <div className="flex">
            <p className="me-3">9.1</p>
            <p>
              {" "}
              Access: You have the right to request access to the personal
              information we hold about you.
            </p>
          </div>
          <div className="flex">
            <p className="me-3">9.2</p>
            <p>
              {" "}
              Correction: You have the right to request correction of any
              inaccurate or incomplete information.
            </p>
          </div>
          <div className="flex">
            <p className="me-3">9.3</p>
            <p>
              {" "}
              Deletion: You have the right to request the deletion of your
              personal information, subject to certain conditions.
            </p>
          </div>
          <div className="flex">
            <p className="me-3">9.4</p>
            <p>
              {" "}
              Restriction: You have the right to request the restriction of
              processing of your personal information.
            </p>
          </div>
          <div className="flex">
            <p className="me-3">9.5</p>
            <p>
              {" "}
              Objection: You have the right to object to the processing of
              your personal information for direct marketing purposes.
            </p>
          </div>
          <div className="flex">
            <p className="me-3">9.6</p>
            <p>
              {" "}
              Portability: You have the right to request the transfer of your
              personal information to another service provider.
            </p>
          </div>
        </ol>
        {/* 10 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
          10. Changes to This Privacy Policy
        </p>
        <ol className="ml-4 space-y-4">
          <div className="flex">
            <p className="me-3">10.1</p>
            <p>
              {" "}
              We may update this Privacy Policy from time to time. We will
              notify you of any significant changes by posting the new policy
              on our platform and updating the date at the top of this policy.
            </p>
          </div>
        </ol>
        {/* 11 bullet */}
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold my-4">
          11. Contacting Naitram and Making a Complaint
        </p>
        <ol className="ml-4 space-y-4">
          <div className="flex">
            <p className="me-3">11.1</p>
            <p>
              {" "}
              If you have any questions or concerns about this Privacy Policy
              or our data practices, please contact us at{" "}
              <a
                href="mailto:support@naitram.live"
                className="text-[#009540] font-extrabold underline cursor-pointer decoration-2 decoration-solid"
              >
                Support@naitram.live
              </a>
              .
            </p>
          </div>
          <div className="flex">
            <p className="me-3">11.2</p>
            <p>
              {" "}
              If you are not satisfied with our response, you have the right
              to lodge a complaint with the Information Commissioner's Office
              (ICO) or your local data protection authority.
            </p>
          </div>
        </ol>
        {/* <p className="pt-4">- - -</p> */}
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
