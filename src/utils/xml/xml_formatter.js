import { create } from "xmlbuilder2";

/**
 * XMLFormatter is a class that formats data into XML according to the specified schema.
 * The class allows for the creation of XML headers and content, based on the provided data.
 *
 * Usage:
 * const formatter = new XMLFormatter(data);
 * formatter.headerFormatter();
 * formatter.contentFormatter();
 * const xmlString = formatter.getFormattedXML();
 *
 * - `data`: An object containing the data to be formatted into XML.
 * - `HEADER_DATA`: A static array that defines the headers to be included in the XML.
 *
 * Methods:
 * - `headerFormatter()`: Formats and adds the header section of the XML.
 * - `contentFormatter()`: Formats and adds the content section (DETIL) of the XML.
 * - `getFormattedXML()`: Finalizes and returns the formatted XML string.
 *
 * Author: Alvian Zachry F, M.Si
 * Github: https://github.com/alvianzf
 */

class XMLFormatter {
  constructor(data) {
    this.data = data;
    this.XML = null;
  }

  headerFormatter() {
    this.XML = create({ version: "1.0", encoding: "utf-8" })
      .ele("DOCUMENT", { xmlns: "cocokms.xsd" })
      .ele("COCOKMS")
      .ele("HEADER");

    for (let i = 0; i < XMLFormatter.HEADER_DATA.length; i++) {
      const headerKey = XMLFormatter.HEADER_DATA[i];
      if (this.data.hasOwnProperty(headerKey)) {
        this.XML.ele(headerKey).txt(this.data[headerKey][0]);
      }
    }

    this.XML.up();
    this.XML.up();
  }

  contentFormatter() {
    if (!this.XML) {
      throw new Error("Header must be formatted first.");
    }

    this.XML = this.XML.up();
    this.XML.ele("DETIL");

    const length = this.data[this.data.headers[0]].length;
    for (let i = 0; i < length; i++) {
      const kmsElement = this.XML.ele("KMS");

      for (let j = 0; j < this.data.headers.length; j++) {
        const header = this.data.headers[j];
        const value = this.data[header][i];

        if (!XMLFormatter.HEADER_DATA.includes(header) && value) {
          kmsElement.ele(header).txt(value);
        }
      }

      kmsElement.up();
    }

    this.XML.up();
    this.XML.up();
  }

  getFormattedXML() {
    this.headerFormatter();
    this.contentFormatter();

    if (!this.XML) {
      throw new Error("XML not initialized.");
    }
    return this.XML.end({ prettyPrint: true });
  }
}

XMLFormatter.HEADER_DATA = [
  "KD_DOK",
  "KD_TPS",
  "NM_PENGANGKUT",
  "NO_FLIGHT",
  "CALL_SIGN",
  "TGL_TIBA",
  "KD_GUDANG",
  "REF_NUMBER",
];

export default XMLFormatter;
