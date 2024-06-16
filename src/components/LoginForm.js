import React, { useState, useRef, useContext } from "react";
import UserInfo from "../store/user-info";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import "./FormDemo.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const toast = useRef(null);
  const userCtx = useContext(UserInfo);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const validate = (data) => {
    let errors = {};

    if (!data.emailId) {
      errors.emailId = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.emailId)
    ) {
      errors.emailId = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    } else if (data.password.length < 5) {
      errors.password = "Password should be atleat 5 character long";
    }

    return errors;
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const onSubmit = async (data, form) => {
    setLoading(true);
    const response = await fetch(
      "https://vriksha-server-n9vt.vercel.app/auth/login",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setLoading(false);
    if (result.status === 422) showError(result.message);
    if (result.status === 403) showError(result.message);
    if (result.status === 401) showError(result.message);
    if (result.status === 404) showError(result.message);
    if (result.status === 200) {
      userCtx.changeLog(true);

      userCtx.changeImg(result.imageUrl);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", result.token);
      localStorage.setItem("imageUrl", result.imageUrl);
      setFormData(data);
      setShowMessage(true);
    }
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => navigate("/")}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Minimum 5 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Toast ref={toast} />
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Login Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Welcome Back 
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h4 className="text-center">Login in</h4>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              emailId: "",
              password: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="emailId"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <InputText
                          id="emailId"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="emailId"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  label="Submit"
                  className="mt-2"
                  loading={loading}
                  disabled={loading}
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
