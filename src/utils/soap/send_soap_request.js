import axios from "axios";

const SERVICE_NAME = "CoCoKms_Tes";
const ENDPOINT = "https://tpsonline.beacukai.go.id/tps/service.asmx";
const USERNAME = "TES";
const PASSWORD = "1234";

const soapRequest = async (xmlData) => {
  const envelope = `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="https://www.w3.org/2001/XMLSchema"
                   xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <${SERVICE_NAME} xmlns="http://services.beacukai.go.id/">
          <fStream>${xmlData}</fStream>
          <Username>${USERNAME}</Username>
          <Password>${PASSWORD}</Password>
        </${SERVICE_NAME}>
      </soap:Body>
    </soap:Envelope>
  `;

  try {
    const response = await axios.post(ENDPOINT, envelope, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        Accept: "text/xml, application/xml",
        SOAPAction: `https://services.beacukai.go.id/${SERVICE_NAME}`,
      },
    });

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    const result = xmlDoc.getElementsByTagName(`${SERVICE_NAME}Result`)[0]?.textContent;

    const isSuccess = result.includes("Berhasil");
    return {
      status: isSuccess ? "success" : "danger",
      message: result,
    };
  } catch (error) {
    console.error("Error during SOAP request:", error);
    return {
      status: "error",
      message: "An error occurred",
    };
  }
};

export default soapRequest;
