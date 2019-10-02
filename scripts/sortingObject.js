// Sorting algorithm options are of the form: 
/*
DESCRIPTOR: {
  name: The name of the sort which will be displayed as a title
  description: a description of how the sort functions
  worstCase: worst case runtime in big O notation
  bestCase: best case runtime in Ω notation
  pseudoCode: pseudocode entered to show how the function works
  sort: the name of a sorting function, defined in sortingFunctions.js
}
*/

const SORTING_ALGORITHMS = {
  BUBBLE: {
    name: "Bubble Sort",
    description: "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements \"bubble\" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort. Bubble sort can be practical if the input is in mostly sorted order with some out-of-order elements nearly in position.",
    worstCase: "O(n²)",
    bestCase: "Ω(n)",
    pseudoCode: `
foreach (gap in gaps)
  for (i = gap; i < n; i += 1)
    temp = a[i]
    for (j = i; j >= gap and a[j - gap] > temp; j -= gap)
        a[j] = a[j - gap]
      a[j] = temp
    endfor
  endfor
endforeach
    `,
    sort: bubbleSort,
  },
  SHELL: {
    name: "Shell Sort",
    description: "Shellsort, also known as Shell sort or Shell's method, is an in-place comparison sort. It can be seen as either a generalization of bubble sort or insertion sort. The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared. Starting with far apart elements, it can move some out-of-place elements into position faster than a simple nearest neighbor exchange.",
    worstCase: "O(n²)",
    bestCase: "Ω(n log(n))",
    pseudoCode: `
calculate gap size ($gap)
  while $gap is greater than 0
    for each element of the list, that is $gap apart
      Extract the current item
      Locate the position to insert
      Insert the item to the position
    end for
  calculate gap size ($gap)
end while
    `,
    sort: shellSort
  },
  QUICK: {
    name: "Quick Sort",
    description: "Quicksort is a comparison sort. Efficient implementations of Quicksort are not a stable sort, meaning that the relative order of equal sort items is not preserved. Quicksort is a divide and conquer algorithm. It first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.",
    worstCase: "O(n²)",
    bestCase: "Ω(n log(n))",
    pseudoCode: `
quickSort(left, right)
  if right-left <= 0
    return
  else
    pivot = A[right]
    partition = partitionFunc(left, right, pivot)
    quickSort(left,partition-1)
    quickSort(partition+1,right)
  end if
end quickSort
    `,
    sort: quickSortHelper
  },
  SELECTION: {
    name: "Selection Sort",
    description: "Selection sort divides the input list into two parts: the sublist of items already sorted, which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, swapping it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.",
    worstCase: "O(n²)",
    bestCase: "Ω(n²)",
    pseudoCode: `
selectionSort(array, size)
  repeat (size - 1) times
    set the first unsorted element as the minimum
    for each of the unsorted elements
      if element < currentMinimum
        set element as new minimum
    swap minimum with first unsorted position
end selectionSort
`,
    sort: selectionSort
  }
};

