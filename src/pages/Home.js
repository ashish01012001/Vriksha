import React, { useState } from "react";
import { Button } from "primereact/button";
import { json, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [loadingP, setLoadingP] = useState(false);

  return (
    <>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12  p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl font-bold mb-1">
              Vriksha: Your Plant Helper
            </span>
            <div className="text-6xl text-primary font-bold mb-3">
              Vriksha is a use-friendly website that helps you identify plants
              and spot any diseases they might have using machine learning.
            </div>

            <ul className="mt-0 mb-4 text-700 line-height-3">
              <li>
                <b>Identify Plants:</b> Take a photo of a plant, and Vriksha
                will tell you what it is and give you some basic info about it.
              </li>
              <li>
                <b>Detect Diseases:</b> Upload a picture of a sick plant, and
                Vriksha will help you figure out what might be wrong and suggest
                possible treatments.
              </li>
              <li>
                <b>Care Tips:</b> Get simple tips on how to take care of your
                plants.
              </li>
            </ul>

            {localStorage.getItem("isLoggedIn") && (
              <Button
                label="My Plants"
                type="button"
                className="mr-3 p-button-raised"
                loading={loadingP}
                disabled={loadingP}
                onClick={() => {
                  setLoadingP(true);
                  navigate("/myplants");
                  setTimeout(() => {
                    setLoadingP(false);
                  }, 5000);
                }}
              />
            )}

            {localStorage.getItem("isLoggedIn") && (
              <Button
                label="New Identification"
                type="button"
                className="p-button-outlined"
                onClick={() => navigate("/newID")}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};
export default Home;

export async function homeLoader({ req, params }) {
  //if (!localStorage.getItem("isLoggedIn")) return redirect("/login");

  return json({ status: 200 });
}
