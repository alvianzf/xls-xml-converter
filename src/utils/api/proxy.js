import axios from "axios";

async function handler(req, res) {
  const { xmlData, serviceName, username, password } = req.body;

  const envelope = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:coc="cocokms.xsd">
      <soapenv:Header/>
      <soapenv:Body>
          <coc:${serviceName}>
              <coc:username>${username}</coc:username>
              <coc:password>${password}</coc:password>
              <coc:fstream><![CDATA[${xmlData}]]></coc:fstream>
          </coc:${serviceName}>
      </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const response = await axios.post(
      "https://tpsonline.beacukai.go.id/tps/service.asmx?WSDL",
      envelope,
      {
        headers: {
          "Content-Type": "text/xml",
          Accept: "application/xml, text/xml",
          Username: username,
          Password: password,
        },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

export default handler;
