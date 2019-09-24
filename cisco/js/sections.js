function run(){
  fetch("data/GHC-Problem3-Data.json")
  .then(response => response.json())
  .then(json => 
    everything(json)
    );
}

function everything(data){
  //////////

  display(data);
  complete(data);
}

run();

/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function (data) {
  // constants to define the size
  // and margins of the vis area.
  var width = 600;
  var height = 520;
  var margin = { top: 0, left: 20, bottom: 40, right: 10 };

  var lastIndex = -1;
  var activeIndex = 0;
  var activateFunctions = [];
  var updateFunctions = [];


  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  // We will set the domain when the
  // data is processed.
  // @v4 using new scale names
  var xBarScale = d3.scaleLinear()
    .range([0, width]);

  // The bar chart display is horizontal
  // so we can use an ordinal scale
  // to get width and y locations.
  // @v4 using new scale type
  var yBarScale = d3.scaleBand()
    .paddingInner(0.08)
    .domain([0, 1, 2])
    .range([0, height - 50], 0.1, 0.1);

  // Color is determined just by the index of the bars
  var barColors = { 0: '#008080', 1: '#399785', 2: '#5AAF8C' };

  var chart = function (selection, data) {
    selection.each(function (data) {
      // create svg and give it a width and height
      svg = d3.select(this).append('svg')
      svg.attr('width', width + margin.left + margin.right);
      svg.attr('height', height + margin.top + margin.bottom);

      svg.append('g');
      g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // set up visualizations function

      setupVis();
      activateFunctions.push(
        showTitle(),
        showFillerTitle(data)
        )
    })
  }

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   */
  var setupVis = function () {

    // count openvis title
    g.append('text')
      .attr('class', 'title openvis-title')
      .attr('x', width / 2)
      .attr('y', height / 3)
      .text('2013');
    }

  function showTitle() {

    ////////////////////////////////

    g.selectAll('.openvis-title')
      .transition()
      .duration(600)
      .attr('opacity', 1.0);
  }

  function showFillerTitle(data) {
    var macsFrom = macsData(data)


    var circles = g.selectAll("circle")
    .data(macsFrom)
    .enter()
    .append("circle");
  
  var div = d3.select('#vis').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var xstart = 200;
  var ystart = 20;
  var ycount = -1;
  var xcount = -1;

  var radius = 10;
  var skip = 5;

  var circleAttributes = circles
    .attr('opacity', 0.6)
    .attr("cx", function (d) { 
      xcount += 1;
      if (xcount > skip){
        xstart = 200;
        xcount = 0;
      }
      xstart += radius * 3;
      return xstart; 
    })
    .attr("cy", function (d) { 
      ycount += 1;
      if (ycount > skip){
        ystart += radius * 3;
        ycount = 0;
      }
      return ystart; 
    })
    .attr("r", function (d) { return radius; })
    .style("fill", function(d) { 
      return "red"; 
    })
    .on('mouseover', function (d, i) {  
      d3.select(this)
        .attr('opacity', 1)
        .attr("r", radius + 1);

      div.transition()
               .duration(50)
               .style("opacity", 1);

      console.log(d3.event.mouseX);
      
      div.html("mac: "+d)
        .style("left", (event.clientX - 275) + "px")
        .style("top", (event.clientY - 75) + "px");
      
      
    })
    .on('mouseout', function (d, i) {
      d3.select(this)
        .attr('opacity', 0.6)
        .attr("r", radius);

      div.transition()
               .duration('50')
               .style("opacity", 0);
    });

    g.selectAll('.openvis-title')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.square')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.count-title')
      .transition()
      .duration(600)
      .attr('opacity', 1.0);
  }


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      if (i < activateFunctions.length){
        activateFunctions[i];
      } 
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function (index, progress) {
    if (index < updateFunctions.length-1){
      updateFunctions[index](progress);
    }
  };
 
  return chart;

}

function display(data) {
  // create a new plot and
  // display it
  var plot = scrollVis(data);
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    plot.update(index, progress);
  });
}

function macsData(data){
  var macsFrom = []

  var flows = data["FlowTable"]
  for (var i=0; i<flows.length; i++){
    var maca = flows[i]["Flow"]["component-A"]["mac"];
    var macb = flows[i]["Flow"]["component-B"]["mac"];
    if (!macsFrom.includes(maca)){
      macsFrom.push(maca);
    }
    if (!macsFrom.includes(macb)){
      macsFrom.push(macb);
    }
  }
  return macsFrom
}

function complete(data) {
  console.log(data);
  
}


function parseTime(s) {
  var c = s.split(':');
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}