/**
 * ObjectFormatter is a class that provides a static method to format JSON data from a spreadsheet
 * into an object where headers are the keys and column values are arrays.
 *
 * Usage:
 * const formattedData = ObjectFormatter.format(jsonData);
 *
 * - `jsonData`: An array of arrays where the first array contains the headers and subsequent arrays contain the rows of data.
 *
 * Methods:
 * - `format(jsonData)`: Converts the input JSON data into an object where each header from the first row
 *   becomes a key in the object, and the values are arrays of data from the corresponding column.
 *
 * Author: Alvian Zachry F, M.Si
 * Github: https://github.com/alvianzf
 */

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
