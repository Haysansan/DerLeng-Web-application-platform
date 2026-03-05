//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\components\CategoryList.jsx
export default function CategoryList({ categories, onClickCategory }) {
  return (
    <div className="flex space-x-4 overflow-x-auto py-2">
      {categories.map(cat => (
        <div key={cat._id} className="cursor-pointer" onClick={() => onClickCategory(cat._id)}>
          <div className="bg-green-100 px-4 py-2 rounded-full">{cat.category_name}</div>
        </div>
      ))}
    </div>
  );
}