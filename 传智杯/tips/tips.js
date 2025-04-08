// 柱状图
$(document).ready(function () {
    var data = {
      table: 'datatable'
    };
    var chart = {
      type: 'column',
      // colors: ['#FF0000']
    };
    var title = {
      text: '出行方式碳排放排行榜',
    };
    var yAxis = {
      allowDecimals: false,
      title: {
        text: '碳排放占比 (%)'
      }
    };
    var tooltip = {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          this.point.y + '%';
      }
    };
    var credits = {
      enabled: false // 隐藏脚注
    };

    var json = {};
    json.chart = chart;
    json.title = title;
    json.data = data;
    json.yAxis = yAxis;
    json.credits = credits;
    json.tooltip = tooltip;
    $('#container').highcharts(json);
  });
