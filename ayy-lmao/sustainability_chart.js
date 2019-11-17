google.charts.load("current", {
  packages: ["corechart", "bar"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var el = {
    average: 18581,
    current_week: 9260,
    maximum: 24187,
    minimum: 9260,
    total: 854707
  };

  var water = {
    average: 20.41,
    current_week: 16.22,
    maximum: 37.99,
    minimum: 16.22,
    total: 1490.69
  };

  var data = google.visualization.arrayToDataTable([
    ["One week vs. average", "Electricity", "Water"],
    ["This week", el.current_week, water.current_week],
    ["Average", el.average, water.average]
  ]);

  var materialOptions = {
    chart: {
      title: "Electricity and Water Consumption",
      subtitle: "Weekly consumption versus average 2018"
    },
    series: {
      0: {
        axis: "Electricity"
      },
      1: {
        axis: "Water"
      }
    },
    axes: {
      y: {
        Electricity: {
          label: "kWh"
        }, // Left y-axis.
        Water: {
          side: "right",
          label: "cubic meters"
        } // Right y-axis.
      }
    },
    colors: ["gold", "blue"]
  };

  var chart = new google.charts.Bar(
    document.getElementById("columnchart_material")
  );

  chart.draw(data, google.charts.Bar.convertOptions(materialOptions));
}
