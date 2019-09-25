function scrollVis3(data) {
  // constants to define the size
    // and margins of the vis area.
    var width = 800;
    var height = 500;
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
        .attr('class', 'intro2')
        .attr('x', width - 330)
        .attr('y', height / 5)
        .text('MAC 00:11:43:6c:f8:89');
  
      var startTime = data["Frame"]["Begin"]
      var endTime = data["Frame"]["End"]
      g.append('text')
        .attr('class', 'intro2')
        .attr('x', width - 330)
        .attr('y', height / 4)
        .text('sent the most packets');
  
      g.append('text')
        .attr('class', 'intro2')
        .attr('x', width - 330)
        .attr('y', height / 3)
        .text('Exceeding 300,000 packets');
  
    }
  
    function showTitle(macsFrom, lData, macCount) {
      g.selectAll('.intro')
        .transition()
        .duration(600)
        .attr('opacity', 1.0);
  
      var circles = g.selectAll("circle")
        .data(macsFrom)
        .enter()
        .append("circle");
  
      var div = d3.select('#vis3').append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
  
      
      var radiusScale = d3.scaleLog()
            .domain([1, 370000])
            .range([8, 30]);
  
      var circleAttributes = circles
        .attr('opacity', 0.5)
        .attr('id', function (d) {
          return 'name'+(d['id']).replace(/[\[\]:]+/g,'');
        })
        .attr("cx", function (d) {
          return d['x'];
        })
        .attr("cy", function (d) {
          return d['y'];
        })
        .attr("r", function (d) { 
          var packetCount = macCount[ d['id']]['packetsS'];
          if (packetCount == 0){
            return 8;
          }
          return radiusScale(packetCount);
        })
        .style("fill", function (d) {
          var packetCount = macCount[ d['id']]['packetsS'];
          if (packetCount == 0){
            return "black"
          }
          return "blue";
        })
        .on('click', function(d, i) {
          var packetCount = macCount[ d['id']]['packetsS'];
          g.selectAll("circle")
            .transition()
            .duration(100)
            .attr('stroke-width', 0);

          if (packetCount != 0){
          for (var rec=0; rec<macCount[ d['id']]['receivers'].length; rec++){
            var recer = (macCount[ d['id']]['receivers'][rec]).replace(/[\[\]:]+/g,'');
            d3.select('#name'+recer)
              .transition()
              .duration(100)
              .attr('stroke-width', 5)
              .attr('stroke', 'yellow');
          }
          }
          

        })
        .on('mouseover', function (d, i) {
          var packetCount = macCount[ d['id']]['packetsS'];
          d3.select(this)
            .attr('opacity', 1);
  
          div.transition()
            .duration(50)
            .style("opacity", 1);
  
          div.html("MAC: " + d['id'] + 
                  "<br>" + "Packets Sent: " + macCount[ d['id']]['packetsS'] +
                  "<br>" + "L2-bytes: " + macCount[ d['id']]['l2-bytesR']+
                  "<br>" + "L7-bytes: " + macCount[ d['id']]['l7-bytesR'])
            .style("left", (d['x'] +  318) + "px")
            .style("top", (d['y'] + 1489 - radiusScale(packetCount)) + "px");
  
  
        })
        .on('mouseout', function (d, i) {
          d3.select(this)
            .attr('opacity', 0.5);
  
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

function scrollVis2(data) {
// constants to define the size
  // and margins of the vis area.
  var width = 800;
  var height = 500;
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
      .attr('class', 'intro2')
      .attr('x', width - 330)
      .attr('y', height / 5)
      .text('MAC 00:80:f4:01:3a:fa');

    var startTime = data["Frame"]["Begin"]
    var endTime = data["Frame"]["End"]
    g.append('text')
      .attr('class', 'intro2')
      .attr('x', width - 330)
      .attr('y', height / 4)
      .text('received the most packets');

    g.append('text')
      .attr('class', 'intro2')
      .attr('x', width - 330)
      .attr('y', height / 3)
      .text('Exceeding 300,000 packets');

  }

  function showTitle(macsFrom, lData, macCount) {
    g.selectAll('.intro')
      .transition()
      .duration(600)
      .attr('opacity', 1.0);

    var circles = g.selectAll("circle")
      .data(macsFrom)
      .enter()
      .append("circle");

    var div = d3.select('#vis2').append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

      var radiusScale = d3.scaleLog()
      .domain([1, 370000])
      .range([8, 30]);

    var circleAttributes = circles
      .attr('opacity', 0.5)
      .attr('id', function (d) {
        return "names"+d['id'].replace(/[\[\]:]+/g,'');
      })
      .attr("cx", function (d) {
        return d['x'];
      })
      .attr("cy", function (d) {
        return d['y'];
      })
      .attr("r", function (d) { 
        var packetCount = macCount[ d['id']]['packetsR'];
        if (packetCount == 0){
          return 8;
        }
        return radiusScale(packetCount);
      })
      .style("fill", function (d) {
        var packetCount = macCount[ d['id']]['packetsR'];
        if (packetCount == 0){
          return "black"
        }
        return "red";
      })
      .on('click', function(d, i) {
        g.selectAll("circle")
          .attr('stroke-width', 0);
        var packetCount = macCount[ d['id']]['packetsR'];
        if (packetCount != 0){
        for (var rec=0; rec<macCount[ d['id']]['senders'].length; rec++){
          var recer = (macCount[ d['id']]['senders'][rec]).replace(/[\[\]:]+/g,'');
          d3.select('#names'+recer)
            .attr('stroke-width', 5)
            .attr('stroke', 'yellow');
        }
        }
        

      })
      .on('mouseover', function (d, i) {
        var packetCount = macCount[ d['id']]['packetsR'];
        d3.select(this)
          .attr('opacity', 1);

        div.transition()
          .duration(50)
          .style("opacity", 1);

        div.html("MAC: " + d['id'] + 
                "<br>" + "Packets Received: " + macCount[ d['id']]['packetsR'] +
                "<br>" + "L2-bytes: " + macCount[ d['id']]['l2-bytes']+
                "<br>" + "L7-bytes: " + macCount[ d['id']]['l7-bytes'])
          .style("left", (d['x'] +  318) + "px")
          .style("top", (d['y'] + 794 - radiusScale(packetCount)) + "px");


      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .attr('opacity', 0.5);

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

function scrollVis(data) {
  // constants to define the size
  // and margins of the vis area.
  var width = 700;
  var height = 500;
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
      .attr('x', width - 230)
      .attr('y', height / 5)
      .text('58 Modules');

    var startTime = data["Frame"]["Begin"]
    var endTime = data["Frame"]["End"]
    g.append('text')
      .attr('class', 'intro')
      .attr('x', width - 230)
      .attr('y', height / 4)
      .text(parseTime(endTime) - parseTime(startTime) + " minutes of data");

    g.append('text')
      .attr('class', 'intro')
      .attr('x', width - 230)
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
          .style("left", (d['x'] + 317) + "px")
          .style("top", (d['y'] + 100) + "px");


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
    macCount[macs[m]['id']] = {'send': 0, 'rec': 0, 'l2-bytes': 0, 'l7-bytes': 0, 'packetsR': 0, 
    'packetsS': 0, 'l2-bytesR': 0, 'l7-bytesR': 0, 
    'senders': [], 'receivers': []};
  }

  var final = []
  var flows = data["FlowTable"]
  for (var i = 0; i < flows.length; i++) {
    var maca = flows[i]["Flow"]["component-A"]["mac"];
    var macb = flows[i]["Flow"]["component-B"]["mac"];
    var direction = flows[i]["FlowInfo"]["stats"][0]["Direction"] == "A→B"
    if (direction){
      macCount[maca]['send'] += 1;
      macCount[macb]['rec'] += 1;
      if (!macCount[maca]['receivers'].includes(macb)){
        macCount[maca]['receivers'].push(macb);
      }
      if (!macCount[macb]['senders'].includes(maca)){
        macCount[macb]['senders'].push(maca);
      }
      if (flows[i]["FlowInfo"]["stats"][0]["l7-bytes"]){
        macCount[macb]['l2-bytes'] += flows[i]["FlowInfo"]["stats"][0]["l2-bytes"];
        macCount[macb]['l7-bytes'] += flows[i]["FlowInfo"]["stats"][0]["l7-bytes"];
        macCount[maca]['l2-bytesR'] += flows[i]["FlowInfo"]["stats"][0]["l2-bytes"];
        macCount[maca]['l7-bytesR'] += flows[i]["FlowInfo"]["stats"][0]["l7-bytes"];
        macCount[macb]['packetsR'] += flows[i]["FlowInfo"]["stats"][0]["packets"];
        macCount[maca]['packetsS'] += flows[i]["FlowInfo"]["stats"][0]["packets"];
      }
      
    }else{
      macCount[macb]['send'] += 1;
      macCount[maca]['rec'] += 1;
      if (!macCount[maca]['senders'].includes(macb)){
        macCount[maca]['senders'].push(macb);
      }
      if (!macCount[macb]['receivers'].includes(maca)){
        macCount[macb]['receivers'].push(maca);
      }
      if (flows[i]["FlowInfo"]["stats"][0]["l7-bytes"]){
        macCount[maca]['l2-bytes'] += flows[i]["FlowInfo"]["stats"][0]["l2-bytes"];
        macCount[maca]['l7-bytes'] += flows[i]["FlowInfo"]["stats"][0]["l7-bytes"];
        macCount[macb]['l2-bytesR'] += flows[i]["FlowInfo"]["stats"][0]["l2-bytes"];
        macCount[macb]['l7-bytesR'] += flows[i]["FlowInfo"]["stats"][0]["l7-bytes"];
        macCount[maca]['packetsR'] += flows[i]["FlowInfo"]["stats"][0]["packets"];
        macCount[macb]['packetsS'] += flows[i]["FlowInfo"]["stats"][0]["packets"];
      }
    }
    
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

  var xstart = 20 - (4 * radius);
  var ystart = 15;
  var ycount = -1;
  var xcount = -1;
  var skip = 6;

  var flows = data["FlowTable"]
  for (var i = 0; i < flows.length; i++) {
    var maca = flows[i]["Flow"]["component-A"]["mac"];
    var macb = flows[i]["Flow"]["component-B"]["mac"];

    if (!macsFrom.includes(maca)) {
      xstart += radius * 4;
      xcount += 1;
      if (xcount > skip) {
        xstart = 20;
        xcount = 0;
      }
      ycount += 1;
      if (ycount > skip) {
        ystart += radius * 4;
        ycount = 0;
      }
      macsFrom.push(maca);
      final.push({ 'id': maca, 'x': xstart, 'y': ystart })
    }

    if (!macsFrom.includes(macb)) {
      xstart += radius * 4;
      xcount += 1;
      if (xcount > skip) {
        xstart = 20;
        xcount = 0;
      }
      ycount += 1;
      if (ycount > skip) {
        ystart += radius * 4;
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

  var plot2 = scrollVis2(data);
  d3.select('#vis2')
    .datum(data)
    .call(plot2);

  var plot3 = scrollVis3(data);
  d3.select('#vis3')
    .datum(data)
    .call(plot3);
}