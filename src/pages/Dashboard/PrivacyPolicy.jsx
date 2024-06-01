import React from 'react'

const PrivacyPolicy = () => {
  return (
    <main>
        <section>
            <div className='bg-bg-gray border-bg-ash/45 border p-8 rounded-lg text-[16px] mb-8'>
                <p>At PeerLend, we prioritize the privacy of our users. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our peer-to-peer decentralized lending platform. By accessing or using PeerLend, you agree to the terms of this Privacy Policy.</p>
            </div>
            <div className='bg-bg-gray border-bg-ash/45 border p-8 rounded-lg text-[16px] mb-8'>
                <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 font-bold">Information we collect</h2>
                <p>When you register or interact with our Platform, we may collect personal information, including but not limited to:</p>
                <ul className='list-disc p-6'>
                    <li>Email address</li>
                    <li>Wallet address</li>
                    <li>Gitcoin Passport Score</li>
                </ul>
            </div>
            <div className='bg-bg-gray border-bg-ash/45 border p-8 rounded-lg text-[16px] mb-8'>
                <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 font-bold">How We Use Your Information</h2>
                <p>We use the collected information for various purposes, including to:</p>
                <ul className='list-disc p-6'>
                    <li>Provide and maintain our platform</li>
                    <li>Process transactions and manage user accounts</li>
                    <li>Communicate with users, including for customer service and support</li>
                    <li>Improve our platform and develop new features</li>
                    <li>Personalize user experience.</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </div>
            <div className='bg-bg-gray border-bg-ash/45 border p-8 rounded-lg text-[16px] mb-8'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 font-bold">Security of Your Information</h2>
                <p>We implement a variety of security measures to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the absolute security of your data.</p>
            </div>
            <div className='bg-bg-gray border-bg-ash/45 border p-8 rounded-lg text-[16px] mb-8'>
            <h2 className="lg:text-[18px] md:text-[18px] text-[16px] mb-6 font-bold">Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of the platform after any changes constitutes your acceptance of the new terms.</p>
                <p className='my-6'>By using PeerLend, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy.</p>
            </div>
        </section>
    </main>
  )
}

export default PrivacyPolicy