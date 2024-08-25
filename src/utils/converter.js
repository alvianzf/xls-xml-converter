import ExcelReader from "./excel_reader";
import ObjectFormatter from "./object_formatter";
import XMLFormatter from "./xml_formatter";

class Converter {
  constructor(file) {
    this.file = file;
  }

  convert(callback) {
    const reader = new ExcelReader(this.file);

    reader.read((jsonData) => {
      const formattedData = ObjectFormatter.format(jsonData);
      const xmlFormatter = new XMLFormatter(formattedData);
      const xmlData = xmlFormatter.getFormattedXML();

      callback(xmlData);
    });
  }
}

export default Converter;
