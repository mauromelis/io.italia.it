var TRX_THRESHOLDS = [10, 50]; // map one for each period
var CASHBACK_PERIOD_CUR = 2;

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open(
      "GET",
      "https://pdnd-prod-dl-1-public-data.s3.eu-central-1.amazonaws.com/dashboard/pagopa/dashboard-io.json",
      true
    ); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  //function init() {
  loadJSON(function (response) {
    // Parse JSON string into object
    var dashboardData = JSON.parse(response);

    var totalPred = document.getElementById("totalPred") ? document.getElementById("totalPred").getContext("2d") : undefined;
    var downloads = generateDownloads(dashboardData.downloads);
    var predChart = totalPred ? new Chart(totalPred, {
      type: "line",
      data: downloads,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Numero donwloads ",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
              type: 'time',
              time: {
                stepSize: 7,
              }
            },      
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: tooltipTitleCallbackXDate,
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    var dataForEdcPie = generatePieOS(dashboardData.downloadsByOs);
    var top10PEdcPieElem = document.getElementById("top10EdcPie") ? document.getElementById("top10EdcPie").getContext("2d") : undefined;
    var top10PEdcPie = top10PEdcPieElem ? new Chart(top10PEdcPieElem, {
      type: "pie",
      data: dataForEdcPie,
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels : {
            boxWidth: 8,
            usePointStyle: true,
            fontFamily: "'Titillium Web', Arial",

          }
        },
        tooltips: {
          callbacks: {
            label: tooltipLabelCallbackArcNumber
          }
        }
      },
    }) : undefined;

    var idps = document.getElementById("idps") ? document.getElementById("idps").getContext("2d") : undefined;
    var idpsData = generateIdps(dashboardData.idps.slice(65,dashboardData.idps.length));
    var idpsChart = idps ? new Chart(idps, {
      type: "bar",
      data: idpsData,
      borderWidth: 0,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 0,
          },
        },
        responsive: true,
        title: {
          display: false,
          text: "Login ",
        },
        legend: {
          position: 'bottom',
          labels : {
            boxWidth: 8,
            usePointStyle: true,
            fontFamily: "'Titillium Web', Arial",

          }
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
              type: 'time',
              time: {
                stepSize: 7,
              }
            },      
          ],
          yAxes: [		
            {
              stacked: true,
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: tooltipTitleCallbackXDate,
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    var cieVsIdps = document.getElementById("cieidps") ? document.getElementById("cieidps").getContext("2d") : undefined;
    var cieIdpsData = generateCieIdps(dashboardData.idps.slice(65,dashboardData.idps.length ));
    var cieIdpsChart = cieVsIdps ? new Chart(cieVsIdps, {
      type: "bar",
      data: cieIdpsData,
      borderWidth: 0,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 0,
          },
        },
        responsive: true,
        title: {
          display: false,
          text: "Login ",
        },
        legend: {
          position: 'bottom',
          labels : {
            boxWidth: 8,
            usePointStyle: true,
            fontFamily: "'Titillium Web', Arial",

          }
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
              type: 'time',
              time: {
                stepSize: 7,
              }
            },      
          ],
          yAxes: [		
            {
              stacked: true,
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: tooltipTitleCallbackXDate,
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    var bonusLine = document.getElementById("bonusLine") ? document.getElementById("bonusLine").getContext("2d") : undefined;
    var bonus = generateBonus(dashboardData.bonusActivation);
    var predChart = bonusLine ? new Chart(bonusLine, {
      type: "line",
      data: bonus,
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        legend: {
          display: false,
        },
        responsive: true,
        title: {
          display: false,
          text: "Bonus Vacanze ",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
              type: 'time',
              time: {
                stepSize: 7,
              }
            },      
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            title: tooltipTitleCallbackXDate,
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    $("#downloads").text( TOTAL.toLocaleString("it"));
    $("#bonusTotal").text( dashboardData.generatedBonusCount.toLocaleString("it"));
    $("#bonusAmount").text( dashboardData.generatedBonusAmount.toLocaleString("it") + " €");
    $("#numbonusredeem").text( dashboardData.redeemedBonusCount.toLocaleString("it"));
    $("#today").text( moment().format("DD/MM/YYYY") );
    
    // Bonus cashback 

    $("#cashbackActiveTotal").text((dashboardData.tot_aderenti + dashboardData.tot_aderenti_june).toLocaleString("it"));
    $("#carteOnboardTotal").text((dashboardData.tot_carteOnboard + dashboardData.tot_carteOnboard_june).toLocaleString("it"));
    $("#trxTotal").text((dashboardData.tot_trx_per_day + dashboardData.tot_trx_per_day_june).toLocaleString("it"));

    var aderentiSpec = {
      "$schema": "https://vega.github.io/schema/vega/v5.json",
      "description": "A basic grouped bar chart example.",
      "width": 300,
      "height": 360,
      "padding": 5,
      "data": [
        {"name": "source_1", "url": "https://pdnd-prod-dl-1-public-data.s3.eu-central-1.amazonaws.com/dashboard/pagopa/dashboard-io.json?", "format": {"property": "aderenti_june", "type": "json"}},
        {
          "name": "table",
          "url": "https://pdnd-prod-dl-1-public-data.s3.eu-central-1.amazonaws.com/dashboard/pagopa/dashboard-io.json",
          "format": {"property": "carteOnboard_june", "type": "json", "parse": {"day": "date"}},
          "transform": [{"type": "lookup", "from": "source_1", "key": "day", "fields": ["day"], "values": ["total"], "as": ["carte"]}, {"type": "fold", "fields": ["tot", "carte"], "as": ["key", "value"]}]
        }
      ],
      "scales": [
        {"name": "xscale", "type": "band", "domain": {"data": "table", "field": "day", "sort": true}, "range": "width", "paddingOuter": 0, "paddingInner": 0.2},
        {"name": "xscaletime", "type": "time", "domain": {"data": "table", "field": "day"}, "range": "width", "padding": {"signal": "band / 2"}},
        {"name": "yscale", "type": "linear", "domain": {"data": "table", "field": "value"}, "range": "height", "round": true, "zero": true, "nice": true},
        {"name": "color", "type": "ordinal", "domain": {"data": "table", "field": "key"}, "range": ["#15c5f8", "rgb(0, 115, 230)"]}
      ],
      "axes": [{"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1}, {"orient": "bottom", "scale": "xscaletime"}],
      "signals": [
        {"name": "width", "init": "isFinite(containerSize()[0]) ? containerSize()[0] : 200", "on": [{"update": "isFinite(containerSize()[0]) ? containerSize()[0] : 200", "events": "window:resize"}]},
        {"name": "band", "update": "bandwidth('xscale')"}
      ],
      "marks": [
        {
          "type": "group",
          "from": {"facet": {"data": "table", "name": "facet", "groupby": "day"}},
          "encode": {"enter": {"x": {"scale": "xscale", "field": "day"}}},
          "signals": [{"name": "width", "update": "bandwidth('xscale')"}],
          "scales": [{"name": "pos", "type": "band", "range": "width", "domain": {"data": "facet", "field": "key"}}],
          "marks": [
            {
              "name": "bars",
              "from": {"data": "facet"},
              "type": "rect",
              "encode": {
                "enter": {
                  "x": {"scale": "pos", "field": "key"},
                  "width": {"scale": "pos", "band": 1},
                  "y": {"scale": "yscale", "field": "value"},
                  "y2": {"scale": "yscale", "value": 0},
                  "fill": {"scale": "color", "field": "key"}
                }
              }
            }
          ]
        }
      ],
      "legends": [{"orient": "bottom", "fill": "color", "direction": "horizontal", "symbolType": "square", "title": "key"}]
    };
    vegaEmbed('#aderentiChart', aderentiSpec);

    var trxLine = document.getElementById("trxLine") ? document.getElementById("trxLine").getContext("2d") : undefined;
    var trxChart = trxLine ? new Chart(trxLine, {
      type: "line",
      options: {
        elements: {
          line: {
            tension: 0
          },
        },
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Transazioni ",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
              type: 'time',
              time: {
                stepSize: 7,
                unit: 'day'
              }
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: tooltipTitleCallbackXDate,
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    var userTrxThresholdCtx = document.getElementById("userTrxThreshold") ? document.getElementById("userTrxThreshold").getContext("2d") : undefined;
    var userTrxThresholdChart = userTrxThresholdCtx ? new Chart(userTrxThresholdCtx, {
      type: "pie",
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 8,
            usePointStyle: true,
            fontFamily: "'Titillium Web', Arial",
            fontColor: "#fff",
          },
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,

          callbacks: {
            label: tooltipLabelCallbackArcNumber
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false
        }
      },
    }) : undefined;

    var trxAmountCtx = document.getElementById("trxAmountChart") ? document.getElementById("trxAmountChart").getContext("2d") : undefined;
    var trxAmountChart = trxAmountCtx ? new Chart(trxAmountCtx, {
      type: "bar",
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Utenti per importo transazione",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    var userTrxCtx = document.getElementById("userTrxChart") ? document.getElementById("userTrxChart").getContext("2d") : undefined;
    var userTrxChart = userTrxCtx ? new Chart(userTrxCtx, {
      type: "bar",
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Utenti cashback ",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 15,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
              },
            },
          ],
          yAxes: [
            {
              // type: 'logarithmic',
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                fontSize: 12,
                fontColor: "#5C6F82",
                fontFamily: "'Titillium Web', Arial",
                maxTicksLimit: 5,
                callback: formatNumberSuffix
              },
            },
          ],
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: tooltipLabelCallbackYNumber
          }
        }
      },
    }) : undefined;

    // Cashback periods
    var cardsDataMap = { // map element ids to dashboard data
      "#tot_carteOnboard": [dashboardData.tot_carteOnboard, dashboardData.tot_carteOnboard_june],
      "#tot_trx_per_day": [dashboardData.tot_trx_per_day, dashboardData.tot_trx_per_day_june],
      "#trx_1": [dashboardData.trx_1 + dashboardData.trx_10, dashboardData.trx_1_june + dashboardData.trx_10_june],
    };
    var chartDataMap = [ // map chart and generator to dashboard data
      [userTrxThresholdChart, generateUserTrxThreshold, [
        [dashboardData.trx_1, dashboardData.trx_10, TRX_THRESHOLDS[0]],
        [dashboardData.trx_1_june, dashboardData.trx_10_june, TRX_THRESHOLDS[1]]
      ]],
      [trxChart, generateTrxDay, [[dashboardData.trx_per_day], [dashboardData.trx_per_day_june]]],
      [trxAmountChart, generateTrxAmount, [[dashboardData.all_range], [dashboardData.all_range_june]]],
      [userTrxChart, generateUserTrx, [
        [dashboardData.user_by_trx_bin, TRX_THRESHOLDS[0]],
        [dashboardData.user_by_trx_bin_june, TRX_THRESHOLDS[1]]]
      ],
    ];

    function changeCashbackPeriod(period) {
      var periodIndex = period - 1;

      // Update tabs
      $('#cashbackPeriodTabs').find('.nav-link').each(function(i, el) {
        $(el).toggleClass('active', i === periodIndex);
      });

      // Update cards
      Object.keys(cardsDataMap).forEach(function(id) {
        var periods = cardsDataMap[id];
        var data = periods[periodIndex];
        if (data != null) $(id).text(data.toLocaleString("it"));
      });

      // Update charts
      chartDataMap.forEach(function(item) {
        var chart = item[0];
        var generator = item[1];
        var periods = item[2];
        var dataArgs = periods[periodIndex];
        if (dataArgs != null) {
          var newData = generator.apply(null, dataArgs);

          // Update chart datasets (replace whole data to "restart" chart)
          // REF: https://www.chartjs.org/docs/latest/developers/updates.html
          // chart.data.labels = newData.labels;
          // chart.data.datasets.forEach((dataset, i) => {
          //   dataset.data = newData.datasets[i].data
          // });
          chart.data = newData; // TODO: remove restart and fix bar overlap on transaction
          chart.update();
        }
      })
    }

    // Set initial period
    changeCashbackPeriod(CASHBACK_PERIOD_CUR);

    $('#cashbackPeriod1').click(function () { changeCashbackPeriod(1) });
    $('#cashbackPeriod2').click(function () { changeCashbackPeriod(2) });
  });
