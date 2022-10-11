document.addEventListener('DOMContentLoaded', function() {

   const choice_file = document.forms.form_file.elements.file;

   let data = null;
   choice_file.addEventListener('change', (e) => {

      readFile = function () {
         var reader = new FileReader();
         reader.onload = function () {
            data = reader.result;
            renderResult(resultTransactions(data))
         };
         if(e.target.files[0]) {
            reader.readAsBinaryString(e.target.files[0]);
         }
      };
      readFile();
      btn_save_file.classList.add('active');
   });

    function resultTransactions (data) {
      var allRows = data.split(/\r?\n|\r/);
      let resultArr = {};
      for (let i = 0; i < allRows.length; i++) {
         if (i !== 0) { // head table
            let arrRow = allRows[i].split(',');

            if(arrRow[2]  !== undefined) {
               resultArr[arrRow[0]] ? resultArr[arrRow[0]] -= +arrRow[2] : resultArr[arrRow[0]] = -arrRow[2] // minus
               resultArr[arrRow[1]] ? resultArr[arrRow[1]] += +arrRow[2] : resultArr[arrRow[1]] = +arrRow[2] // plus
            }
         }
      }
      return(resultArr)
    };

    function renderResult(resultArr) {
      const table = document.createElement('table');
      table.innerHTML = `<thead>
                           <tr>
                              <th>ID</th>
                              <th>Value</th>
                           </tr>
                        </thead>
                        <tbody></tbody>`;
      const tbody = table.querySelector('tbody');

      for(let key in resultArr) {  
         tbody.insertAdjacentHTML(
            'beforeend',
            `<tr>
               <td>${key}</td>
               <td>${resultArr[key].toFixed(2)}</td>
            </tr>`
         )
      }
      const resultElem = document.querySelector('#result');
      resultElem.innerHTML = '';
      resultElem.append(table);
    };

   //  SAVE RESULT IN CSV-FILE
    const btn_save_file = document.querySelector('#save_file');
    btn_save_file.addEventListener('click', func_save_file);
    function func_save_file() {
      let resultCSV = CSV(resultTransactions(data));
      var blob = new Blob([ resultCSV ],
               //  { type: "text/plain;charset=utf-8" });
                { type: "csv" });
      saveAs(blob, "result.csv");
    }

    function CSV (resultObj) {
      let resultCSV = 'ID,VALUE\n';
      for(let key in resultObj) {
         if(key !== 'undefined') {
            resultCSV += key + ',' + resultObj[key] + "\n";
         }
      }
      return resultCSV;
    }




})

