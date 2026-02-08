import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Avers Financial",
  description: "Privacy Policy for Avers Financial consulting services in Serbia. Learn how we protect your personal data.",
  openGraph: {
    title: "Privacy Policy | Avers Financial",
    description: "Privacy Policy for Avers Financial consulting services in Serbia",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              Avers Financial (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your personal information 
              when you use our financial consulting and tax advisory services in Serbia.
            </p>
            <p className="text-gray-600">
              Last updated: January 31, 2026
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name and contact details (email, phone number)</li>
                <li>Business and financial information</li>
                <li>Tax identification numbers</li>
                <li>Company registration details</li>
                <li>Communication records</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>IP address and browser information</li>
                <li>Cookies and usage data</li>
                <li>Device information</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide financial consulting and tax advisory services</li>
              <li>To communicate with you about our services</li>
              <li>To maintain business records</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To improve our services and website functionality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-gray-600">
              Your data is stored securely and only accessible to authorized personnel who need 
              it to provide our services to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Retention</h2>
            <p className="text-gray-600">
              We retain your personal information only as long as necessary to fulfill the purposes 
              for which it was collected, comply with legal obligations, resolve disputes, and 
              enforce our agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">Under Serbian data protection laws, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Restrict processing of your information</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We may share your information with trusted third-party service providers who assist us 
              in operating our business, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Payment processors</li>
              <li>Cloud storage providers</li>
              <li>Analytics services</li>
              <li>Legal and compliance consultants</li>
            </ul>
            <p className="text-gray-600 mt-4">
              These third parties are contractually obligated to protect your information and 
              may only use it for the specific services they provide to us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">International Data Transfers</h2>
            <p className="text-gray-600">
              Your personal information may be transferred to and processed in countries outside 
              Serbia. We ensure such transfers comply with applicable data protection laws and 
              implement appropriate safeguards to protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to enhance your experience on our website. 
              Cookies help us:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve our services</li>
            </ul>
            <p className="text-gray-600 mt-4">
              You can control cookies through your browser settings. However, disabling cookies 
              may affect some website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or how we handle your personal 
              information, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                <strong>Email:</strong> privacy@aversacc.com<br />
                <strong>Phone:</strong> +381 60 397 3097<br />
                <strong>Address:</strong> Belgrade, Serbia
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by posting the new policy on our website and updating the 
              &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}