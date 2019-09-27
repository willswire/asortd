const SORTING_ALGORITHMS = {
  BUBBLE: {
    name: "Bubble Sort",
    description: "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements \"bubble\" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort. Bubble sort can be practical if the input is in mostly sorted order with some out-of-order elements nearly in position.",
    worstCase: "O(n²)",
    bestCase: "Ω(n)",
    pseudoCode: "foreach (gap in gaps)\n{\nfor (i = gap; i < n; i += 1)\n{\ntemp = a[i]\nfor (j = i; j >= gap and a[j - gap] > temp; j -= gap)\n{\na[j] = a[j - gap]\n}\na[j] = temp\n}\n}\n",
    sort: (blockArr) => {
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

      console.log(steps);
      return steps;
    }
  },
  SHELL: {
    name: "Shell Sort",
    description: "Shellsort, also known as Shell sort or Shell's method, is an in-place comparison sort. It can be seen as either a generalization of bubble sort or insertion sort. The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. Starting with far apart elements, it can move some out-of-place elements into position faster than a simple nearest neighbor exchange.",
    worstCase: "O(n²)",
    bestCase: "Ω(n log(n))",
    pseudoCode: "calculate gap size ($gap)\nwhile $gap is greater than 0\nfor each element of the list, that is $gap apart\nExtract the current item\nLocate the position to insert\nInsert the item to the position\nend for\ncalculate gap size ($gap)\nend while\n",
    sort: (blockArr) => {
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
  },
  QUICK: {
    name: "Quick Sort",
    description: "Quicksort is a comparison sort. Efficient implementations of Quicksort are not a stable sort, meaning that the relative order of equal sort items is not preserved. Quicksort is a divide and conquer algorithm. It first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.",
    worstCase: "O(n²)",
    bestCase: "Ω(n log(n))",
    pseudoCode: "quickSort(left, right)\nif right-left <= 0\nreturn\nelse\npivot = A[right]\npartition = partitionFunc(left, right, pivot)\nquickSort(left,partition-1)\nquickSort(partition+1,right)\nend if\nend quickSort\n",
    sort: (blockArr) => {
      var steps = [
        [...blockArr]
      ];
      quickSort(blockArr, 0, blockArr.length - 1, steps);    
      return steps;
    }
  },
  SELECTION: {
    name: "Selection Sort",
    description: "Selection sort divides the input list into two parts: the sublist of items already sorted, which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, swapping it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.",
    worstCase: "O(n²)",
    bestCase: "Ω(n²)",
    pseudoCode: "selectionSort(array, size)\nrepeat (size - 1) times\nset the first unsorted element as the minimum\nfor each of the unsorted elements\nif element < currentMinimum\nset element as new minimum\nswap minimum with first unsorted position\nend selectionSort\n",
    sort: (blockArr) => {
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
    
      console.log(steps);
      return steps;
    }
  }
};

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


function swap(blockArr, i, j) {
	var tmp = blockArr[i];
	blockArr[i] = blockArr[j];
	blockArr[j] = tmp;
}