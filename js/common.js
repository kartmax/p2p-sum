document.addEventListener('DOMContentLoaded', function() {

   const choice_file = document.forms.form_file.elements.file;

   choice_file.addEventListener('change', (e) => {

      readFile = function () {
         var reader = new FileReader();
         reader.onload = function () {
            let data = reader.result;
            renderResult(resultTransactions(data))
         };
         reader.readAsBinaryString(e.target.files[0]);
      };
      readFile();


      
      // async function start () {
      //    const name_choice_file = e.target.files[0].name,
      //          pach_choice_file = `csv/${name_choice_file}`;

      //    const data = await fetch(pach_choice_file, {})
      //                .then((res) => {
      //                   return res.text()
      //                })
      //    renderResult(resultTransactions(data))
      // };
      // start();
      
      
      // $.ajax({
      //    url: pach_choice_file,
      //    dataType: 'text',
      //  }).done(data => renderResult(resultTransactions(data)));

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

})

