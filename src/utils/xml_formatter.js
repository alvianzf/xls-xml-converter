class XMLFormatter {
  constructor(data) {
    this.data = data;
  }

  getFormattedXML() {
    return this.headerFormatter() + this.bodyFormatter() + this.constructor.XML_FOOTER;
  }

  headerFormatter() {
    let content = "";

    for (let i = 0; i < this.constructor.HEADER_DATA.length; i++) {
      if (this.data[this.constructor.HEADER_DATA[i]]) {
        content += `<${this.constructor.HEADER_DATA[i]}>${this.data[this.constructor.HEADER_DATA[i]]}</${this.constructor.HEADER_DATA[i]}>
      `;
      }
    }

    const header = this.constructor.XML_HEADER + content + this.constructor.XML_BREAK;
    return header;
  }

  bodyFormatter() {
    const length = this.data[this.data.headers[0]].length;
    let content = "";

    for (let i = 0; i < length; i++) {
      content += `<KMS>
`;
      for (let j = 0; j < this.data.headers.length; j++) {
        if (this.data[this.data.headers[j]][i]) {
          content += `<${this.data.headers[j]}>${this.data[this.data.headers[j]][i]}</${this.data.headers[j]}>
`;
        }
      }
      content += `</KMS>`;
    }

    return content;
  }
}

XMLFormatter.XML_HEADER = `<?xml version="1.0" encoding="utf-8"?>
<DOCUMENT xmlns="cocokms.xsd">
<COCOKMS>
<HEADER>
`;
XMLFormatter.XML_BREAK = `</HEADER>
<DETIL>
`;
XMLFormatter.XML_FOOTER = `
</DETIL>
</COCOKMS>
</DOCUMENT>
`;

XMLFormatter.HEADER_DATA = [
  "KD_DOK",
  "KD_TPS",
  "NM_ANGKUT",
  "NO_VOY_FLIGHT",
  "CALL_SIGN",
  "TGL_TIBA",
  "KD_GUDANG",
  "REF_NUMBER",
];

export default XMLFormatter;
