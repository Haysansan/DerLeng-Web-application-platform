//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\components\CategoryList.jsx
// frontend/src/components/CategoryList.jsx
import { useNavigate } from "react-router-dom";

export default function CategoryList({ categories = [] }) {
  const navigate = useNavigate();

  const handleClick = (cat) => {
    navigate(`/posts/category/${cat._id}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto whitespace-nowrap py-2 px-2 scrollbar-hide">
      {categories.map((cat) => (
        <div
          key={cat._id}
          onClick={() => handleClick(cat)}
          className="cursor-pointer flex-shrink-0"
        >
          <div className="bg-green-100 px-4 py-2 rounded-full hover:bg-green-200 transition">
            {cat.category_name}
          </div>
        </div>
      ))}
    </div>
  );
}