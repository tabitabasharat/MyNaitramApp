import React from "react";
import "../PrivacyPolicy/PrivacyPolicy.css";

export default function AntiSlavery() {
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
          Anti-Slavery Policy (2024)
        </h1>
        <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mb-[14.4px]">
          Introduction
        </h3>

        <p className="pb-[20px] lg:text-xl text-[17px]">
          Naitram is committed to preventing modern slavery and human
          trafficking in all parts of our business and supply chains. This
          Anti-Slavery Policy is designed to ensure compliance with the Modern
          Slavery Act 2015 and reaffirms our commitment to ethical practices in
          all aspects of our operations.
        </p>

        <ol className="list-decimal list-inside mt-4 ">
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold ">
            Purpose
          </li>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Ensure that modern slavery and human trafficking have no place in
              our business activities.
            </li>
            <li>
              Identify and mitigate any risks associated with modern slavery.
            </li>
            <li>Promote an ethical and transparent supply chain.</li>
          </ul>
          {/* 2 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Scope
          </li>
          <p className="list-inside ml-2  space-y-1">
            This policy applies to all employees, contractors, business
            partners, and other third parties engaged with Naitram. It extends
            to all regions in which Naitram operates
          </p>
          {/* 3 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Zero-Tolerance Approach
          </li>
          <p className="list-inside ml-2  space-y-1">
            Naitram has a zero-tolerance approach to modern slavery and human
            trafficking. Any suspicion or report of modern slavery will be
            investigated, and appropriate remedial actions, including reporting
            to relevant authorities, will be taken.
          </p>
          {/* 4 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Employee Responsibility
          </li>
          <p>
            All Naitram employees are responsible for upholding this policy.
            Employees must:
          </p>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Report any suspicions or evidence of modern slavery in our
              business or supply chain.
            </li>
            <li>Comply with all relevant laws and regulations.</li>
            <li>
              Complete any required training on modern slavery prevention.
            </li>
          </ul>
          {/* 5 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4">
            Supply Chain Due Diligence
          </li>
          <p>
            We expect our suppliers and partners to share our commitment to
            human rights. Naitram will:
          </p>
          <ul className="dashed list-inside ml-2  space-y-1">
            <li>
              Conduct due diligence when engaging with new suppliers or partners
            </li>
            <li>
              Ensure all suppliers are aware of and comply with our Anti-Slavery
              Policy.
            </li>
            <li>
              Regularly review supply chain practices to ensure ongoing
              compliance with this policy.
            </li>
          </ul>
          {/* 6 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Reporting Concerns
          </li>
          <p className="list-inside ml-2 space-y-1">
            Employees, contractors, or other third parties who suspect modern slavery
            should report their concerns to <a href="mailto:support@naitram">support@naitram</a>.live without fear of retaliation.
            All reports will be treated confidentially and investigated promptly.
          </p>
          {/* 7 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Compliance and Disciplinary Actions
          </li>
          <p className="list-inside ml-2  space-y-1">
            Failure to comply with this policy will result in disciplinary
            actions, up to and including termination of contracts or employment.
            Violations may also be reported to relevant law enforcement agencies
            where appropriate.
          </p>
          {/* 8 bullet */}
          <li className="text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-4 ">
            Policy Review
          </li>
          <p className="list-inside ml-2 space-y-1">
            This policy will be reviewed and updated regularly to ensure
            continued compliance with legal requirements and best practices.
          </p>
        </ol>
      </div>
    </section>
  );
}
 