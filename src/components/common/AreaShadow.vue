<script>
  /* eslint-disable */

  import Chart from "chart.js";
  import { generateChart } from "vue-chartjs";

  Chart.defaults.lineWithShadow = Chart.defaults.line;
  Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
    draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);
      var ctx = this.chart.ctx;
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;
      ctx.responsive = true;
      ctx.stroke();
      Chart.controllers.line.prototype.draw.apply(this, arguments);
      ctx.restore();
    }
  });

  const AreaShadow = generateChart("area-with-shadow", "lineWithShadow");

  export const chartTooltip = {
    backgroundColor: 'white',
    titleFontColor: '#333',
    borderColor: 'white',
    borderWidth: 0.5,
    bodyFontColor: '#333',
    bodySpacing: 10,
    xPadding: 10,
    yPadding: 10,
    cornerRadius: 0.15
  };

  const areaChartOptions = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.05)",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            padding: 24
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  export default {
    extends: AreaShadow,
    props: ["data"],
    data() {
      return {
        options: areaChartOptions
      };
    },
    mounted() {
      this.renderChart(this.data, this.options);
    }
  };
</script>
