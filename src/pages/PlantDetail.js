import React from "react";
import { Image } from "primereact/image";
import { Chip } from "primereact/chip";

import { useLoaderData, redirect, json } from "react-router-dom";
import axios from "axios";

const PlantDetail = () => {
  const response = useLoaderData();
  const plantDetail = response.plantDetail;

  return (
    <div className="surface-0">
      <div className="font-medium text-3xl text-900 mb-3">Plant Detail</div>
      <div className="card flex justify-content-center">
        <Image
          src={plantDetail.cldRes}
          alt="Image"
          width="250"
          loading="lazy"
          preview
        />
      </div>
      <ul className="list-none p-0 m-0">
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Name</div>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {plantDetail.name}
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Common Name</div>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {plantDetail.common_names !== null ? (
              plantDetail.common_names.map((name, index) => (
                <Chip key={index} label={name} className="mr-2" />
              ))
            ) : (
              <strong>No Common Names</strong>
            )}
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Edible Parts</div>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {plantDetail.edible_parts !== null ? (
              plantDetail.edible_parts.map((part, index) => (
                <Chip key={index} label={part} className="mr-2" />
              ))
            ) : (
              <b>Information not available</b>
            )}
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Family</div>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {plantDetail.family}
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Description</div>
          <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {plantDetail.description}
          </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
          <div className="text-500 w-6 md:w-2 font-medium">Watering Needs</div>
          {plantDetail.watering ? (
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              <b>Maximum:</b> {plantDetail.watering.max} times
              <hr />
              <b>Minimum:</b> {plantDetail.watering.min} times
            </div>
          ) : (
            <b>Information not available</b>
          )}
        </li>
      </ul>
    </div>
  );
};
export default PlantDetail;

export async function plantDetailLoader({ request, params }) {
  if (localStorage.getItem("isLoggedIn") === null) return redirect("/login");
  const accessToken = params.accessToken;
  const response = await axios.get(
    `https://vriksha-server-n9vt.vercel.app/plant/plantdetail/${accessToken}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.status === 200) return json(response.data, { status: 200 });
  else throw json(response.data, { status: response.status });
}
