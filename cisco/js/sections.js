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
var scrollVis = function () {
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

  var chart = function (selection) {
    selection.each(function () {
      // create svg and give it a width and height
      svg = d3.select(this).append('svg')
      svg.attr('width', width + margin.left + margin.right);
      svg.attr('height', height + margin.top + margin.bottom);

      svg.append('g');
      g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // set up visualizations function
      setupVis();
      setupSections();
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
    
      console.log(g);
  }

  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showTitle;
    activateFunctions[1] = showFillerTitle;
    // activateFunctions[2] = showGrid;
    // activateFunctions[3] = highlightGrid;
    // activateFunctions[4] = showBar;
    // activateFunctions[5] = showHistPart;
    // activateFunctions[6] = showHistAll;
    // activateFunctions[7] = showCough;
    // activateFunctions[8] = showHistAll;

    for (var i = 0; i < 1; i++) {
      updateFunctions[i] = function () {};
    }

  };

  function showTitle() {
    g.selectAll('.count-title')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.openvis-title')
      .transition()
      .duration(600)
      .attr('opacity', 1.0);
  }

  function showFillerTitle() {
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
        activateFunctions[i]();
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
  var plot = scrollVis();
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

function complete(data) {
  console.log(data);
  var packetSize = []
  var macsFrom = []

  var jsonCircles = [
    { "macA": "00:01:23:37:cf:8c", "macB": "00:01:23:37:cf:8b"}
  ]

  flows = data["FlowTable"]
  for (var i=0; i<flows.length; i++){
    packetSize.push(flows[i]["FlowInfo"]["stats"][0]["packets"]);
    var maca = flows[i]["Flow"]["component-A"]["mac"];
    var macb = flows[i]["Flow"]["component-B"]["mac"];
    if (!macsFrom.includes(maca)){
      macsFrom.push(maca);
    }
    if (!macsFrom.includes(macb)){
      macsFrom.push(macb);
    }
  }
  console.log(packetSize);
  const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  console.log(average(packetSize));
  console.log(macsFrom);



/////////////////////////////////////////////////
  var width = 800;
  var height = 650;
  var margin = { top: 30, left: 20, bottom: 40, right: 10 };

  var svgContainer = d3.select('#extra-space').append("svg")
    .attr("width", 800)
    .attr("height", 600);

  var circles = svgContainer.selectAll("circle")
    .data(macsFrom)
    .enter()
    .append("circle");
  
  var div = d3.select('#extra-space').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var xstart = 0;
  var ystart = 20;

  var circleAttributes = circles
    .attr("cx", function (d) { 
      xstart += 12
      return xstart; 
    })
    .attr("cy", function (d) { 
      return ystart; 
      // var startTime = d['FlowInfo']["firstseen"];
      // var endTime = d['FlowInfo']["lastseen"];
      // return parseTime(endTime)-parseTime(startTime); 
    })
    .attr("r", function (d) { return 5; })
    .style("fill", function(d) { 
      return "red"; 
    })
    .on('mouseover', function (d, i) {      
      div.transition()
               .duration(50)
               .style("opacity", 1);
      
      if (d3.event.pageX > 500){
        div.html("mac: "+d)
          .style("left", (d3.event.pageX - 80) + "px")
          .style("top", (d3.event.pageY + 15) + "px");
      }else{
        div.html("mac: "+d)
          .style("left", (d3.event.pageX - 10) + "px")
          .style("top", (d3.event.pageY + 15) + "px");
      }
      
    })
    .on('mouseout', function (d, i) {
      div.transition()
               .duration('50')
               .style("opacity", 0);
    });
}


function parseTime(s) {
  var c = s.split(':');
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}