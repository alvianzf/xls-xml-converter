import axios from "axios";
import handler from "../api/proxy";

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
const ENDPOINT = handler;
const USERNAME = import.meta.env.VITE_SOAP_USERNAME;
const PASSWORD = import.meta.env.VITE_SOAP_PASSWORD;

const soapRequest = async (xmlData) => {
  try {
    const response = await axios.post(
      ENDPOINT,
      {
        xmlData,
        serviceName: SERVICE_NAME,
        username: USERNAME,
        password: PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during SOAP request:", error);
    throw error;
  }
};

export default soapRequest;
