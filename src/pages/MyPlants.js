import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { json, redirect, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyPlants = () => {
  const navigate = useNavigate();
  const [detailP, setDetail] = useState({ loading: false, index: 0 });
  const [healthP, setHealth] = useState({ loading: false, index: 0 });

  const plantsData = useLoaderData();
  

  const plantNameTemplate = (plant) => {
    return <b>{plant.data.name}</b>;
  };
  const imageBodyTemplate = (plant) => {
    return (
      <img
        src={plant.data.cldRes}
        alt={plant.data.name}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const imageDetailTemplate = (plant) => {
    return (
      <Button
        label="Detail"
        loading={detailP.index === plant.index ? detailP.loading : false}
        disabled={detailP.index === plant.index ? detailP.loading : false}
        onClick={() => {
          setDetail({
            loading: true,
            index: plant.index,
          });
          navigate(`/myplants/${plant.data.accessToken}`);
          setTimeout(() => {
            setDetail({
              loading: false,
              index: 0,
            });
          }, 5000);
        }}
      />
    );
  };

  const plantHealthTemplate = (plant) => {
    return (
      <Button
        label="Health"
        loading={healthP.index === plant.index ? healthP.loading : false}
        disabled={healthP.index === plant.index ? healthP.loading : false}
        onClick={() => {
          setHealth({
            loading: true,
            index: plant.index,
          });
          navigate(`/myplants/health/${plant.data.accessToken}`);
          setTimeout(() => {
            setHealth({
              loading: false,
              index: 0,
            });
          }, 5000);
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
    plantsData === null ? 0 : plantsData.length
  } identification.`;

  return (
    <div className="card">
      <DataTable
        value={plantsData}
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
    `https://vriksha-server-n9vt.vercel.app/plant/getInfo`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const plantsData = [];
  for (let i = 0; i < response.data.data.length; i++) {
    let plantData = {
      data: response.data.data[i],
      index: i,
    };
    plantsData.push(plantData);
  }

  if (response.status === 200) return json(plantsData, { status: 200 });
  else throw json(response.message, { status: response.status });
}
