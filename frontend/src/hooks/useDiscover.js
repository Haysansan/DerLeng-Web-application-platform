//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\hooks\useDiscover.js
import { useEffect, useState } from "react";
import { getCategories, getProvinces } from "../services/place.service";

export function useDiscover() {
  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const cats = await getCategories();
        const provs = await getProvinces();

        setCategories(cats);
        setProvinces(provs);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, provinces, loading };
}