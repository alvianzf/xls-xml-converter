import axios from "axios";

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
const ENDPOINT = import.meta.env.VITE_ENDPOINT;
const USERNAME = import.meta.env.VITE_SOAP_USERNAME;
const PASSWORD = import.meta.env.VITE_SOAP_PASSWORD;

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

const soapRequest = async (xmlData) => {
  const envelope = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:coc="cocokms.xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <coc:${SERVICE_NAME}>
            <coc:username>${USERNAME}</coc:username>
            <coc:password>${PASSWORD}</coc:password>
            <coc:fstream><![CDATA[${xmlData}]]></coc:fstream>
        </coc:${SERVICE_NAME}>
    </soapenv:Body>
</soapenv:Envelope>`;

  try {
    const response = await axios.post(proxyUrl + ENDPOINT, envelope, {
      headers: {
        "Content-Type": "application/xml",
        Accept: "application/xml, text/xml",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during SOAP request:", error);
    throw error;
  }
};

export default soapRequest;
