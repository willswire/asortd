var BLOCK_WIDTH = 10
var BLOCK_YPOS_OFFSET = 15
var BLOCK_HEIGHT_COEF = 5
var ANIMATION_SPEED = 100

// Class: Block
// Attributes:
//      Number Height: the height of the block
//      Number id: ID number identifying the block
function Block(id, height) {
    this.id = id;
    this.height = height;
}

function randBlockArray(length, maxval) {
    blocks = []
    for (let i = 0; i < length; ++i) {
        height = Math.floor((Math.random() * maxval) + 1);
        blocks.push(new Block(i, height));
    }
    return blocks;
}

function createBlockHTML(block, idx) {
    var block = '<div class="sort_block "' +
        'id="block' + block.id + '" ' +
        'style="position:absolute;' +
        'bottom:0px;' +
        'left:' + (BLOCK_YPOS_OFFSET*idx) +'px;' +
        'background:black;' +
        'width:' + BLOCK_WIDTH + 'px;' +
        'height:' + (BLOCK_HEIGHT_COEF*block.height) + 'px;">' +
        '</div>';
    return block;
}

function drawBlocks(containerID, blockArr) {
    blockArr.forEach(function(block,idx) {
        $(containerID).append(createBlockHTML(block,idx));
    });
}

function redrawBlocks(blockArr) {
    blockArr.forEach(function(block,idx) {
        var newLeft = (BLOCK_YPOS_OFFSET * idx)
        if ($('#block' + block.id).css("left") != newLeft) {
            $('#block' + block.id).animate({left: newLeft + 'px'}, {duration: ANIMATION_SPEED});
        }
    });
}

function bubbleSort(blockArr) {
    var len = blockArr.length;
    for (var i = len - 1; i >= 0; i--) {
        for(var j = 1; j <= i; j++) {
            if(blockArr[j-1].height > blockArr[j].height) {
                var temp = blockArr[j-1];
                blockArr[j-1]= blockArr[j];
                blockArr[j]= temp;
            }
            redrawBlocks(blockArr);
        }
    }
}

// Executed when page is loaded
$(function() {
    var containerID = '#sorting_container'
    var blocks = randBlockArray(40, 25)
    $(containerID).html('');

    drawBlocks(containerID, blocks);
    
    // Just for testing
    $(containerID).click(function(event) {
        bubbleSort(blocks);
    })
});
