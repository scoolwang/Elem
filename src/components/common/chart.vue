<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: {
      chartdata: {
        type: Object,
        default: null
      },
      options: {
        responsive: false,
        spanGaps: false,
        showLine: false,
        title: {
          display: false
        },
        display: false
      }
    },
    mounted () {
      this.renderChart(this.chartdata, this.options)
    }
  }
</script>
