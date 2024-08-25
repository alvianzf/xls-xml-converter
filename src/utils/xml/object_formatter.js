class ObjectFormatter {
    static format(jsonData) {
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
  
      return result;
    }
  }
  
  export default ObjectFormatter;
  