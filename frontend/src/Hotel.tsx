// HotelListing.tsx
import React from "react";

interface Hotel {
  id: number;
  name: string;
  price: number;
  rating: number;
  review: string;
  imgUrl: string;
}

const hotels: Hotel[] = [
  {
    id: 1,
    name: "HOTEL PRITI INTERNATIONAL",
    price: 1200,
    rating: 5,
    review: "Excellent",
    imgUrl: "/path/to/img1.jpg",
  },
  {
    id: 2,
    name: "AVE MARIA HOLIDAY HOME",
    price: 1200,
    rating: 0,
    review: "Not Rated",
    imgUrl: "/path/to/img2.jpg",
  },
  // Add more hotel data as required...
];

export const Hotel: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Search and Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Where are you going?"
          className="border p-3 rounded-lg w-full md:w-1/4"
        />
        <div className="flex items-center space-x-4">
          <input type="date" className="border p-3 rounded-lg" />
          <input type="date" className="border p-3 rounded-lg" />
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="1 guest, 1 room"
            className="border p-3 rounded-lg"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            Search
          </button>
        </div>
      </div>

      {/* Sidebar Filters and Hotel List */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Filters */}
        <div className="w-full md:w-1/4 p-4 bg-white rounded-lg shadow mb-6 md:mr-6">
          <h3 className="text-lg font-semibold mb-4">Filter Price</h3>
          <input type="range" min="0" max="2000" className="w-full mb-6" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Apply
          </button>

          <h3 className="text-lg font-semibold mt-8 mb-4">Review Score</h3>
          <div className="space-y-2">
            <label>
              <input type="checkbox" /> Excellent
            </label>
            <label>
              <input type="checkbox" /> Very Good
            </label>
            <label>
              <input type="checkbox" /> Average
            </label>
            <label>
              <input type="checkbox" /> Poor
            </label>
            <label>
              <input type="checkbox" /> Terrible
            </label>
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={hotel.imgUrl}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">
                  From: ₹{hotel.price}/night
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm text-blue-600">
                    {hotel.rating}/5 {hotel.review}
                  </div>
                  <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
