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
	if(choice){
		$("#asortd-info").hide();
		$('#sort-info').show();
		$('#pseudo-code-holder').show();
		$('#sort-info-header').text(choice.name);
		$('#sort-info-description').text(choice.description);
		$('#pseudo-code').html(choice.pseudoCode)
	}
	else{
		$("#sort-info").hide();
		$("#asortd-info").show();
		$('#pseudo-code-holder').hide();
	}
}

function selectedAlgo(choice, blocks) {
	var steps;
	if(choice){
		steps = choice.sort(blocks);
	}
	else{
		alert("Select a Sorting Algorithm!");
	}	
	return steps;
}

function scrambleTitle(){
	var title = "ASORTD";
	var shuffledTitle = title.split('').sort(function(){return 0.5-Math.random()}).join('');
	while(shuffledTitle === "ASORTD"){
		shuffledTitle = shuffledTitle.split('').sort(function(){return 0.5-Math.random()}).join('');
	}
	$("#sorting_title").text(shuffledTitle);
}

async function sortTitle(){
	var currentTitle = $("#sorting_title").text();
	var iterations = 0;

	while(currentTitle !== "ASORTD"){
		iterations++;
		await sleep(25);

		// Arbitrary number so that we dont keep randomizing forever
		if(iterations == 120){
			currentTitle = "ASORTD";
		}
		else{
			currentTitle = currentTitle.split('').sort(function(){return 0.5-Math.random()}).join('');
			$("#sorting_title").text(currentTitle);
		}
	}

	$("#sorting_title").text(currentTitle);
}

$(() => {
	scrambleTitle();
	sortTitle();
	
	var selectedAlgorithm = SORTING_ALGORITHMS.BUBBLE;

	var options = Object.keys(SORTING_ALGORITHMS).reduce((accumulator, key) => {
		sort = SORTING_ALGORITHMS[key];
		return accumulator + `<span key={${key}} class="dropdown-item">${sort.name}</span>`
	}, '');
	$(".dropdown-menu").html(options);



	var containerID = "#sorting_container";
	var blocks = randBlockArray(NUM_BLOCKS, MAX_BLOCK_HEIGHT);
	$(containerID).html("");

	drawBlocks(containerID, blocks);

	var steps = null;

	var currentIndex = 0;
	var paused = true;

	var isReset = false;


	$("#dropdownMenuButton").click(function () {
		if ($("#dd-menu").hasClass("show")) {
			$("#dd-menu").removeClass("show");
		} else {
			$("#dd-menu").addClass("show");
			$(".dropdown-item").click(function () {
				$("#dropdownMenuButton").text($(this).text());
				$("#dd-menu").removeClass("show");
				const optionText = $(this).text();
				selectedAlgorithm = SORTING_ALGORITHMS[Object.keys(SORTING_ALGORITHMS).find((key) => {
					let sort = SORTING_ALGORITHMS[key];
					return sort.name === optionText;
				})];

				isReset = false;
				paused = true;
				selectedInfo(selectedAlgorithm);
				var oldSteps = steps ? steps[currentIndex] : null;
				currentIndex = 0;
				steps = selectedAlgo(selectedAlgorithm, [...blocks]);

				$("#sort_button").html("START");
				if (oldSteps) {
					redrawBlocks(oldSteps, steps[0], animation_speed);
				}
        $(containerID).html("");

        drawBlocks(containerID, blocks);

      });
		}
	});

	var animation_speed = DEFAULT_DELAY_VALUE + DELAY_SLIDER_OFFSET_VALUE;
	$("#slider_range").attr({
		min: 0,
		max: MAX_DELAY_VALUE
	});
	$("#slider_range").val(DEFAULT_DELAY_VALUE);

	$("#sort_button").click(async function (event) {
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
	});
});

async function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(() => resolve(ms), ms);
	});
}
