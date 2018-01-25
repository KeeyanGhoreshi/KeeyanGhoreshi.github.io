var svg = d3.select("svg.anim");
var delayFactor = 50;
var headerText = document.getElementsByClassName("header")[0].getBoundingClientRect();
document.getElementById("headContainer").setAttribute("height",headerText.bottom)
var intervalHolder = [];
var box = document.getElementById("headContainer").getBoundingClientRect()
var width = box.width,
    height = box.height;
//var color = ["#FF6347","#FF7F50","#FF4500","#FFD700","#FFA500","#FF8C00","#1abc9c","#2ecc71",
// "#16a085","#27ae60","#e74c3c","#8e44ad","#9b59b6"];

var color = ["#666","#444","#777","#888","#555"];
function dofunc(){
    svg.selectAll("line").remove();
    svg.selectAll("rect").remove();
    intervalHolder.map(function(d){clearInterval(d)})
    intervalHolder = []
    createBoxes('henlo',0,1);
    createBoxes('p2',0,1);
    createBoxes('p1',0,1);
    createBoxes('p3',0,1);
}
createBoxes('henlo',500,1);
createBoxes('p1',500,1);
createBoxes('p2',500,1);
createBoxes('p3',500,1);
var element = document.getElementById("p1link")
function createBoxes(id, duration,float=0){
    var el = document.getElementById(id);
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    var pp =document.getElementById(id)
    var wowWidth = pp.getBoundingClientRect().width;
    var wowHeight = pp.getBoundingClientRect().height;
    var txtlen = el.innerHTML.length;
    var w = wowWidth/2;
    var h = wowHeight/2;
    var posW = w+txtlen/4*fontSize + fontSize;
    var negW = w-txtlen/4*fontSize - fontSize;
    var posH = h+fontSize;
    var negH = h-fontSize;
    var factor = fontSize/2;
    var data1 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                 {cx: negW,cy:posH,cxe:factor,cye:0},
                 {cx: negW,cy:negH,cxe:factor,cye:0},
                 {cx: posW,cy:negH,cxe:-factor,cye:0},
                 {cx: posW,cy:posH,cxe:0,cye:-factor},
                 {cx: negW,cy:posH,cxe:0,cye:-factor},
                 {cx: negW,cy:negH,cxe:0,cye:factor},
                 {cx: posW,cy:negH,cxe:0,cye:factor}];
    var edges = svg.append("g")
        .attr("class", id + "link")
        .selectAll("line")
        .data(data1)
        .enter().append("line")
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx;})
        .attr("y2", function(d,i){return d.cy;})
        .attr("stroke","#BBB")
        //.attr("stroke-width",2)
        //.transition()
        //.attr("x2", function(d,i){return d.cx+d.cxe;})
        //.attr("y2", function(d,i){return d.cy+d.cye;})
        //.attr("stroke-opacity",1)
        //.delay(function(d,i){return Math.random()*duration;})
        //.duration(duration)
    svg.append("rect").attr("id",id+"rect").attr("x",negW).attr("y",negH).attr("width",posW-negW).attr("height",posH-negH).attr("fill","transparent");
    if(float){
        var currentObject = document.getElementById(id+"rect")
        var myInterval;
        currentObject.onmouseenter = function(){floatBox(wowWidth,wowHeight,data1,1,id,fontSize,txtlen,400);
        myInterval = setInterval(function(){floatBox(wowWidth,wowHeight,data1,1,id,fontSize,txtlen);},800);
        intervalHolder.push(myInterval);
        }
        currentObject.onmouseleave = function(){clearInterval(myInterval); closeBox(data1,id)};
        currentObject.onclick = function(){clearInterval(myInterval);patternBox(data1,id)};





    }

    return data1


}
function closeBox(data,id){
    svg.selectAll("."+id+"link").selectAll("line").data(data).transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx;})
        .attr("y2", function(d,i){return d.cy;})
        .duration(500)
        .delay(function(d,i){return Math.random()*400;});
}
function patternBox(data,id){
    svg.selectAll("."+id+"link").selectAll("line").data(data).transition()
        .attr("x1", function(d,i){return d.cx+d.cxe;})
        .attr("y1", function(d,i){return d.cy+d.cye;})
        .attr("x2", function(d,i){return d.cx+2*d.cxe;;})
        .attr("y2", function(d,i){return d.cy+2*d.cye;})
        .duration(500)
        .delay(100);
}

function floatBox(wowWidth,wowHeight, origData,increase,id,fontSize,txtlen, delay=0){
    var w = wowWidth/2;
    var h = wowHeight/2;
    var nF = fontSize + increase;
    var posW = w+txtlen/4*nF + nF;
    var negW = w-txtlen/4*nF - nF;
    var posH = h+nF;
    var negH = h-nF;
    var factor = nF/2;
    var data1 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                 {cx: negW,cy:posH,cxe:factor,cye:0},
                 {cx: negW,cy:negH,cxe:factor,cye:0},
                 {cx: posW,cy:negH,cxe:-factor,cye:0},
                 {cx: posW,cy:posH,cxe:0,cye:-factor},
                 {cx: negW,cy:posH,cxe:0,cye:-factor},
                 {cx: negW,cy:negH,cxe:0,cye:factor},
                 {cx: posW,cy:negH,cxe:0,cye:factor}];
    svg.selectAll("."+id+"link").selectAll("line").data(data1).transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .duration(400)
        .delay(function(d,i){return Math.random()*delay;})

        .ease(d3.easeSin)
     svg.selectAll("."+id+"link").selectAll("line").data(origData).transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .duration(400)
        .ease(d3.easeSin)
        .delay(400);
}


function sinDegrees(angle) {return Math.sin(angle/180*Math.PI);};


function lightBox(ele){
    var el = ele.replace(/\s+/g, '');
    var invert = Math.random()>.5;
    var pp =document.getElementById("henlo")
    var cc =document.getElementById("p1")
    var titleHeight = pp.getBoundingClientRect().height
    var menuHeight = cc.getBoundingClientRect().height
    var fontSize =Math.random()*5+13;
    var txtlen = ele.length;
    var wowWidth = Math.random()*(width-fontSize*txtlen) *2 + (fontSize+1)*txtlen;
    var wowHeight = Math.random()*(height-fontSize*txtlen)*2 + (3.3*fontSize);
    while(wowHeight>(titleHeight-6*fontSize) & wowHeight<menuHeight+6*fontSize){
        wowHeight =Math.random()*(height-fontSize*txtlen)*2 + (3.3*fontSize);
    }
    var w = wowWidth/2;
    var h = wowHeight/2;
    //var posW = w+txtlen/4*fontSize + fontSize;
    //var negW = w-txtlen/4*fontSize - fontSize;
    var posW = w+fontSize/3;
    var negW = w-fontSize/3;
    //var posH = h+fontSize;
    //var negH = h-fontSize;
    var posH = h+fontSize/3;
    var negH = h-fontSize/3;
    var factor = fontSize/1.5;
    if(invert){
            var data1 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                 //{cx: negW,cy:posH,cxe:factor,cye:0},
                 {cx: negW,cy:negH,cxe:factor,cye:0},
                 //{cx: posW,cy:negH,cxe:-factor,cye:0},
                 {cx: posW,cy:posH,cxe:0,cye:-factor},
                 //{cx: negW,cy:posH,cxe:0,cye:-factor},
                 {cx: negW,cy:negH,cxe:0,cye:factor},
                 //{cx: posW,cy:negH,cxe:0,cye:factor}
                ];
    }else{
        var data1 = [{cx: negW,cy:posH,cxe:factor,cye:0},
                    {cx: posW,cy:negH,cxe:-factor,cye:0},
                    {cx: negW,cy:posH,cxe:0,cye:-factor},
                    {cx: posW,cy:negH,cxe:0,cye:factor}
                    ];
    }
    var posW = w+txtlen/3*fontSize + fontSize;
    var negW = w-txtlen/3*fontSize - fontSize;
    if(invert){
        var data2 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                    {cx: negW,cy:negH,cxe:factor,cye:0},
                    {cx: posW,cy:posH,cxe:0,cye:-factor},
                    {cx: negW,cy:negH,cxe:0,cye:factor},
                    ];
    }else{
        var data2 = [{cx: negW,cy:posH,cxe:factor,cye:0},
                    {cx: posW,cy:negH,cxe:-factor,cye:0},
                     {cx: negW,cy:posH,cxe:0,cye:-factor},
                     {cx: posW,cy:negH,cxe:0,cye:factor}
                    ];
    }
    var posH = h+fontSize*1.5;
    var negH = h-fontSize*1.5;
    if(invert){
        var data3 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                    {cx: negW,cy:negH,cxe:factor,cye:0},
                    {cx: posW,cy:posH,cxe:0,cye:-factor},
                    {cx: negW,cy:negH,cxe:0,cye:factor},
                    ];
    }else{
        var data3 = [{cx: negW,cy:posH,cxe:factor,cye:0},
                     {cx: posW,cy:negH,cxe:-factor,cye:0},
                     {cx: negW,cy:posH,cxe:0,cye:-factor},
                     {cx: posW,cy:negH,cxe:0,cye:factor}
                    ];
    }
    var identifier = Date.now().toString();
    var edges = svg.append("g")
        .attr("class", el + identifier)
        .selectAll("line")
        .data(data1)
        .enter().append("line")
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx;})
        .attr("y2", function(d,i){return d.cy;})
        .attr("stroke","#BBB")
        .attr("stroke-width",1)
        .transition()
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .attr("stroke-opacity",1)
        .delay(function(d,i){return Math.random()*400;})
        .duration(500);

    svg.selectAll("."+el + identifier).selectAll("line").data(data2)
        .transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .delay(900)
        .duration(500);
    svg.selectAll("."+el + identifier).selectAll("line").data(data3)
        .transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return  d.cy;})
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .delay(1400)
        .duration(500)
        .transition()
        .delay(6000)
        .duration(6000)
        .attr("stroke-opacity",0);
     var newRect = svg.select("."+el + identifier).append("g")
        .selectAll("rect")
        .data([1])
     newRect.enter().append("rect")
        .attr("class","rando")
        .attr("x",negW+5)
        .attr("y",negH+5)
        .attr("width",posW-negW-10)
        .attr("height",posH-negH-10)
        .attr("fill","transparent")
        .transition()
        .attr("fill",color[Math.floor(Math.random()*color.length)])
        .attr("opacity",.75)
        .delay(1900)
        .duration(1000)
        .ease(d3.easeBounceIn)
        .transition()
        .attr("opacity",0)
        .delay(5000)
        .duration(6000);

    var text = svg.select("."+el + identifier).append("g")
        .selectAll("text")
        .data([1])
        .enter().append("text")
        .attr("x",negW+5 + (posW-negW-10-fontSize*txtlen)/2)
        .attr("y",negH+5)
        .attr("width",5)
        .attr("height",5)
        .text(ele)
        .attr("font-size",fontSize)
        .attr("fill","#444")
        .attr("opacity",0)
        .attr("font-weight","bold")
        .transition()
        .attr("x",function(d){return negW+ (posW-negW-this.getBoundingClientRect().width)/2})
        .attr("y",function(d){return negH + this.getBoundingClientRect().height
        +(posH-negH-this.getBoundingClientRect().height)/3.3})
        .transition()
        .attr("opacity",1)
        .delay(1900)
        .duration(1000)
        .ease(d3.easeBounceIn)
        .transition()
        .delay(5000)
        .attr("opacity",0)
        .duration(6000);

    svg.select("."+el + identifier).transition().delay(15000).remove();
}
function activateLight(){
    var selection = wordList[Math.floor(Math.random()*wordList.length)];
    lightBox(selection);
}
var wordList = ["Data Science","Bioinformatics","Machine Learning","D3","Javascript","Python","Biomedical Engineering","Computer Science", "R","Matlab","LabVIEW","Statistical Programming","Piano","Pandas","TensorFlow","AWS","Spark","Hadoop","SQL","ClustalW","MAFFT","Git","Windows","Linux","Java","Bootstrap","HTML5","CSS3"]
//activateLight();

//setInterval(activateLight,3000)


function lightBoxID(id){
    var el = document.getElementById(id);
    var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
    var pp =document.getElementById(id)
    var wowWidth = pp.getBoundingClientRect().width;
    var wowHeight = pp.getBoundingClientRect().height;
    var ele = el.innerHTML;
    var txtlen = ele.length;
    var w = wowWidth/2;
    var h = wowHeight/2;
    var posW = w+txtlen/4*fontSize + fontSize;
    var negW = w-txtlen/4*fontSize - fontSize;
    var posH = h+fontSize;
    var negH = h-fontSize;
    var factor = fontSize/2;
    var invert = Math.random()>.5;
    var pp =document.getElementById("henlo")
    var cc =document.getElementById("p1")
    var titleHeight = pp.getBoundingClientRect().height
    var menuHeight = cc.getBoundingClientRect().height
    //var posW = w+txtlen/4*fontSize + fontSize;
    //var negW = w-txtlen/4*fontSize - fontSize;
    var posW = w+fontSize/3;
    var negW = w-fontSize/3;
    //var posH = h+fontSize;
    //var negH = h-fontSize;
    var posH = h+fontSize/3;
    var negH = h-fontSize/3;
    var factor = fontSize/1.5;
    if(invert){
            var data1 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                 //{cx: negW,cy:posH,cxe:factor,cye:0},
                 {cx: negW,cy:negH,cxe:factor,cye:0},
                 //{cx: posW,cy:negH,cxe:-factor,cye:0},
                 {cx: posW,cy:posH,cxe:0,cye:-factor},
                 //{cx: negW,cy:posH,cxe:0,cye:-factor},
                 {cx: negW,cy:negH,cxe:0,cye:factor},
                 //{cx: posW,cy:negH,cxe:0,cye:factor}
                ];
    }else{
        var data1 = [{cx: negW,cy:posH,cxe:factor,cye:0},
                    {cx: posW,cy:negH,cxe:-factor,cye:0},
                    {cx: negW,cy:posH,cxe:0,cye:-factor},
                    {cx: posW,cy:negH,cxe:0,cye:factor}
                    ];
    }
    var posW = w+txtlen/3*fontSize + fontSize;
    var negW = w-txtlen/3*fontSize - fontSize;
    if(invert){
        var data2 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                    {cx: negW,cy:negH,cxe:factor,cye:0},
                    {cx: posW,cy:posH,cxe:0,cye:-factor},
                    {cx: negW,cy:negH,cxe:0,cye:factor},
                    ];
    }else{
        var data2 = [{cx: negW,cy:posH,cxe:factor,cye:0},
                    {cx: posW,cy:negH,cxe:-factor,cye:0},
                     {cx: negW,cy:posH,cxe:0,cye:-factor},
                     {cx: posW,cy:negH,cxe:0,cye:factor}
                    ];
    }
    var posH = h+fontSize*1.5;
    var negH = h-fontSize*1.5;
    if(invert){
        var data3 = [{cx: posW,cy:posH,cxe:-factor,cye:0},
                    {cx: negW,cy:negH,cxe:factor,cye:0},
                    {cx: posW,cy:posH,cxe:0,cye:-factor},
                    {cx: negW,cy:negH,cxe:0,cye:factor},
                    ];
    }else{
        var data3 = [{cx: negW,cy:posH,cxe:factor,cye:0},
                     {cx: posW,cy:negH,cxe:-factor,cye:0},
                     {cx: negW,cy:posH,cxe:0,cye:-factor},
                     {cx: posW,cy:negH,cxe:0,cye:factor}
                    ];
    }
    var identifier = Date.now().toString();
    var edges = svg.append("g")
        .attr("class", id + identifier)
        .selectAll("line")
        .data(data1)
        .enter().append("line")
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx;})
        .attr("y2", function(d,i){return d.cy;})
        .attr("stroke","#BBB")
        .attr("stroke-width",1)
        .transition()
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .attr("stroke-opacity",1)
        .delay(function(d,i){return Math.random()*400;})
        .duration(500);

    svg.selectAll("."+id + identifier).selectAll("line").data(data2)
        .transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return d.cy;})
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .delay(900)
        .duration(500);
    svg.selectAll("."+id + identifier).selectAll("line").data(data3)
        .transition()
        .attr("x1", function(d,i){return d.cx;})
        .attr("y1", function(d,i){return  d.cy;})
        .attr("x2", function(d,i){return d.cx+d.cxe;})
        .attr("y2", function(d,i){return d.cy+d.cye;})
        .delay(1400)
        .duration(500)
        .transition()
        .delay(6000)
        .duration(6000)
        .attr("stroke-opacity",0);
     var newRect = svg.select("."+id + identifier).append("g")
        .selectAll("rect")
        .data([1])
     newRect.enter().append("rect")
        .attr("class","rando")
        .attr("x",negW+5)
        .attr("y",negH+5)
        .attr("width",posW-negW-10)
        .attr("height",posH-negH-10)
        .attr("fill","transparent")
        .transition()
        .attr("fill",color[Math.floor(Math.random()*color.length)])
        .attr("opacity",.75)
        .delay(1900)
        .duration(1000)
        .ease(d3.easeBounceIn)
        .transition()
        .attr("opacity",0)
        .delay(5000)
        .duration(6000);

    var text = svg.select("."+id + identifier).append("g")
        .selectAll("text")
        .data([1])
        .enter().append("text")
        .attr("x",negW+5 + (posW-negW-10-fontSize*txtlen)/2)
        .attr("y",negH+5)
        .attr("width",5)
        .attr("height",5)
        .text(ele)
        .attr("font-size",fontSize)
        .attr("fill","#444")
        .attr("opacity",0)
        .attr("font-weight","bold")
        .transition()
        .attr("x",function(d){return negW+ (posW-negW-this.getBoundingClientRect().width)/2})
        .attr("y",function(d){return negH + this.getBoundingClientRect().height
        +(posH-negH-this.getBoundingClientRect().height)/3.3})
        .transition()
        .attr("opacity",1)
        .delay(1900)
        .duration(1000)
        .ease(d3.easeBounceIn)
        .transition()
        .delay(5000)
        .attr("opacity",0)
        .duration(6000);

    svg.select("."+id + identifier).transition().delay(15000).remove();
}
