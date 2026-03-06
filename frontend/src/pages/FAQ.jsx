import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is Derleng?",
    answer:
      "Derleng is a travel community platform where users can discover travel stories, share experiences, and explore Cambodia’s best destinations.",
  },
  {
    question: "How can I book a travel experience?",
    answer:
      "You can browse travel stories or packages and book directly through the platform by following the checkout steps.",
  },
  {
    question: "Do I need an account to use Derleng?",
    answer:
      "You can explore stories without an account, but you need to register to save favorites, like posts, or create your own travel story.",
  },
  {
    question: "How do I change my password?",
    answer:
      "Go to your Profile page → Click Change Password → Enter your current password and the new one, then save changes.",
  },
  {
    question: "Can I post my own travel story?",
    answer:
      "Yes! After logging in, you can upload your own travel story with photos, description, and location details.",
  },
  {
    question: "Is Derleng free to use?",
    answer:
      "Yes, Derleng is completely free for users to explore travel stories and connect with the community.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16">
      {/* PAGE HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-bold text-[#002B11]">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 mt-3">
          Find answers to the most common questions about Derleng.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm"
          >
            {/* QUESTION */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left"
            >
              <span className="text-lg font-semibold text-[#002B11]">
                {faq.question}
              </span>

              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-[#008A3D]" : ""
                }`}
              />
            </button>

            {/* ANSWER */}
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EXTRA SUPPORT SECTION */}
      <div className="max-w-4xl mx-auto text-center mt-16">
        <h2 className="text-xl font-bold text-[#002B11]">
          Still have questions?
        </h2>
        <p className="text-gray-500 mt-2">
          Contact our support team and we’ll be happy to help you.
        </p>

        <button className="mt-5 px-8 py-3 bg-[#008A3D] text-white font-semibold rounded-full hover:bg-[#006F31] transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}
