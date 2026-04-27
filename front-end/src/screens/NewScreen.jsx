// import { useState } from "react";

// const shoes = {
//   red: "https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Red+Shoe",
//   blue: "https://via.placeholder.com/300x200/0000FF/FFFFFF?text=Blue+Shoe",
//   green: "https://via.placeholder.com/300x200/008000/FFFFFF?text=Green+Shoe",
//   black: "https://via.placeholder.com/300x200/000000/FFFFFF?text=Black+Shoe",
// };

// export default function ShoeColorChanger() {
//   const [selectedColor, setSelectedColor] = useState("red");

//   return (
//     <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold">Nike Shoe Color Changer</h1>
//       <img src={shoes[selectedColor]} alt={`${selectedColor} shoe`} className="w-64 h-auto shadow-lg rounded-lg" />
//       <div className="flex gap-2">
//         {Object.keys(shoes).map((color) => (
//           <button
//             key={color}
//             className={`px-4 py-2 text-white rounded-md ${color === "black" ? "bg-gray-900" : `bg-${color}-500`}`}
//             onClick={() => setSelectedColor(color)}
//           >
//             {color.charAt(0).toUpperCase() + color.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
