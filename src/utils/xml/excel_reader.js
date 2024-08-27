import * as Excel from "xlsx";

/**
 * ExcelReader is a class that handles reading Excel files and converting them into JSON format.
 * It utilizes the `xlsx` library to process the Excel file and extract data from the first worksheet.
 *
 * Usage:
 * const reader = new ExcelReader(file);
 * reader.read((jsonData) => {
 *   // Handle the JSON data here
 * });
 *
 * - `file`: The Excel file to be read (a `File` object).
 *
 * Methods:
 * - `read(callback)`: Reads the Excel file, converts the first worksheet to JSON, and executes the callback with the JSON data.
 * 
 * Author: Alvian Zachry F, M.Si
 * Github: https://github.com/alvianzf
 */

class ExcelReader {
  constructor(file) {
    this.file = file;
  }

  read(callback) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = Excel.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
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
