// BLOCK_WIDTH: Width in pixels for displaying blocks
var BLOCK_WIDTH = 10
// BLOCK_OFFSET: The space between blocks in pixels
var BLOCK_OFFSET = 15
// BLOCK_HEIGHT_COEF: The coefficient in pixel that a block height is
//  multiplied to determine the height for displaying a block
var BLOCK_HEIGHT_COEF = 5
// ANIMATE_SPEED: Speed at which each animation occurs
var ANIMATE_SPEED = 100


// Class: Block
// Attributes:
//      Number Height: the height of the block
//      Number id: ID number identifying the block
function Block(id, height) {
    this.id = id;
    this.height = height;
}


// randomkArray :: Number, Number  -> [Block]
// Description: Creates an array of size length with blocks ranging in height
//      from 1 to maxval
// Arguments:
//      Number length: the number of blocks in the resultant array
//      Number maxval: the maximum possible value for a block's height in the
//          array
// Returns:
//      An array of size length with blocks ranging in height
//          from 1 to maxval
function randomkArray(length, maxval) {
    blocks = []
    for (let i = 0; i < length; ++i) {
        height = Math.floor((Math.random() * maxval) + 1);
        blocks.push(new Block(i, height));
    }
    return blocks;
}

// createBlock :: Block, Number  -> String
// Description: Creates html representation of a Block
// Arguments:
//      Block block: the block being drawn
//      Number idx: the index of the block
// Returns:
//      The html object representing the block in a string
function createBlock(block, idx) {
    var block = '<div class="sort_block" id="block' + block.id + '" ' +
        'style="position:absolute;bottom:0px;left:' + 
        (BLOCK_OFFSET*idx) + 'px;background:black;width:' + BLOCK_WIDTH +
        'px;height:' + (BLOCK_HEIGHT_COEF*block.height) + 'px;">' +
        '</div>';
    return block;
    
}

// drawBlocks :: String, [Block]  -> None
// Description: Draws the given blocks being displayed in the given container
// Arguments:
//      String containerID: the name of the html object in which blocks will be
//          displayed
//      [Block] blockList: the list representation of the blocks being sorted
function drawBlocks(containerID, blockList) {
    $(containerID).html('');
    blockList.forEach(function(block,idx) {
        $(containerID).append(createBlock(block,idx));
    });
}

// updateBlocks :: [Block]  -> None
// Description: Animates and updates the given blocks being displayed in the
//      given container
// Arguments:
//      [Block] blockList: the list representation of the blocks being sorted
function updateBlocks(blockList) {
    blockList.forEach(function(block,idx) {
        var newLeft = (BLOCK_OFFSET * idx)
        if ($('#block' + block.id).css("left") != newLeft) {
            $('#block' + block.id).animate({left: newLeft + 'px'}, {duration: ANIMATE_SPEED});
        }
    });
}

// bubbleSort :: [Block]  -> None
// Description: Implementation of the bubble sort algorithm, displaying the
//      updateposition on the webpage after each movement in the list being
//      sorted
// Arguments:
//      [Block] blockList: the list of blocks to be sorted
function bubbleSort(blockList){
   var len = blockList.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(blockList[j-1].height>blockList[j].height){
           var temp = blockList[j-1];
           blockList[j-1]= blockList[j];
           blockList[j]= temp;
        }
        updateBlocks(blockList);
     }
   }
}


// Executed when page is loaded
$(function() {
    let blocks = randomkArray(40, 25)
    drawBlocks('#sorting_container', blocks);
    
    // Just for testing
    $('#sorting_container').click(function(event){
        bubbleSort(blocks);
    })
});
