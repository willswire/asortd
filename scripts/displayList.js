const BLOCK_WIDTH = 10
const BLOCK_YPOS_OFFSET = 15
const MAX_BLOCK_HEIGHT_PERCENT = 75
const ANIMATION_SPEED = 100
const BLOCK_COLOR = '#00a0df'
const BLOCK_HIGHLIGHT = '#f5cd5d'
const NUM_BLOCKS = 20;

// Class: Block
// Attributes:
//      Number Height: the height of the block
//      Number id: ID number identifying the block
function Block(id, width, height) {
    this.id = id;
    this.width = width;
    this.height = height;
}

function randBlockArray(length, maxval) {
    var blocks = []
    var width = 100 / length;
    for (let i = 0; i < length; ++i) {
        height = Math.floor((Math.random() * MAX_BLOCK_HEIGHT_PERCENT) + 1);
        blocks.push(new Block(i, width, height));
    }
    return blocks;
}

function createBlockHTML(block, idx) {
    var block = '<div class="block"' +
        'id="block' + block.id + '" ' +
        'style="position:absolute;' +
        'bottom:0px;' +
        'left:' + (block.width * idx) + '%;' +
        'width:' + (block.width - 1) + '%;' +
        'height:' + (block.height) + '%;">' +
        '</div>';
    return block;
}

function drawBlocks(containerID, blockArr) {
    blockArr.forEach(function (block, idx) {
        $(containerID).append(createBlockHTML(block, idx));
    });
}

function redrawBlocks(blockArr, prevArr) {
    blockArr.forEach(function (block, idx) {
        if (block != prevArr[idx]) {
            $('#block' + block.id).animate({
                left: (block.width * idx) + '%'
            }, {
                duration: ANIMATION_SPEED,
                easing: 'linear',
                start: function () {
                    $('#block' + block.id).css({
                        "backgroundColor":BLOCK_HIGHLIGHT,
                        "z-index": 9999
                    });
                },
                done: function () {
                    $('#block' + block.id).css({
                        "backgroundColor":BLOCK_COLOR,
                        "z-index": 1
                    });
                }
            });
        } else {
            $('#block' + block.id).delay(ANIMATION_SPEED);
        }
    });
}



function bubbleSort(blockArr) {
    var steps = [];

    var prevArr = blockArr.slice(0);
    var len = blockArr.length;
    for (var i = len - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (blockArr[j - 1].height > blockArr[j].height) {
                var temp = blockArr[j - 1];
                blockArr[j - 1] = blockArr[j];
                blockArr[j] = temp;
                steps.push([...blockArr]);
            }
            redrawBlocks(blockArr, prevArr);
            prevArr = blockArr.slice(0);
        }
    }

    console.log(steps);
}

// Executed when page is loaded
$(function () {
    var containerID = '#sorting_container'
    var blocks = randBlockArray(NUM_BLOCKS, 25)
    $(containerID).html('');

    drawBlocks(containerID, blocks);

    // Just for testing
    $("#sort_button").click(function (event) {
        bubbleSort(blocks);
    })
});
