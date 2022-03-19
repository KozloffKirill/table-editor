
export class CSVHelper {

   static CSVToArray(csv: string, delimiter: string = ';') {
      if (csv) {
         while (csv.indexOf('\r\n') != -1) {
            csv = csv.replace('\r\n', '\n');
         }
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


   static arrayToCSV(arr: any[]) {
      
   }

   static isCSV(value: string, delimiter: string = ';'): boolean {
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