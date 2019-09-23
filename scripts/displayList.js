const BLOCK_WIDTH = 10;
const BLOCK_YPOS_OFFSET = 15;
const MAX_BLOCK_HEIGHT = 10;
const BLOCK_COLOR = "#00a0df";
const BLOCK_HIGHLIGHT = "#f5cd5d";
const NUM_BLOCKS = 20;

const DELAY_SLIDER_OFFSET_VALUE = 25;
const DEFAULT_DELAY_VALUE = 150;
const MAX_DELAY_VALUE = 300;

// Class: Block
// Attributes:
//      Number Height: the height of the block
//      Number id: ID number identifying the block
function Block(id, width, height) {
	this.id = id;
	this.width = width;
	this.height = height;
}

function randBlockArray(length, maxHeight) {
	var blocks = [];
	var width = 100 / length;
	for (let i = 0; i < length; ++i) {
		height = Math.floor(Math.random() * maxHeight + 1);
		blocks.push(new Block(i, width, height));
	}
	return blocks;
}

function createBlockHTML(block, idx) {
	var block =
		'<div class="block"' +
		'id="block' +
		block.id +
		'" ' +
		'style="position:absolute;' +
		"bottom:0px;" +
		"left:" +
		block.width * idx +
		"%;" +
		"width:" +
		(block.width - 1) +
		"%;" +
		"height:" +
		block.height * 10 +
		'%;">' +
		'<p align="center" style="font-size:17px; color:white">' +
		block.height +
		"</p>";
	("</div>");
	return block;
}

function drawBlocks(containerID, blockArr) {
	blockArr.forEach(function (block, idx) {
		$(containerID).append(createBlockHTML(block, idx));
	});
}

function redrawBlocks(currentArr, nextArr, animation_speed) {
	nextArr.forEach(function (block, idx) {
		if (block != currentArr[idx]) {
			$("#block" + block.id).animate({
				left: block.width * idx + "%"
			}, {
				duration: animation_speed,
				easing: "linear",
				start: function () {
					$("#block" + block.id).css({
						backgroundColor: BLOCK_HIGHLIGHT,
						"z-index": 9999
					});
				},
				done: function () {
					$("#block" + block.id).css({
						backgroundColor: BLOCK_COLOR,
						"z-index": 1
					});
				}
			});
		} else {
			$("#block" + block.id).delay(animation_speed);
		}
	});
}

function swap(blockArr, i, j) {
	var tmp = blockArr[i];
	blockArr[i] = blockArr[j];
	blockArr[j] = tmp;
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

	console.log(steps);
	return steps;
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

function quickSortHelper(blockArr) {
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

function shellSort(blockArr) {
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

function bubbleSort(blockArr) {
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

function drawNextStep(steps, currentStep, animation_speed) {
	if (currentStep >= 0 && currentStep + 1 < steps.length) {
		redrawBlocks(
			steps[currentStep],
			steps[currentStep + 1],
			animation_speed
		);
	}
}

function drawPreviousStep(steps, currentStep, animation_speed) {
	if (currentStep < steps.length && currentStep - 1 >= 0) {
		redrawBlocks(
			steps[currentStep],
			steps[currentStep - 1],
			animation_speed
		);
	}
}

function selectedInfo(choice) {
	switch (choice) {
		case "Bubble Sort":
			$(".info").hide();
			$("#bubble-info").show();
			$("#bubble-psuedo").show();
			break;
		case "Shell Sort":
			$(".info").hide();
			$("#shell-info").show();
			$("#shell-psuedo").show();
			break;
		case "Quick Sort":
			$(".info").hide();
			$("#quick-info").show();
			$("#quick-psuedo").show();
			break;
		case "Selection Sort":
			$(".info").hide();
			$("#selection-info").show();
			$("#selection-psuedo").show();
			break;
		default:
			$(".info").hide();
			$("#asortd-info").show();
	}
}

function selectedAlgo(choice, blocks) {
	var steps;

	switch (choice) {
		case "Bubble Sort":
			steps = bubbleSort(blocks);
			$("#bubble-info").show();
			$("#asortd-info").hide();
			//Change pseudocode section
			break;
		case "Shell Sort":
			steps = shellSort(blocks);
			//Change info section
			//Change pseudocode section
			break;
		case "Quick Sort":
			steps = quickSortHelper(blocks);
			//Change info section
			//Change pseudocode section
			break;
		case "Selection Sort":
			steps = selectionSort(blocks);
			//Change info section
			//Change pseudocode section
			break;
		default:
			alert("Select a Sorting Algorithm!");

	}
	return steps;
}

// Executed when page is loaded
$(function () {
	var containerID = "#sorting_container";
	var blocks = randBlockArray(NUM_BLOCKS, MAX_BLOCK_HEIGHT);
	$(containerID).html("");

	drawBlocks(containerID, blocks);

	var steps = null;

	var currentIndex = 0;
	var paused = true;

	var isReset = false;

	var choice = null;

	$("#dropdownMenuButton").click(function () {
		if ($("#dd-menu").hasClass("show")) {
			$("#dd-menu").removeClass("show");
		} else {
			$("#dd-menu").addClass("show");
			$(".dropdown-item").click(function () {
				$("#dropdownMenuButton").text($(this).text());
				$("#dd-menu").removeClass("show");
				choice = $(this).text();
				selectedInfo(choice);
			});
		}
	});

	var animation_speed = DEFAULT_DELAY_VALUE + DELAY_SLIDER_OFFSET_VALUE;
	$("#slider_range").attr({
		min: 0,
		max: MAX_DELAY_VALUE
	});
	$("#slider_range").val(DEFAULT_DELAY_VALUE);

	// Just for testing
	$("#sort_button").click(async function (event) {
		steps = selectedAlgo(choice, blocks);
		if (paused && !isReset && steps != null) {
			$("#sort_button").html("PAUSE");
			paused = false;
			for (var i = currentIndex; i < steps.length; i++) {
				drawNextStep(steps, i, animation_speed);
				currentIndex++;
				await sleep(animation_speed);
				if (paused) {
					break;
				}
			}
			paused = true;
			if (currentIndex === steps.length) {
				$("#sort_button").html("RESET");
				isReset = true;
			}
		} else if (isReset) {
			isReset = false;
			currentIndex = 0;
			redrawBlocks(steps[steps.length - 1], steps[0], animation_speed);
			$("#sort_button").html("START");
		} else {
			$("#sort_button").html("START");
			paused = true;
		}
	});

	$("#prev_button").click(function () {
		drawPreviousStep(steps, currentIndex, animation_speed);
		if (currentIndex > 0) {
			currentIndex--;
		}
		if (isReset) {
			$("#sort_button").html("START");
			isReset = false;
		}
	});

	$("#next_button").click(function () {
		drawNextStep(steps, currentIndex, animation_speed);
		if (currentIndex < steps.length) {
			currentIndex++;
		}
		if (currentIndex === steps.length) {
			$("#sort_button").html("RESET");
			isReset = true;
		}
	});

	$("#slider_range").change(function () {
		animation_speed =
			MAX_DELAY_VALUE -
			parseInt($("#slider_range").val()) +
			DELAY_SLIDER_OFFSET_VALUE;
		console.log(animation_speed);
		console.log(animation_speed);
	});
});

async function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(() => resolve(ms), ms);
	});
}