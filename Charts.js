function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples);
    console.log(data);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var numberSamples = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(numberSamples);
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = numberSamples[0];
    console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;
    console.log(otuIds);
    console.log(otuLabels);
    console.log(sampleValues);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).map(id => "OTU" + id).reverse();
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues,
      y: yticks,
      type: "bar",
      orientation: "h",
      text: otuLabels
    }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      titlefont: {"size": 25},
     };
    // 10. Use Plotly to plot the data with the layout. 
    updatePlotly.newPlot("bar", barData, barLayout);
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      }
    }
    ];
    console.log(bubbleData);

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      xaxis: {title: "OTU ID", automargin: true},
      yaxis: {automargin: true},
      hovermode: "closest"
      
    };
    console.log(bubbleLayout);

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    console.log(metadata);
    // Create a variable that holds the first sample in the array.
    var sampleArray = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(sampleArray);
    var arrayResults = sampleArray[0];
    console.log(arrayResults);

    // 3. Create a variable that holds the washing frequency.
    var wfreq = arrayResults.wfreq
    console.log(wfreq)

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      title: {text: "Scrubs per Week", font: {size: 18}},
      type: "indicator",
      mode: "gauge+number",
      value: wfreq,
      tickmode: 'linear',
      gauge: {
        axis: { range: [null, 10], dtick: 2, tick0: 0 },
        bar: { color: "firebrick" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 2], color: "floralwhite"},
          { range: [2, 4], color: "lavender"},
          { range: [4, 6], color: "thistle"},
          { range: [6, 8], color: "mediumslateblue" },
          { range: [8, 10], color: "royalblue" },
        ]},
        
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: "Belly Button Washing Frequency",
      titlefont: {"size": 25} 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}

