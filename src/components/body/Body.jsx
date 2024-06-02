// import React, { useEffect, useState } from "react";
// import "./body.css";
// import Rescard from "../rescard/Rescard";
// import { RES_API_URL } from "../../utils/constant";
// import RescardSkelton from "../rescardSkelton/RescardSkelton";
// import { useDispatch } from "react-redux";
// import { setRestaurant } from "../../redux/slices/restslice";

// const Body = () => {
//   const [reslist, setReslist] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const resdata = await fetch(RES_API_URL);
//     const resjson = await resdata.json();
//     setReslist(
//       resjson?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
//         ?.restaurants
//     );
//     dispatch(
//       setRestaurant(
//         resjson?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
//           ?.restaurants
//       )
//     );
//   };

//   return reslist.length === 0 ? (
//     <RescardSkelton />
//   ) : (
//     <div className="body-wrapper">
//       <div className="container">
//         <div className="res-container">
//           {reslist.map((res) => {
//             return <Rescard resdata={res} key={res.info.id} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Body;




import React, { useEffect, useState } from "react";
import "./body.css";
import Rescard from "../rescard/Rescard";
import { RES_API_URL } from "../../utils/constant";
import RescardSkelton from "../rescardSkelton/RescardSkelton";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../redux/slices/restslice";

const Body = () => {
  const [reslist, setReslist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resdata = await fetch(RES_API_URL);

      if (!resdata.ok) {
        throw new Error(`Network response was not ok: ${resdata.statusText}`);
      }

      const resjson = await resdata.json();

      // Safely access the nested properties with optional chaining and provide a default empty array
      const restaurants =
        resjson?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ?? [];

      if (!Array.isArray(restaurants)) {
        throw new Error('Unexpected response structure: restaurants is not an array');
      }

      setReslist(restaurants);
      dispatch(setRestaurant(restaurants));
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle the error as needed, for example, by setting an error state
      setReslist([]); // Optionally set to an empty array on error
    }
  };

  return reslist.length === 0 ? (
    <RescardSkelton />
  ) : (
    <div className="body-wrapper">
      <div className="container">
        <div className="res-container">
          {reslist.map((res) => (
            <Rescard resdata={res} key={res.info.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
