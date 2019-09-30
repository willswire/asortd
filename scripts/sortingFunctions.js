function swap(blockArr, i, j) {
	var tmp = blockArr[i];
	blockArr[i] = blockArr[j];
	blockArr[j] = tmp;
}

function bubbleSort(blockArr){
  var steps = [
    [...blockArr]
  ];
  var len = blockArr.length;

  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (blockArr[j - 1].height > blockArr[j].height) {
        swap(blockArr, j - 1, j);
        steps.push([...blockArr]);
      }
    }
  }

  return steps;
}

function shellSort(blockArr){
  var steps = [
    [...blockArr]
  ];
  var increment = blockArr.length / 2;
  while (increment > 0) {
    for (i = increment; i < blockArr.length; i++) {
      var j = i;
      var temp = blockArr[i];

      while (
        j >= increment &&
        blockArr[j - increment].height > temp.height
      ) {
        blockArr[j] = blockArr[j - increment];
        j = j - increment;
      }

      blockArr[j] = temp;
      steps.push([...blockArr]);
    }

    if (increment == 2) {
      increment = 1;
    } else {
      increment = parseInt((increment * 5) / 11);
    }
  }
  return steps;
}

function quickSortHelper(blockArr){
  var steps = [
    [...blockArr]
  ];
  quickSort(blockArr, 0, blockArr.length - 1, steps);    
  return steps;
}

function quickSort(blockArr, left, right, steps) {
	var index;
	if (blockArr.length > 1) {
		index = partition(blockArr, left, right, steps); //index returned from partition
		if (left < index - 1) {
			//more elements on the left side of the pivot
			quickSort(blockArr, left, index - 1, steps);
		}
		if (index < right) {
			//more elements on the right side of the pivot
			quickSort(blockArr, index, right, steps);
		}
	}

	return blockArr;
}


function partition(blockArr, left, right, steps) {
	var pivot = blockArr[Math.floor((right + left) / 2)].height, //middle element
		i = left, //left pointer
		j = right; //right pointer
	while (i <= j) {
		while (blockArr[i].height < pivot) {
			i++;
		}
		while (blockArr[j].height > pivot) {
			j--;
		}
		if (i <= j) {
			swap(blockArr, i, j);
			steps.push([...blockArr]);
			i++;
			j--;
		}
	}
	return i;
}

function selectionSort(blockArr) {
  var steps = [
    [...blockArr]
  ];
  var len = blockArr.length;

  for (var i = 0; i < len; i++) {
    var min = i;
    for (var j = i + 1; j < len; j++) {
      if (blockArr[j].height < blockArr[min].height) {
        min = j;
      }
    }
    if (i !== min) {
      swap(blockArr, i, min);
      steps.push([...blockArr]);
    }
  }

  return steps;
}