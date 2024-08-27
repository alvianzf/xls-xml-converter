import ExcelReader from "./excel_reader";
import ObjectFormatter from "./object_formatter";
import XMLFormatter from "./xml_formatter";

/**
 * Converter is a class that facilitates the conversion of Excel files to XML format.
 * It reads an Excel file, formats the data, and then converts it to XML.
 *
 * Usage:
 * const converter = new Converter(file);
 * converter.convert((xmlData) => {
 *   // Handle the XML data here
 * });
 *
 * - `file`: The Excel file to be converted.
 *
 * Methods:
 * - `convert(callback)`: Reads the Excel file, formats the data, converts it to XML, and then executes the callback with the XML data.
 * 
 * Author: Alvian Zachry F, M.Si
 * Github: https://github.com/alvianzf
 */

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
