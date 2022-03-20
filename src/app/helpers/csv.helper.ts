
export class CSVHelper {

   /**
    * Convert CSV to array
    *
    * @static
    * @param {string} csv
    * @param {string} [delimiter=';']
    * @return {*} 
    * @memberof CSVHelper
    */
   static CSVToArray(csv: string, delimiter: string = ';') {
      if (csv) {
         csv = csv.replace(/(\r\n)/gm, '\n');
         const rows = csv.split('\n').filter(item => item != '');
         const arr = rows.map((row) => {
            const values = row.split(delimiter);
            const el = values.reduce((obj: any, header: string, index: number) => {
               obj['Prop' + (index + 1)] = values[index];
               return obj;
            }, {});
            return el;
         });
         return arr;
      } {
         return [];
      }

   }

   /**
    * Convert array to CSV
    *
    * @static
    * @param {any[]} arr
    * @param {string} [delimiter=';']
    * @return {*} 
    * @memberof CSVHelper
    */
   static arrayToCSV(arr: any[], delimiter: string = ';') {
      let CSV = '';
      const arrLength = arr.length;
      if (arrLength) {
         arr.forEach((item, index) => {
            CSV += Object.values(item).join(delimiter);
            if (index != arrLength - 1) {
               CSV += '\r\n';
            }
         })
      }
      return CSV;
   }

   /**
    * CSV check
    *
    * @static
    * @param {string} value
    * @param {string} [delimiter=';']
    * @return {*}  {boolean}
    * @memberof CSVHelper
    */
   static isCSV(value: string, delimiter: string = ';'): boolean {
      value = value.replace(/(\r\n)/gm, '\n');
      const rows = value.split('\n');
      if (rows.length >= 1) {
         const columnCount = rows[0].split(delimiter).length;
         for (let row of rows) {
            const rowValues = row.split(delimiter);
            if (rowValues.length == 1 && rowValues[0] == '') {
               continue;
            }
            if (rowValues.length > 0 && rowValues.length != columnCount) {
               return false;
            }
         }
         return true;
      }
      return false;
   }

}