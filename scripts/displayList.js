// BLOCKS: List of items being sorted, where each element represent the block
//      height
var BLOCKS = [1, 2, 4, 5, 10, 2, 3, 4];
// BLOCK_WIDTH: Width in pixels for displaying blocks
var BLOCK_WIDTH = 20
// BLOCK_OFFSET: The space between blocks in pixels
var BLOCK_OFFSET = 30
// BLOCK_HEIGHT_COEF: The coefficient in pixel that a block height is
//  multiplied to determine the height for displaying a block
var BLOCK_HEIGHT_COEF = 10

// CreateBlock :: Number, Number  -> String
// Consumes:
//      Number height: the height of the block 
//      Number idx: the index of the block
// Returns:
//      The html object representing the block in a string
function CreateBlock(height, idx) {
    var block = '<div class="sort_block" ' +
        'style="position:absolute;bottom:0px;left:' + 
        (BLOCK_OFFSET*idx) + 'px;background:black;width:' + BLOCK_WIDTH +
        'px;height:' + (BLOCK_HEIGHT_COEF*height) + 'px;">' +
        '</div>';
    return block;
    
}

// UpdateBlocks :: String, [Number]  -> None
// Consumes:
//      String containerID: the name of the html object in which blocks will be
//          displayed
//      [Number] blockList: the list representation of the blocks being sorted
// Produces:
//      The html object representing the block in a string
function UpdateBlocks(containerID, blockList) {
    blockList.forEach(function(height,idx) {
        $(containerID).append(CreateBlock(height,idx));
    });
}

// Executed when page is loaded
$(function() {
    UpdateBlocks('#sorting_container', BLOCKS);
});
