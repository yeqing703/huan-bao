//   饼状图
var myChart = echarts.init(document.getElementById('main'));
                var option = {
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} :{d}%'
                  },
                  legend: {
                    top: '5%',
                    left: 'center'
                  },
                  series: [
                    {
                      name: '出行方式',
                      type: 'pie',
                      radius: ['30%', '70%'],
                      avoidLabelOverlap: false,
                      itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                      },
                      label: {
                        show: false,
                        position: 'center',
                        formatter: '{b}\n{d}%'
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: 20,
                          fontWeight: 'bold'
                        }
                      },
                      labelLine: {
                        show: false
                      },
                      data: [
                        { value: 35, name: '步行' },
                        { value: 15, name: '自行车/电动自行车' },
                        { value: 30, name: '公共交通' },
                        { value: 20, name: '新能源汽车' },
                      ]
                    }
                  ]
                };
                myChart.setOption(option);