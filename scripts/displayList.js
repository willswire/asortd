// Class: Block
// Attributes:
//      Number Height: the height of the block
//      String id: name identifying block
function Block(id, height) {
    this.id = 'block' + id;
    this.height = height;
}

// BLOCKS: List of items being sorted, where each element represent the block
//      height
var BLOCKS = [new Block(1, 5), new Block(2, 10), new Block(3, 2), new Block(4, 8)];
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
    var block = '<div class="sort_block" id="' + block.id + '" ' +
        'style="position:absolute;bottom:0px;left:' + 
        (BLOCK_OFFSET*idx) + 'px;background:black;width:' + BLOCK_WIDTH +
        'px;height:' + (BLOCK_HEIGHT_COEF*block.height) + 'px;">' +
        '</div>';
    return block;
    
}

// DrawBlocks :: String, [Block]  -> None
// Description: Draws the given blocks being displayed in the given container
// Consumes:
//      String containerID: the name of the html object in which blocks will be
//          displayed
//      [Block] blockList: the list representation of the blocks being sorted
function DrawBlocks(containerID, blockList) {
    $(containerID).html('');
    blockList.forEach(function(block,idx) {
        $(containerID).append(CreateBlock(block,idx));
    });
}

// UpdateBlocks :: String, [Block]  -> None
// Description: Animates and updates the given blocks being displayed in the
//      given container
// Consumes:
//      String containerID: the name of the html object in which blocks will be
//          displayed
//      [Block] blockList: the list representation of the blocks being sorted
function UpdateBlocks(containerID, blockList) {
    blockList.forEach(function(block,idx) {
        $('#' + block.id).animate({left: (BLOCK_OFFSET * idx) + 'px'});
    });
}

// Executed when page is loaded
$(function() {
    DrawBlocks('#sorting_container', BLOCKS);
    
    // Just for testing
    $('#sorting_container').click(function(event){
        BLOCKS.reverse();
        UpdateBlocks('#sorting_container', BLOCKS);
    })
});
