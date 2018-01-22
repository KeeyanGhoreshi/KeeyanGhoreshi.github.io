var svg = d3.select("svg.anim");
var delayFactor = 50;
var headerText = document.getElementsByClassName("header")[0].getBoundingClientRect();
document.getElementById("headContainer").setAttribute("height",headerText.bottom)

var box = document.getElementById("headContainer").getBoundingClientRect()
var width = box.width,
    height = box.height,
    hexRadius = (width+height)/75,
    hexDiameter = hexRadius*2,
    hexHeight = Math.sin(1.0472)*hexRadius;
var augmentedWidth = width + (hexRadius - width%hexRadius);
var augmentedWidth = width + (hexRadius - width%hexRadius);
var hexGridNodes = [];

var hexGridLocator = [];
var placeholder = [];
var connections = [];

var counter = 0;
var rowLength = Math.ceil(((2*augmentedWidth/hexRadius)/3))
for(var i=0; i<=height/hexHeight; i++){
    counter = -1;
    placeholder = [];
    for(var j=-1; j<=augmentedWidth/hexRadius; j++){

        if(i%2==0){
            if(j%3!=0){
                var onNode = {
                    cx:j*hexRadius,
                    cy:i*hexHeight,
                    delay:(i+j)*delayFactor

                }
                hexGridNodes.push(onNode);
                placeholder.push(onNode);
                counter+=1;
            }

        }else{
            if(j%3!=0){
                var offNode = {
                    cx:j*hexRadius+3*hexRadius/2,
                    cy:i*hexHeight,
                    delay:(i+j)*delayFactor
                }
                hexGridNodes.push(offNode);
                placeholder.push(offNode);
                counter+=1;
            }
        }
        if(j<=augmentedWidth/hexRadius){
            if(j%3===2 & i>=0 & i<Math.floor((height/hexHeight)) & counter<rowLength){
                //connections.push({source:[i,counter-1], end:[i,counter]});
                if(i%2===0){
                    if(i>0){
                        connections.push({source:[i,counter], end:[i-1,counter-1]});
                    }

                    connections.push({source:[i,counter], end:[i+1,counter-1]});
                }else{
                    connections.push({source:[i,counter], end:[i,counter-1]});
                }

            }else if(j%3===1  & i>=0 & i<Math.floor((height/hexHeight)) & counter<rowLength){


                if(i%2===0){
                    //connections.push({source:[i,counter], end:[i-1,counter]});
                    //connections.push({source:[i,counter], end:[i+1,counter]});
                    if(i>0){
                        connections.push({source:[i,counter], end:[i-1,counter-1]});
                    }

                    connections.push({source:[i,counter], end:[i+1,counter-1]});
                    connections.push({source:[i,counter], end:[i,counter+1]});
                }else{


                }
            }
        }



    }
    hexGridLocator.push(placeholder);
}
/*var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(hexGridNodes)
    .enter().append("circle")
    .attr("cx",function(d,i){return d.cx;})
    .attr("cy",function(d,i){return d.cy;})
    .attr("fill","white")
    .attr("r",3)
    .attr("fill-opacity",0)
    .attr("stroke-opacity",0)
    .transition()
    .duration(500)
    .attr("fill-opacity",1)
    .delay(function(d,i){return d.delay;})
    .transition()
    .attr("r",0)
    .duration(4500)
    .delay(function(d,i){return d.delay;});

     var edges = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(connections)
        .enter().append("line")
        .attr("x1", function(d,i){return hexGridLocator[d.source[0]][d.source[1]].cx;})
        .attr("y1", function(d,i){return hexGridLocator[d.source[0]][d.source[1]].cy;})
        .attr("x2", function(d,i){return hexGridLocator[d.source[0]][d.source[1]].cx;})
        .attr("y2", function(d,i){return hexGridLocator[d.source[0]][d.source[1]].cy;})
        .attr("stroke","#FFF")
        .attr("stroke-width",2)
        .transition()
        .attr("x2", function(d,i){return hexGridLocator[d.end[0]][d.end[1]].cx;})
        .attr("y2", function(d,i){return hexGridLocator[d.end[0]][d.end[1]].cy;})
        .attr("stroke-opacity",1)
        .delay(function(d,i){return hexGridLocator[d.source[0]][d.source[1]].delay;})
        .duration(500)
        .transition()
        .duration(3000)
        .attr("stroke-opacity",0);

*/
//.delay(function(d,i){return hexGridLocator[d.source[0]][d.source[1]].delay/4;})
//        .attr("x1", function(d,i){return hexGridLocator[d.end[0]][d.end[1]].cx;})
//        .attr("y1", function(d,i){return hexGridLocator[d.end[0]][d.end[1]].cy;})


 var edges = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(connections)
        .enter().append("line")
        .attr("x1", function(d,i){return hexGridLocator[d.source[0]][d.source[1]].cx;})
        .attr("y1", function(d,i){return hexGridLocator[d.source[0]][d.source[1]].cy;})
        .attr("x2", function(d,i){return hexGridLocator[d.end[0]][d.end[1]].cx;})
        .attr("y2", function(d,i){return hexGridLocator[d.end[0]][d.end[1]].cy;})
        .attr("stroke","#BBB")
        .attr("stroke-opacity",0)
        .attr("stroke-width",2)
        .transition()
        .attr("stroke-opacity",1)
        .delay(function(d,i){return hexGridLocator[d.source[0]][d.source[1]].delay;})
        .duration(500)
        .transition()
        .duration(1500)
        .attr("stroke-opacity",.05);
function swipe(){
    svg.selectAll("line").transition()
    .attr("stroke-opacity",1)
        .delay(function(d,i){return hexGridLocator[d.source[0]][d.source[1]].delay;})
        .duration(500)
        .transition()
        .duration(1500)
        .attr("stroke-opacity",.05);
}

//setInterval(swipe,2000)
