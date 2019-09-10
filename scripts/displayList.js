// Class: Block
// Attributes:
//      Number Height: the height of the block
function Block(height) {
    this.height = height;
}

// BLOCKS: List of items being sorted, where each element represent the block
//      height
var BLOCKS = [new Block(5), new Block(10), new Block(2), new Block(8)];
// BLOCK_WIDTH: Width in pixels for displaying blocks
var BLOCK_WIDTH = 20
// BLOCK_OFFSET: The space between blocks in pixels
var BLOCK_OFFSET = 30
// BLOCK_HEIGHT_COEF: The coefficient in pixel that a block height is
//  multiplied to determine the height for displaying a block
var BLOCK_HEIGHT_COEF = 10

// CreateBlock :: Block, Number  -> String
// Description: Creates html representation of a Block
// Consumes:
//      Block block: the block being drawn
//      Number idx: the index of the block
// Returns:
//      The html object representing the block in a string
function CreateBlock(block, idx) {
    var block = '<div class="sort_block" ' +
        'style="position:absolute;bottom:0px;left:' + 
        (BLOCK_OFFSET*idx) + 'px;background:black;width:' + BLOCK_WIDTH +
        'px;height:' + (BLOCK_HEIGHT_COEF*block.height) + 'px;">' +
        '</div>';
    return block;
    
}

// UpdateBlocks :: String, [Block]  -> None
// Description: Updates the given blocks being displayed in the given container
// Consumes:
//      String containerID: the name of the html object in which blocks will be
//          displayed
//      [Number] blockList: the list representation of the blocks being sorted
function UpdateBlocks(containerID, blockList) {
    blockList.forEach(function(block,idx) {
        $(containerID).append(CreateBlock(block,idx));
    });
}

// Executed when page is loaded
$(function() {
    UpdateBlocks('#sorting_container', BLOCKS);
});
