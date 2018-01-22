var headerText = document.getElementsByClassName("header")[0].getBoundingClientRect();
var svg = d3.select("svg.anim");
document.getElementById("headContainer").setAttribute("height",headerText.bottom)
var boundingBox = svg._groups[0][0].getBoundingClientRect(),
width = boundingBox.width,
height = boundingBox.height;
var leftBound = width/4;
var rightBound = 3*width/4;
var color = d3.scaleOrdinal(d3.schemeCategory20b);
var counter = 0;
//Put helix edges over nodes for DNA animation
var helixEdges = svg.append("g")
        .attr("class", "helixLink")
        .selectAll("line")
        .data(d3.range(32))
        .enter().append("line")


var ydist = [height/4,height/2];
var offset = [0,width/64]
var datum = d3.range(leftBound,rightBound,width/64)
var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(datum)
    .enter().append("circle")
    .attr("r", 0)
    .attr("cx", function(d,i) {return d + offset[i%2==0 ? 1:0]; } )
    .attr("cy", function(d,i) {return ydist[i%2==0 ? 1:0]})
    .attr("fill", function(d) { return color(d); })


var t = d3.transition()
    .duration(2000)
    .ease(d3.easeSin);
node.transition(t).attr("r",Math.sqrt(width)/4)
function wave(){
}
var myInter = setInterval(wave,100)

  function range(start, edge, step) {
  // If only one number was passed in make it the edge and 0 the start.
  if (arguments.length == 1) {
    edge = start;
    start = 0;
  }

  // Validate the edge and step numbers.
  edge = edge || 0;
  step = step || 1;

  // Create the array of numbers, stopping befor the edge.
  for (var ret = []; (edge - start) * step > 0; start += step) {
    ret.push(start);
  }
  return ret;
}

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
    return array
}
function getRandomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}


function neuralNetA(nodes){
    svg.selectAll(".links").remove();
    var inputLayer = getRandomInt(3,9)
    var layer1 = getRandomInt(inputLayer+2,inputLayer+4)
    var layer2 = getRandomInt(26-(layer1+inputLayer),30-(layer1+inputLayer))
    var layer3 = 32-(layer2+layer1+inputLayer);
    var network = [];
    for(i=0;i<inputLayer;i++){
        network[i] = {cx:300,cy:(200*i/(inputLayer-1)) + 100, color: "#B22"}
    }
    for(i=0;i<layer1;i++){
        network[i+inputLayer] = {cx:400,cy:(300*i/(layer1-1)) + 50, color: "#22B"}
    }
    for(i=0;i<layer2;i++){
        network[i+inputLayer+layer1] = {cx:500,cy:(300*i/(layer2-1)) + 50, color:"#22B"}
    }
    for(i=0;i<layer3;i++){
        network[i+inputLayer+layer1+layer2] = {cx:600,cy:(100*i/(layer3-1)) + 150, color: "#2B2"}
    }
    var links1 = [];
    var links2 = [];
    var links3 = [];
    for(i=0;i<inputLayer;i++){
        for(j=0;j<layer1;j++){
            links1.push({source:i,end:j+inputLayer})

        }
    }
    for(i=0;i<layer1;i++){
        for(j=0;j<layer2;j++){
            if(Math.random()<.75){
                links2.push({source:i+inputLayer,end:j+layer1+inputLayer})
            }
        }
    }
    for(i=0;i<layer2;i++){
        for(j=0;j<layer3;j++){
            links3.push({source:i+inputLayer+layer1,end:j+layer1+inputLayer+layer2})
        }
    }

    var edges1 = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links1)
        .enter().append("line")
        .attr("x1", function(d){return network[d.source].cx})
        .attr("y1", function(d){return network[d.source].cy})
        .attr("x2", function(d) {return network[d.source].cx} )
        .attr("y2", function(d) {return network[d.source].cy} )
        .attr("stroke","#000")
        .attr("fill", "none");

    var edges2 = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links2)
        .enter().append("line")
        .attr("x1", function(d){return network[d.source].cx})
        .attr("y1", function(d){return network[d.source].cy})
        .attr("x2", function(d) {return network[d.source].cx} )
        .attr("y2", function(d) {return network[d.source].cy} )
        .attr("stroke","#000")
        .attr("fill", "none");
    var edges3 = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links3)
        .enter().append("line")
        .attr("x1", function(d){return network[d.source].cx})
        .attr("y1", function(d){return network[d.source].cy})
        .attr("x2", function(d) {return network[d.source].cx} )
        .attr("y2", function(d) {return network[d.source].cy} )
        .attr("stroke","#000")
        .attr("fill", "none");

    d3.selectAll(".links").lower();

    nodes.data(network).transition(t).attr("cx",function(d){return d.cx;}).attr("cy",function(d){return d.cy;}).delay(function(d,i){return getRandomInt(250,550)}).attr("fill",function(d){return d.color}).duration(1000);

    edges1.data(links1).transition()
        .attr("x2", function(d) {return network[d.end].cx} )
        .attr("y2", function(d) {return network[d.end].cy} )
        .delay(function(d,i){return getRandomInt(1000,1500)})
        .duration(1500);
    edges2.data(links2).transition()
        .attr("x2", function(d) {return network[d.end].cx} )
        .attr("y2", function(d) {return network[d.end].cy} )
        .delay(function(d,i){return getRandomInt(1750,2250)})
        .duration(1500);
    edges3.data(links3).transition()
        .attr("x2", function(d) {return network[d.end].cx} )
        .attr("y2", function(d) {return network[d.end].cy} )
        .delay(function(d,i){return getRandomInt(2500,2750)})
        .duration(1500);
}

function doubleHelix(){
    var holder = [];
    var helix = generateHelix();
    x = d3.scaleLinear().range([(leftBound<200)?200:leftBound, (rightBound>600)?600:rightBound]),
    y = d3.scaleLinear().range([300, 350]),
    z = d3.scaleLinear().range([5, 1]);

    node.data(helix)
        .attr("cx", function(d,i){return d[i%2==0 ? 1:0].x})
        .attr("cy",function(d,i){return y(d[i%2==0 ? 1:0].y)})
        .attr("r", function(d,i){return z(d[i%2==0 ? 1:0].z)})
        .attr("stroke-opacity", 0)
        .attr("fill-opacity", function(d,i){return z(d[i%2==0 ? 1:0].z)/5});

        //.attr("fill-opacity", function(d,i){return d[i%2==0 ? 1:0].z * d[i%2==0 ? 1:0].z});
    for(i=1;i<helix.length;i++){
        holder.push(helix[i]);
    }
    helixEdges.data(helix)
        .attr("x1", function(d,i){return d[0].x})
        .attr("y1", function(d,i){return y(d[1].y)-z(d[1].z)*((d[0].y<d[1].y)?1:-1)})
        .attr("x2", function(d,i) {return d[0].x} )
        .attr("y2", function(d,i) {return y(d[0].y)+z(d[0].z)*((d[0].y<d[1].y)?1:-1)})
        .attr("stroke",function(d,i){return node.filter(function(d,c){return i===c}).attr("fill");})
        .attr("stroke-width",4);
}
function transitionHelix(){
    svg.selectAll(".links").remove();
    setInterval(doubleHelix,25);
}

function generateHelix(){
    counter++;
    var data = d3.range(32).map(function(d){
            var t = d * 0.2 - 0.02 * counter;
            return [{
                x: datum[d] + offset[d%2==0 ? 1:0],
                y: Math.cos(t),
                z: Math.sin(t)
    },
           {
                x: datum[d] + offset[d%2==0 ? 1:0],
                y: Math.cos(t-Math.PI),
                z: Math.sin(t-Math.PI)

           }]
    });

    return data

}
