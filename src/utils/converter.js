import * as Excel from "xlsx";
import * as XML from "./xml_formatter";

const readExcel = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = Excel.read(data);

    const worksheet = workbook?.Sheets[workbook?.SheetNames[0]];
    const jsonData = Excel.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: true,
    });

    const xmlData = formatObject(jsonData);

    callback(xmlData);
  };

  reader.readAsArrayBuffer(file);
};

const formatObject = (jsonData) => {
  const headers = jsonData[0];
  const result = { headers };

  headers.forEach((header) => {
    result[header] = [];
  });

  jsonData.slice(1).forEach((row) => {
    headers.forEach((header, index) => {
      result[header].push(index < row.length ? row[index] : null);
    });
  });

  console.log({ result });

  const xml = XML.XMLformatter(result);

  return xml;
};

export default readExcel;
