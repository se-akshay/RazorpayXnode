import React from "react";

const Card = ({ title, description, price, imageUrl, courseId, handlePayment }) => {
  return (
    <div className="w-[300px] bg-slate-900 rounded-2xl overflow-hidden shadow-xl text-white">
      
      {/* Top Gradient Section */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 flex justify-center items-center">
        <img src={imageUrl} alt={title} className="w-28 h-auto" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>

        <p className="text-slate-400 text-sm mb-4">
          {description}
        </p>

        <p className="mb-4">
          Price:{" "}
          <span className="text-xl font-bold">${price}</span>
        </p>

        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition duration-200 font-semibold"
        onClick={()=>handlePayment(courseId,price)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
