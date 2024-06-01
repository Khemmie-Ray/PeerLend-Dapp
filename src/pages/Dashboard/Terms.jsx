import React, { useState } from 'react'

const Terms = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isChecked) {
        setIsSubmitted(true);
      }
    };

  return (
  <main className=''>
    <section className='bg-bg-gray border border-bg-ash/50 p-8 rounded-lg'>
    <p>Welcome to PeerLend, a peer-to-peer decentralized lending platform. By using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">Acceptance of Terms</h2>
            <p className='w-[100%] lg:w-[67%] md:w-[67%]'>By accessing and using PeerLend, you accept and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree to these terms, you should not use our platform.</p>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold"> Eligibility</h2>
            <p className='w-[100%] lg:w-[67%] md:w-[67%]'>To use PeerLend, you must be at least 18 years old and capable of forming a legally binding contract under applicable law. By using our platform, you represent and warrant that you meet these eligibility requirements.</p>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">Email Verification</h2>
            <p className='w-[100%] lg:w-[67%] md:w-[67%]'>You must verify your email to access certain features of PeerLend. You agree to provide accurate, current, and complete information during the verification process and to update such information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">User Conduct</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>You agree to use PeerLend only for lawful purposes and in accordance with these Terms and Conditions. You agree not to:</p>
            <ul className='list-disc mt-6 px-6'>
                <li>Use PeerLend in any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>Engage in any conduct that restricts or inhibits anyone’s use or enjoyment of PeerLend.</li>
                <li>Impersonate or attempt to impersonate PeerLend, a PeerLend employee, another user, or any other person or entity.</li>
            </ul>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">Lending and Borrowing</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>PeerLend facilitates peer-to-peer lending and borrowing. As a lender or borrower, you acknowledge and agree that:</p>
            <ul className='list-disc mt-6 px-6'>
                <li>PeerLend does not guarantee any transaction carried out outside of this platform.</li>
                <li>All lending and borrowing transactions are made directly between users while this platform serves as an escrow for resolution of repayment.</li>
                <li>Failure to make a repayment when due will result in a brief extension period. If repayment is still not made within this period, the borrower's collateral will be liquidated.</li>
            </ul>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">Fees</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>PeerLend may charge fees for certain services. All applicable fees will be disclosed to you prior to completing any transaction. You agree to pay all fees and charges incurred by you or on your behalf through PeerLend.</p>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">Privacy</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>Your use of PeerLend is also governed by our Privacy Policy, which explains how we collect, use, and disclose your personal information. By using PeerLend, you consent to the collection and use of your information as outlined in our Privacy Policy.</p>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold"> Intellectual Property</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>PeerLend and its entire contents, features, and functionality are owned by PeerLend, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">  Indemnification</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>You agree to defend, indemnify, and hold harmless PeerLend, its affiliates, licensors, and service providers,employees, agents, officers, and directors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms and Conditions or your use of PeerLend, including, but not limited to, your User Content, any use of PeerLend’s content, services, and products other than as expressly authorized in these Terms and Conditions, or your use of any information obtained from PeerLend.</p>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 w-[100%] lg:w-[30%] md:w-[30%] font-bold">  Changes to Terms and Conditions</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <p>PeerLend reserves the right to modify these Terms and Conditions at any time. All changes will be effective immediately upon posting to the platform. Your continued use of PeerLend after the posting of revised Terms and Conditions means that you accept and agree to the changes. It is your responsibility to check this page periodically for updates.</p>
        </div>
        </div>
        <div className='flex justify-between flex-col lg:flex-row md:flex-row my-6'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] w-[100%] lg:w-[30%] md:w-[30%] font-bold">Miscellaneous</h2>
            <div className='w-[100%] lg:w-[67%] md:w-[67%]'>
            <ul className='list-disc px-6'>
                <li>Entire Agreement: These Terms and Conditions constitute the entire agreement between you and PeerLend regarding the use of the platform and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the platform..</li>
                <li>Severability: If any provision of these Terms and Conditions is held by a court of competent jurisdiction to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</li>
                <li>Waiver: No waiver of any term or condition set forth in these Terms and Conditions will be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of PeerLend to assert a right or provision under these Terms and Conditions will not constitute a waiver of such right or provision.</li>
            </ul>
        </div>
        </div>
        <div>
        <div className='flex flex-col items-center'>
      {!isSubmitted && (
        <>
          <div className='flex justify-between align-center w-[100%]'>
            <input
              type="checkbox"
              className='w-[20px] h-[20px]'
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p className='w-[100%] lg:w-[95%] md:w-[95%] text-[14px] self-baseline'>
              By using PeerLend, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
            </p>
          </div>
          <div className='w-[100%] lg:w-[40%] md:w-[40%] mx-auto'>
            <button
              className="bg-[#E0BB83] text-darkGrey py-2 px-4 rounded-lg lg:text-[18px] md:text-[18px] text-[16px] my-4 mx-auto text-center font-bold w-[100%]"
              onClick={handleSubmit}
              disabled={!isChecked}
            >
              Accept
            </button>
          </div>
        </>
      )}
      {isSubmitted && (
        <div className='w-[100%] lg:w-[80%] md:w-[80%] text-center'>
          <p className='text-[16px] lg:text-[18px] md:text-[18px]'>Thank you for accepting the terms and conditions.</p>
        </div>
      )}
    </div>
    </div>
    </section>
  </main>
  )
}

export default Terms