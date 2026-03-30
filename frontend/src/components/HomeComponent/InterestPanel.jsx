// import { useNavigate } from "react-router-dom";
// import historical from "../../assets/interestPanel/interest/historical.jpg";
// import citylife from "../../assets/interestPanel/interest/city-life.jpg";
// import relaxing from "../../assets/interestPanel/interest/relaxing.jpg";
// import adventure from "../../assets/interestPanel/interest/adventure.jpg";

// export default function InterestPanel() {
//   const navigate = useNavigate();

//   const interests = [
//     { id: 1, title: "City Life", image: citylife },
//     { id: 2, title: "Adventure", image: adventure },
//     { id: 3, title: "Relaxing", image: relaxing },
//     { id: 4, title: "Historical", image: historical },
//   ];

//   const handleCardClick = (title) => {
//     navigate(`/discover?category=${title}`);
//   };

//   return (
//     <div className="w-full bg-white py-8 px-6">
//       <div className="mx-auto max-w-7xl">
//         <h2 className="text-2xl font-bold mb-6">Explore by Interest</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {interests.map((interest) => (
//             <div
//               key={interest.id}
//               onClick={() => handleCardClick(interest.title)}
//               className="relative w-full h-[240px] rounded-lg overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity"
//             >
//               {/* Image */}
//               <img
//                 src={interest.image}
//                 alt={interest.title}
//                 className="w-full h-full object-cover"
//               />

//               {/* Gradient Overlay */}
//               <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 via-black/60 to-transparent flex items-center px-4">
//                 <h3 className="text-white text-lg font-extrabold tracking-wide">
//                   {interest.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\components\HomeComponent\InterestPanel.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/place.service";
import { categoryImages } from "../../data/imageMap";

export default function InterestPanel() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCategories();
      setCategories(data || []);
    };

    load();
  }, []);

  const normalizeKey = (name = "") =>
    name.toLowerCase().replace(/\s/g, "");

  const getCategoryImage = (name) => {
    const key = normalizeKey(name);
    return categoryImages[key] || "https://via.placeholder.com/300";
  };

  return (
  <div className="w-full bg-white py-8">
    {/* 🔥 fixed width container (adds left/right gap like your other UI) */}
    <div className="mx-auto max-w-7xl px-1">
      <h2 className="text-2xl font-bold mb-6">
        Explore by Interest
      </h2>

      {/* 🔥 scroll wrapper (keeps padding effect inside scroll) */}
      <div className="relative">
        {/* scroll container */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() =>
                navigate(`/posts/category/${cat._id}`)
              }
              className="min-w-[280px] h-[240px] relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition flex-shrink-0"
            >
              {/* image */}
              <img
                src={getCategoryImage(cat.category_name)}
                className="w-full h-full object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0  flex items-end p-3">
                <h3 className="text-white font-bold">
                  {cat.category_name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}