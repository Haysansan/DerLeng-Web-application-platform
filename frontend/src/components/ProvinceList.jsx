//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\components\ProvinceList.jsx
export default function ProvinceList({ provinces, onClickProvince }) {
  return (
    <div className="flex space-x-4 overflow-x-auto py-2">
      {provinces.map(prov => (
        <div key={prov._id} className="cursor-pointer" onClick={() => onClickProvince(prov._id)}>
          <div className="bg-blue-100 px-4 py-2 rounded-full">{prov.province_name}</div>
        </div>
      ))}
    </div>
  );
}