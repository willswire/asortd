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
      if (selectedAlgorithm.name === 'Custom') {
        addSort(sortObject);
        selectedInfo();
      }
      else {
        var customSorts = getSorts();
        var index = customSorts.findIndex((sort) => sort.name === selectedAlgorithm.name);
        editSort(index, sortObject);
        selectedInfo();
      }
    }
    else {
      alert("Please fill out the name and function fields");
    }
  });

  $('#edit-button').click(() => {
    $("#asortd-info").hide();
    $('#sort-info').hide();
    $('#pseudo-code-holder').hide();
    $('#main').hide();
    $('#controls').hide();
    $('#input-sort-info').show();
    $('#delete-input').show();

    $('#input-name').val(selectedAlgorithm.name);
    $('#input-description').val(selectedAlgorithm.description);
    $('#input-worst-case').val(selectedAlgorithm.worstCase);
    $('#input-best-case').val(selectedAlgorithm.bestCase);
    $('#input-pseudo-code').val(selectedAlgorithm.pseudoCode);
    $('#input-function').val(selectedAlgorithm.sortString);
  });

  $('#delete-input').click(() => {
    var customSorts = getSorts();
    let index = customSorts.findIndex((sort) => sort.name === selectedAlgorithm.name);
    deleteSort(index);
    selectedInfo();
  })
});

function getSorts() {
  var sorts = JSON.parse(localStorage.getItem('customSorts') || '[]');
  var returnedSorts = [];
  sorts.forEach((sort) => {
    var newSort = { ...sort }
    try {
      var sortFunction = new Function('blockArr', newSort.sortString);
      newSort.sort = sortFunction;
      returnedSorts.push(newSort);
    } catch (error) {
      alert(error.message);
    }
  });
  return returnedSorts;
}

function addSort(value) {
  var sorts = localStorage.getItem('customSorts') || '[]';
  sorts = JSON.parse(sorts);
  sorts.push(value);
  localStorage.setItem("customSorts", JSON.stringify(sorts));
}

function editSort(index, value) {
  var sorts = localStorage.getItem('customSorts') || '[]';
  sorts = JSON.parse(sorts);
  sorts[index] = value;
  localStorage.setItem("customSorts", JSON.stringify(sorts));
}

function deleteSort(index) {
  var sorts = localStorage.getItem('customSorts') || '[]';
  sorts = JSON.parse(sorts);
  sorts.splice(index, 1);
  localStorage.setItem("customSorts", JSON.stringify(sorts));
}