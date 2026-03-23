export default function Spinner() {
    return (
      <div className="flex flex-col items-center justify-center py-8">
  <div className="w-10 h-10 border-4 border-[#008A3D] border-t-transparent rounded-full animate-spin"></div>  {/* Your spinner */}
  <p className="text-gray-500 mt-2">Loading...</p> {/* Text under spinner */}
</div>
      
  );
}