$(() => {
  $('#cancel-input').click(() => {
    selectedInfo();
  });
  $('#save-input').click(() => {
    const nameText = $('#input-name').val();
    const descText = $('#input-description').val();
    const worstCaseText = $('#input-worst-case').val();
    const bestCaseText = $('#input-best-case').val();
    const pseudoCodeText = $('#input-pseudo-code').val();
    const functionText = $('#input-function').val();

    if (nameText && functionText) {
      const sortFunction = new Function('blockArr', functionText);
      console.log(typeof sortFunction);
      var sortObject = {
        name: nameText,
        description: descText,
        worstCase: worstCaseText,
        bestCase: bestCaseText,
        pseudoCode: pseudoCodeText,
        sortString: functionText,
        custom: true,
      }
      addSort(sortObject);
      selectedInfo();
    }
    else {
      alert("Please fill out the name and function fields");
    }
  })
});

function getSorts() {
  var sorts = JSON.parse(localStorage.getItem('customSorts') || '[]');
  console.log(sorts);
  return sorts.map((sort) => {
    var newSort = {...sort}
    var sortFunction = new Function('blockArr', newSort.sortString);
    newSort.sort = sortFunction;
    return newSort; 
  });
}

function addSort(value){
  var sorts = localStorage.getItem('customSorts') || '[]';
  sorts = JSON.parse(sorts);
  sorts.push(value);
  localStorage.setItem("customSorts", JSON.stringify(sorts));  
}

function editSort(index, value){
  var sorts = localStorage.getItem('customSorts') || '[]';
  sorts = JSON.parse(sorts);
  sorts[index] = value;
  localStorage.setItem("customSorts", JSON.stringify(sorts));  
}

function deleteSort(index){
  var sorts = localStorage.getItem('customSorts') || '[]';
  sorts = JSON.parse(sorts);
  var newSorts = sorts.splice(index,1);
  localStorage.setItem("customSorts", JSON.stringify(newSorts));  
}