// src/data/products.js
import tent from "../assets/tent.jpg";
import sleepingBag from "../assets/sleeping-bag.jpg";
import sleepingPad from "../assets/sleeping-pad.jpg";
import pillow from "../assets/pillow.jpg";
import stove from "../assets/stove.jpg";
import cookset from "../assets/cookset.jpg";
import tableChair from "../assets/table-chair.jpg";
import headlamp from "../assets/headlamp.jpg";
import sunscreen from "../assets/sunscreen.jpg";

export const products = [
  { id: 1, name: "Tent (2-3 person)", type: "Shelter", catalogue: "Basic dome tent suitable for dry season", minPrice: 30, maxPrice: 80, image: tent },
  { id: 2, name: "Sleeping bag (20–25°C)", type: "Sleeping", catalogue: "Lightweight summer sleeping bag", minPrice: 15, maxPrice: 35, image: sleepingBag },
  { id: 3, name: "Sleeping pad / air mattress", type: "Sleeping", catalogue: "Foam pad or inflatable mattress", minPrice: 16, maxPrice: 40, image: sleepingPad },
  { id: 4, name: "Camping pillow", type: "Sleeping", catalogue: "Inflatable or compressible", minPrice: 5, maxPrice: 15, image: pillow },
  { id: 5, name: "Portable gas stove", type: "Cooking", catalogue: "Single-burner canister stove", minPrice: 25, maxPrice: 40, image: stove },
  { id: 6, name: "Cook set (pot/pan)", type: "Cooking", catalogue: "Aluminum cookset for 2–3", minPrice: 15, maxPrice: 35, image: cookset },
  { id: 7, name: "Table + chairs", type: "Camp furniture", catalogue: "Folding table and 2–4 chairs", minPrice: 40, maxPrice: 120, image: tableChair },
  { id: 8, name: "Headlamp", type: "Lighting", catalogue: "LED headlamp with AAA/USB", minPrice: 6, maxPrice: 20, image: headlamp },
  { id: 9, name: "Sunscreen (SPF 30+)", type: "Health & safety", catalogue: "Water-resistant", minPrice: 6, maxPrice: 15, image: sunscreen },
];
