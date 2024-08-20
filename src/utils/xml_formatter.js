const XML_HEADER = `<![CDATA[<DOCUMENT xmlns="cocokms.xsd">
<COCOKMS>
    <HEADER>
`;
const XML_BREAK = `</HEADER>
    <DETIL>
`;
const XML_FOOTER = `</DETIL>
</COCOKMS>
</DOCUMENT>]]>
`;

const headerFormatter = ({ headers }) => {
  let content = "";

  for (let i = 0; i < headers.length; i++) {
    content += `<${headers[i]}></${headers[i]}>
    `;
  }

  const header = XML_HEADER + content + XML_BREAK;

  return header;
};

const bodyFormatter = (data) => {
  const length = data[data.headers[0]].length;
  console.log(data.headers.length);
  let content = "";

  for (let i = 0; i < length; i++) {
    content += `<KMS>
    `;
    for (let j = 0; j < data.headers.length; j++) {
      if (data[data.headers[j]][i]) {
        content += `<${data.headers[j]}>${data[data.headers[j]][i]}</${
          data.headers[j]
        }>
              `;
      }
    }
    content += `</KMS>
    `;
  }

  return content;
};

const XMLformatter = (data) => {
  return headerFormatter(data) + bodyFormatter(data) + XML_FOOTER;
};

export { headerFormatter, bodyFormatter, XMLformatter };
