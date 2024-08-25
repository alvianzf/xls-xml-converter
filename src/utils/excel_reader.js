import * as Excel from "xlsx";

class ExcelReader {
  constructor(file) {
    this.file = file;
  }

  read(callback) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = Excel.read(data);
      const worksheet = workbook?.Sheets[workbook?.SheetNames[0]];
      const jsonData = Excel.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: true,
      });
      callback(jsonData);
    };

    reader.readAsArrayBuffer(this.file);
  }
}

export default ExcelReader;
