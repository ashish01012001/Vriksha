import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { json, redirect, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyPlants = () => {
  const navigate = useNavigate();

  const plants = useLoaderData();

  const plantNameTemplate = (plant) => {
    return <b>{plant.name}</b>;
  };
  const imageBodyTemplate = (plant) => {
    return (
      <img
        src={plant.cldRes}
        alt={plant.name}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const imageDetailTemplate = (plant) => {
    return (
      <Button
        label="Detail"
        onClick={() => {
          navigate(`/myplants/${plant.accessToken}`);
        }}
      />
    );
  };

  const plantHealthTemplate = (plant) => {
    return (
      <Button
        label="Health"
        onClick={() => {
          navigate(`/myplants/health/${plant.accessToken}`);
        }}
      />
    );
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">My Plants</span>
    </div>
  );
  const footer = `In total there are ${
    plants.data === null ? 0 : plants.data.length
  } identification.`;

  return (
    <div className="card">
      <DataTable
        value={plants.data}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column header="Name" body={plantNameTemplate}></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column header="Details" body={imageDetailTemplate}></Column>
        <Column header="Health Condition" body={plantHealthTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default MyPlants;

export async function plantsLoader({ request, params }) {
  if (localStorage.getItem("isLoggedIn") === null) return redirect("/login");
  const response = await axios.get(
    `https://vriksha-server.onrender.com/plant/getInfo`,
    {
      headers: {
        Authorization: "Bearer " + `${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.status === 200) return json(response.data, { status: 200 });
  else throw json(response.message, { status: response.status });
}
