function scrollVis(data) {
  // constants to define the size
  // and margins of the vis area.
  var width = 600;
  var height = 600;
  var margin = { top: 20, left: 10, bottom: 20, right: 10 };

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

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

      setupVis(data);
      mData = macsData(data);
      ld = linesData(data, mData);
      macCount = ld[1]
      lData = ld[0];
      showTitle(mData, lData, macCount);

    })
  }

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   */
  var setupVis = function (data) {
    g.append('text')
      .attr('class', 'intro')
      .attr('x', width - 100)
      .attr('y', height / 5)
      .text('58 Modules');

    var startTime = data["Frame"]["Begin"]
    var endTime = data["Frame"]["End"]
    g.append('text')
      .attr('class', 'intro')
      .attr('x', width - 100)
      .attr('y', height / 4)
      .text(parseTime(endTime) - parseTime(startTime) + " minutes");

    g.append('text')
      .attr('class', 'intro')
      .attr('x', width - 100)
      .attr('y', height / 3)
      .text('2039 Total Flows');

  }

  function showTitle(macsFrom, lData, macCount) {
    g.selectAll('.intro')
      .transition()
      .duration(600)
      .attr('opacity', 1.0);

    for (var i=0; i<lData.length; i++){
      g.append("line")
      .attr("x1", lData[i]['macA']['x'])
      .attr("x2", lData[i]['macB']['x'])
      .attr("y1", lData[i]['macA']['y'])
      .attr("y2", lData[i]['macB']['y'])
      .attr("stroke", "blue")
      .attr("opacity", 0.2)
      .attr("stroke-width", 1)
      .attr("fill", "none");
    }

    var circles = g.selectAll("circle")
      .data(macsFrom)
      .enter()
      .append("circle");

    var div = d3.select('#vis').append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var radius = 15;

    var circleAttributes = circles
      .attr('opacity', 0.5)
      .attr('id', function (d) {
        return d['id'];
      })
      .attr("cx", function (d) {
        return d['x'];
      })
      .attr("cy", function (d) {
        return d['y'];
      })
      .attr("r", function (d) { return radius; })
      .style("fill", function (d) {
        return "red";
      })
      .on('mouseover', function (d, i) {
        d3.select(this)
          .attr('opacity', 1)
          .attr("r", radius + 1);

        div.transition()
          .duration(50)
          .style("opacity", 1);

        div.html("MAC: " + d['id'] + 
                "<br>" + "Sent: " + macCount[ d['id']]['send'] +
                "<br>" + "Receive: " + macCount[ d['id']]['rec'])
          .style("left", (d['x'] + 330) + "px")
          .style("top", (d['y'] + 60) + "px");


      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .attr('opacity', 0.5)
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

  return chart;

}

//////////////////////////////////// DATA PROCESSING //////////////////////////////////////////////////

function linesData(data, macs) {
  var macDic = {}
  var macCount = {}
  for (var m = 0; m < macs.length; m++) {
    macDic[macs[m]['id']] = { 'x': macs[m]['x'], 'y': macs[m]['y'] };
    macCount[macs[m]['id']] = {'send': 0, 'rec': 0};
  }

  var final = []
  var flows = data["FlowTable"]
  for (var i = 0; i < flows.length; i++) {
    var maca = flows[i]["Flow"]["component-A"]["mac"];
    var macb = flows[i]["Flow"]["component-B"]["mac"];
    macCount[maca]['send'] += 1;
    macCount[macb]['rec'] += 1;
    final.push({
      'macA': {
        'x': macDic[maca]['x'],
        'y': macDic[maca]['y']
      },
      'macB': {
        'x': macDic[macb]['x'],
        'y': macDic[macb]['y']
      }
    })
  }
  return [final, macCount];
}

function macsData(data) {
  var final = []
  var macsFrom = []
  var radius = 15;

  var xstart = 100 - (3 * radius);
  var ystart = 15;
  var ycount = -1;
  var xcount = -1;
  var skip = 5;

  var flows = data["FlowTable"]
  for (var i = 0; i < flows.length; i++) {
    var maca = flows[i]["Flow"]["component-A"]["mac"];
    var macb = flows[i]["Flow"]["component-B"]["mac"];

    if (!macsFrom.includes(maca)) {
      xstart += radius * 3;
      xcount += 1;
      if (xcount > skip) {
        xstart = 100;
        xcount = 0;
      }
      ycount += 1;
      if (ycount > skip) {
        ystart += radius * 3;
        ycount = 0;
      }
      macsFrom.push(maca);
      final.push({ 'id': maca, 'x': xstart, 'y': ystart })
    }

    if (!macsFrom.includes(macb)) {
      xstart += radius * 3;
      xcount += 1;
      if (xcount > skip) {
        xstart = 100;
        xcount = 0;
      }
      ycount += 1;
      if (ycount > skip) {
        ystart += radius * 3;
        ycount = 0;
      }
      macsFrom.push(macb);
      final.push({ 'id': macb, 'x': xstart, 'y': ystart })
    }
  }
  return final
}


/////////////////////////////////////////////// EXTRA /////////////////////////////////////////////////////////

function parseTime(s) {
  var c = s.split(':');
  return parseInt(c[0]) * 60 + parseInt(c[1]);
}

///////////////////////////////////////////// ADMIN /////////////////////////////////////////////////////////////

function run() {
  fetch("data/GHC-Problem3-Data.json")
    .then(response => response.json())
    .then(json =>
      everything(json)
    );
}

function everything(data) {
  display(data);
}

run();

function display(data) {
  var plot = scrollVis(data);
  d3.select('#vis')
    .datum(data)
    .call(plot);
}