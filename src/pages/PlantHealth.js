import React from "react";
import { Image } from "primereact/image";


import { useLoaderData, redirect, json } from "react-router-dom";
import axios from "axios";

const PlantHealth = () => {
  const resData = useLoaderData();

  return (
    <div className="surface-0">
      <div className="font-medium text-3xl text-900 mb-3">Health Updates</div>
      <div className="card flex justify-content-center">
        <Image
          src={resData.plantInfo}
          alt="Image"
          width="250"
          loading="lazy"
          preview
        />
      </div>
      {!resData.is_healthy ? (
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Name</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {resData.plantName}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Disease Name</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {resData.diseaseName}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">
              Disease common name
            </div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {resData.diseaseLocalName}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Description</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {resData.description}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">
              Biological Treatment
            </div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {'treatmentBio' in resData ? (
                resData.treatmentBio.map((treatment, index) => (
                  <p key={index}>{treatment}</p>
                ))
              ) : (
                <strong>No biological treatment</strong>
              )}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">
              Chemical Treatment
            </div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {'treatmentChe' in resData ? (
                resData.treatmentChe.map((treatment, index) => (
                  <p key={index}>{treatment}</p>
                ))
              ) : (
                <strong>No chemical treatment</strong>
              )}
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">
              Prevention
            </div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {'preventions' in resData ? (
                resData.preventions.map((prevention, index) => (
                  <p key={index}>{prevention}</p>
                ))
              ) : (
                <strong>No Data Available</strong>
              )}
            </div>
          </li>
        </ul>
      ) : (
        <h3>Your Plant Is Healthy.</h3>
      )}
    </div>
  );
};
export default PlantHealth;

export async function plantHealthLoader({ request, params }) {
  if (localStorage.getItem("isLoggedIn") === null) return redirect("/login");
  const accessToken = params.accessToken;

  const response = await axios.get(
    `https://vriksha-server-n9vt.vercel.app/plant/healthInfo/${accessToken}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  

  if (response.status === 200) return json(response.data, { status: 200 });
  else throw json(response.response.data.message, { status: response.response.data.status });
}
