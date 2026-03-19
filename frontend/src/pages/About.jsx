//C:\Users\DELL\Documents\Cadt\cadty3t2\New folder (2)\DerLeng-Web-application-platform\frontend\src\pages\About.jsx
import { useState } from "react";
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
import team4 from "../assets/team4.png";
import team6 from "../assets/team6.png";

export default function About() {
  const [activeTab, setActiveTab] = useState("About Derleng");

  const tabs = [
    "About Derleng",
    "Contact Us",
  ];

  const sidebarLinks = [
    "Logo & Guidelines",
    "Trust & Safety",
    "Case Studies",
    "Business Marketing Tools",
  ];

  const teamMembers = [
    {
      name: "Eng Vireak Sathya",
      role: "Leader, Derleng Project",
      desc: `Eng Vireak Sathya is the Leader of the Derleng Project, guiding the vision of a community-driven travel platform focused on Cambodia. Through collaborative leadership and digital innovation, Sathya helps empower locals to share authentic experiences and highlight the country’s beauty, culture, and hidden gems.`,
      img: null,
    },
    {
      name: "Eang Haysan",
      role: "Members, Derleng Project",
      desc: `Eang Haysan is a member of the Derleng Project, contributing to design and collaboration through Figma. Haysan supports the development of user-friendly interfaces that help shape how travelers explore and connect with Cambodia’s stories and destinations.`,
      img: team1,
    },
    {
      name: "Oem Rachna",
      role: "Members, Derleng Project",
      desc: `Oem Rachna is a member of the Derleng Project, supporting platform development and user experience. Rachna works closely with the team to enhance functionality, streamline features, and ensure the platform effectively connects travelers with Cambodia’s hidden gems and cultural stories.`,
      img: team3,
      },
    {
      name: "Pleng Lailhong",
      role: "Members, Derleng Project",
      desc: `Pleng Laihong is a member of the Derleng Project, contributing to content organization and user engagement. Laihong helps make the platform more intuitive and enjoyable, guiding travelers to discover Cambodia’s culture, landmarks, and unique experiences.`,
      img: team2,
      },
    {
      name: "Vorn Sansutheavy",
      role: "Members, Derleng Project",
      desc: `Vorn Sansutheavy is a member of the Derleng Project, focusing on improving platform performance and technical functionality. Sansutheavy collaborates with the team to ensure a seamless and reliable experience for travelers exploring Cambodia’s attractions and hidden gems.`,
      img: team4,
    },
    {
      name: "Sren Seavchhy",
      role: "Members, Derleng Project",
      desc: `Sren Seavchhy is a member of the Derleng Project, focusing on improving platform functionality and user engagement. Seavchhy works with the team to ensure a smooth, intuitive experience for travelers, helping them discover Cambodia’s culture, attractions, and hidden gems.`,
      img: team6,
    },
  ];

  // ===== TAB CONTENT COMPONENTS =====
  const renderTabContent = () => {
    switch (activeTab) {
      case "About Derleng":
        return (
          <div>
            <h2 className="text-xl font-bold text-[#008A3D] mb-4">
              About Derleng
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Derleng connects people to travel experiences worth sharing, with a clear focus on Cambodia. Built for locals and travelers alike, Derleng aims to become the most trusted source for discovering places, stories, and experiences across the country.
Through shared journeys, honest reviews, and rich local insight, Derleng helps people explore Cambodia more deeply—from well-known landmarks to hidden gems often missed. Our platform brings together community-driven content, practical travel guidance, and discovery tools that make it easier to find places to visit, eat, stay, and experience.
By combining local knowledge with modern technology, Derleng bridges travelers and destinations, helping communities gain visibility while guiding visitors with real, relevant information. Every story, review, and recommendation contributes to celebrating Cambodia’s beauty, culture, and diversity—shaping a travel ecosystem built on trust, authenticity, and shared discovery.
            </p>

            <h2 className="text-xl font-bold text-[#008A3D] mb-6">
              Our Team
            </h2>
            <div className="space-y-10">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex gap-6 items-start border-b pb-8">
                  <div className="w-[90px] h-[90px] bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        👤
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#008A3D]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-blue-500 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Contact Us":
        return (
          <div>
            <h2 className="text-xl font-bold text-[#008A3D] mb-6">
              Contact Us
            </h2>
            <form className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-4 py-2"
              />
              <textarea
                placeholder="Message"
                className="w-full border rounded-xl px-4 py-2"
                rows={4}
              />
              <button className="bg-[#008A3D] text-white py-2 px-6 rounded-xl hover:bg-green-700">
                Send Message
              </button>
                </form>
                <div>
                    <div className="h-20" />
                </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white">
      {/* HERO IMAGE */}
      <div
        className="w-full h-[230px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* TOP TABS */}
      <div className="flex justify-center mt-6">
        <div className="flex border rounded-md overflow-hidden w-[650px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-gray-100 text-[#008A3D]"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto mt-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="shadow-md rounded-md p-4 h-fit">
          {sidebarLinks.map((link) => (
            <p
              key={link}
              className="text-sm text-gray-600 py-2 hover:text-[#008A3D] cursor-pointer"
            >
              {link}
            </p>
          ))}
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3">{renderTabContent()}</div>
      </div>
    </div>
  );
}
