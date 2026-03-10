// import { useState } from "react";
// import { Folder, Building2, Briefcase, Users, Compass } from "lucide-react";

// export default function SubNav() {
//   const [activeTab, setActiveTab] = useState("search-all");

//   const tabs = [
//     { id: "search-all", label: "Search All", icon: Folder },
//     { id: "hotel-service", label: "Hotel & Service", icon: Building2 },
//     { id: "inventory", label: "Inventory", icon: Briefcase },
//     { id: "planning", label: "Planning", icon: Users },
//     { id: "tour-guides", label: "Tour Guides", icon: Compass },
//   ];

//   return (
//     <div className="w-full bg-white border-b border-gray-200 shadow-sm">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="flex items-center gap-8 overflow-x-auto">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center gap-2 py-4 px-2 font-medium text-sm transition-colors duration-200 border-b-2 ${
//                   isActive
//                     ? "border-[#002B11] text-[#002B11]"
//                     : "border-transparent text-gray-600 hover:text-[#002B11]"
//                 }`}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span>{tab.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
