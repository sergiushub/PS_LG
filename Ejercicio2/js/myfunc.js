$(document).ready(function() {
    
    var datasource1 = $.ajax({
        type: "GET",
        url: "http://s3.amazonaws.com/logtrust-static/test/test/data1.json",
        success: function(data) {
            console.log("SUCCESS: Data source 1 retrieved.")            
        }
    });
   
    var datasource2 = $.ajax({
        type: "GET",
        url: "http://s3.amazonaws.com/logtrust-static/test/test/data2.json",
        success: function(data) {
            console.log("SUCCESS: Data source 2 retrieved.")            
        }
    });

    var datasource3 = $.ajax({
        type: "GET",
        url: "http://s3.amazonaws.com/logtrust-static/test/test/data3.json",
        success: function(data) {
            console.log("SUCCESS: Data source 3 retrieved.")            
        }
    });


    $.when(datasource1, datasource2, datasource3).done(function(dataretrieved1, dataretrieved2, dataretrieved3) {
    
        var dataprocessed = new Array();
            
        //Process the data form the first source
        for(i=0;i<dataretrieved1[0].length;i++) {
            var cat = dataretrieved1[0][i].cat.toUpperCase();
            var time = dataretrieved1[0][i].d;
            var val = dataretrieved1[0][i].value;

            //Store the transformed data
            dataprocessed.push({cat:cat,time:time,val:val});
        }

        //Process the data from the second source
        for(i=0;i<dataretrieved2[0].length;i++) {

            //Transform data
            var date = new Date(dataretrieved2[0][i].myDate);

            var cat = dataretrieved2[0][i].categ.toUpperCase();
            var time = date.getTime();
            var val = dataretrieved2[0][i].val;


            //Store the transformed data
            dataprocessed.push({cat:cat,time:time,val:val});
        }

        //Process the data from the third source
        for(i=0;i<dataretrieved3[0].length;i++) {

            //Transform data
            var raw = dataretrieved3[0][i].raw;
            
            var rawdate = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
            var date = new Date(rawdate[0]);

            var rawcat = raw.match(/#(.*)#/);

            var cat = rawcat[1].toUpperCase();
            var time = date.getTime();
            var val = dataretrieved3[0][i].val;

             //Store the transformed data
            dataprocessed.push({cat:cat,time:time,val:val});
        }

        //Storage of data in Map
        var datamap = new Map();
        var datapiechart = new Map();
        var totalvalue = 0;
        for (var i=0; i<dataprocessed.length; i++) {

            var item = dataprocessed[i];

            //Map for line chart
            if (datamap.has(item.cat)) {
                datamapaux = datamap.get(item.cat);
                if (datamapaux.has(item.time)) {
                    oldval = datamapaux.get(item.time);
                    datamapaux.set(item.time,oldval + item.val);
                } else {
                    datamapaux.set(item.time,item.val);
                }
            } else {
                var newpair = new Map();
                newpair.set(item.time,item.val);
                datamap.set(item.cat,newpair);
            }

            //Map for pie chart
            if (datapiechart.has(item.cat)) {
                var oldval = datapiechart.get(item.cat);
                datapiechart.set(item.cat,(oldval+item.val));
            } else {
                datapiechart.set(item.cat,val);
            }

            //Sum of total value
            totalvalue+=item.val;
        }

        // LINE CHART
        //Definition of highchart options for line chart
        var optionslines = {
          title: {
            text: 'Line chart'
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value:%Y-%b-%e}'
            },
          },
          series: []
        };

        //Setting series names and values for line chart
        var n=0;
        for(var [key,value] of datamap){

            var datarray = new Array();
            for (var [time,val] of value){
                datarray.push([time,val]);
            }

            datarray = datarray.sort(function(a,b){
                return a[0] - b[0];
            });

            optionslines.series.push({name:key,data:datarray});
        }

        Highcharts.chart('container-lines', optionslines);


        // PIE CHART
        //Definition of highchart options for pie chart
        var optionspie = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Pie chart'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: []
        }

        //Setting series names and values for pie chart
        var datarray = new Array();
        for(var [key,value] of datapiechart){

            datarray.push({name:key,y:value/totalvalue});
        }
        optionspie.series.push({name:'Category',colorByPoint: true, data:datarray});
        

        Highcharts.chart('container-pie', optionspie);
    });
});