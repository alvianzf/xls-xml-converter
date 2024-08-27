import axios from "axios";

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
const ENDPOINT = import.meta.env.VITE_ENDPOINT;
const USERNAME = import.meta.env.VITE_SOAP_USERNAME;
const PASSWORD = import.meta.env.VITE_SOAP_PASSWORD;

const soapRequest = async (xmlData) => {
  const envelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <tem:${SERVICE_NAME}>
            <tem:fStream>${xmlData}</tem:fStream>
            <tem:Username>${USERNAME}</tem:Username>
            <tem:Password>${PASSWORD}}</tem:Password>
          </tem:${SERVICE_NAME}>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

  try {
    const response = await axios.post(ENDPOINT, envelope, {
      headers: {
        "Content-Type": "text/xml",
        Accept: "application/xml, text/xml",
        SOAPAction: "http://tempuri.org/coarricodeco_kemasan",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during SOAP request:", error);
    throw error;
  }
};

export default soapRequest;
