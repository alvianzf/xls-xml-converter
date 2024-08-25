import axios from "axios";

const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
const ENDPOINT = import.meta.env.VITE_ENDPOINT;
const USERNAME = import.meta.env.VITE_SOAP_USERNAME;
const PASSWORD = import.meta.env.VITE_SOAP_PASSWORD;

const soapRequest = (xmlData) => {
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

  return axios.post(ENDPOINT, envelope, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
};

export default soapRequest;
