const NUM_NODES = 8;

function GraphNode(val){
    this.val = val;
}

function createGraphNodeHTML(GraphNode) {
	var node =
		'<span id="node' + GraphNode.val + '"' + 'style="height: 75px;width: 75px;background-color: #00a0df; border-radius: 50%;display: inline-block; margin-left: 2%; margin-right:2%; color:#eee8c5; font-size:50px"' +
        '%;">' + 
        GraphNode.val;
	("</span>");
    return node;
}

function drawGraph(nodes) {
    console.log(nodes);
	nodes.forEach(function (GraphNode) {
        if(GraphNode.val % 2 != 0){
            $("#odd_nodes").append(createGraphNodeHTML(GraphNode));
        }

        else{
            $("#even_nodes").append(createGraphNodeHTML(GraphNode));
        }
	});
}

function buildGraph(){
    var nodes = [];
    var graph = {};

    // Initialize the GraphNode objects we want to use
    // as well as entries in our adjacency list
    for(var i = 0; i < NUM_NODES; i++){
        nodes[i] = new GraphNode(i);
    }

    // Build the connections in an adjacency list... completely arbitrarily!
    graph[0] = [nodes[1], nodes[2]];
    graph[1] = [nodes[0], nodes[3], nodes[4]];
    graph[2] = [nodes[4], nodes[3], nodes[6]];
    graph[3] = [nodes[0], nodes[1], nodes[5], nodes[4]];
    graph[4] = [nodes[2], nodes[5]];
    graph[5] = [nodes[3], nodes[1], nodes[4]];

    return nodes;
}

$(function () {
    var nodes = buildGraph();
    drawGraph(nodes);
});