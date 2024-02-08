<script>
import axios from "axios";
export default {
    name: "TrendEmp",
    data () {
        return{
        categories1: [],
        categories2: [],
        categories3: [],
        categories4: [],
        selectedDivision: '', // สำหรับเก็บค่า division ที่ถูกเลือก
        divisions: [], // สำหรับเก็บรายการ division ทั้งหมด
        filteredData: [], // สำหรับเก็บข้อมูลที่ถูกกรอง
        serise1: [
            {
                name: 'New COMER',
                data: []
            }, 
            {
                name: 'Resign',
                data: []
            }
        ],
		serise2: [
            {
				name: 'Employee',
				data: []
			},
			{
				name: 'Employee Required',
				data: []
			},
			],
        chartOptions1: null,
		chartOptions2: null,
		series3: [],
		chartOptions3: null,
		series4: [],
		chartOptions4: null,
		
        InRoom: [],
		SelectedProcess: "All",
		list: [],
		list2: [],
    }
}, 
    created(){
            this.fetchData();
},
methods: {
    async fetchData() {
    try {
        const HEAD_tra = await axios.get("https://localhost:5001/HeadCountTransitionYearMonth"); 
        this.responseData1 = HEAD_tra.data;

        const HEAD_COM = await axios.get("https://localhost:5001/HeadCountTransitionCOUNT"); 
        this.responseData2 = HEAD_COM.data;
        
        const HEAD_DIV = await axios.get("https://localhost:5001/HeadCountbyDiv"); 
        this.responseData3 = HEAD_DIV.data;
        

        const HEAD_GROUP = await axios.get("https://localhost:5001/HeadCountbyWorkGroup"); 
        this.responseData4 = HEAD_GROUP.data;
        

        this.transformAndSetData(this.responseData1);
        this.requireDATA(this.responseData2);
        this.HEAD_DIV_(this.responseData3);
        this.HEAD_GRO(this.responseData4);
        
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
},

transformAndSetData(apiData) {
    const transformedData = this.transformData(apiData);
    // console.log(transformedData);

    for(const month in transformedData){
        this.categories1.push(month)
        this.serise1[0].data.push(transformedData[month].New);
        this.serise1[1].data.push(transformedData[month].Resign);
    }
    // console.log(this.serise1);
    
    this.setChartOptions();
},
transformData(apiData) {
    let currentYear = 2023; //new Date().getFullYear()
    let chartData = {};
    const months = Object.keys(apiData[currentYear]); //.slice(-5)

    months.forEach(month => {
        const monthData = apiData[currentYear][month];
        const newData = monthData.filter(item => item.transType === 'New').length;
        const resignData = monthData.filter(item => item.transType === 'Resign').length * -1;

        chartData[`${month.toUpperCase()}${currentYear}`] = {
            New: newData,
            Resign: resignData
        };
    });

    return chartData;

    // let currentYear = new Date().getFullYear(); 
    // let chartData = {};
    // const months = Object.keys(apiData[currentYear]);
    // let dataMonths = months.filter(month => Array.isArray(apiData[currentYear][month]) && apiData[currentYear][month].length > 0);
    // const latestMonthWithData = dataMonths[dataMonths.length - 1];
    
   
    // let monthsToDisplay = [latestMonthWithData]; 

    
    // for (let i = 0; i < 4; i++) {
    //     const index = dataMonths.indexOf(monthsToDisplay[0]) - 1;
    //     if (index >= 0) {
    //         monthsToDisplay.unshift(dataMonths[index]);
    //     } else {
    //         break; 
    //     }
    // }

    // monthsToDisplay.forEach(month => {
    //     const monthData = apiData[currentYear][month];
    //     const newData = monthData.filter(item => item.transType === 'New').length;
    //     const resignData = monthData.filter(item => item.transType === 'Resign').length * -1;

    //     chartData[`${month.toUpperCase()}${currentYear}`] = {
    //         New: newData,
    //         Resign: resignData
    //     };
    // });

    // return chartData;
},
requireDATA(apidata){
 for(let i = 0; i < apidata.length; i++){
    this.categories2.push(apidata[i].process);
    this.serise2[0].data.push(apidata[i].totalEmployees);
    this.serise2[1].data.push(apidata[i].require);
}

},
 HEAD_DIV_(apidata){
    
let divisionSet = new Set();

for (let i = 0; i < apidata.length; i++) {
    divisionSet.add(apidata[i].division);
    this.categories3.push(apidata[i].department)
    this.series3.push(apidata[i].hc)
}
console.log(this.categories3);
this.divisions = [...divisionSet];

console.log('divitions', this.divisions);

},
filterData() {
    // ตรวจสอบว่ามีการเลือก Division หรือไม่
    if (!this.selectedDivision) {
        // ถ้าไม่มีการเลือก Division ให้ใช้ข้อมูลทั้งหมดโดยไม่กรอง
        this.filteredData = this.responseData3;
    } else {
        // กรองข้อมูลโดยใช้ค่า selectedDivision
        this.filteredData = this.responseData3.filter(item => item.division === this.selectedDivision);
    }
    // สร้างชุดข้อมูลใหม่สำหรับ Pie Chart
    this.updateChart(this.filteredData);
},
updateChart(filteredData) {
    if (filteredData && filteredData.length > 0) {
        this.chartOptions3.labels = filteredData.map(item => item.department);
        this.series3 = filteredData.map(item => item.hc);
    } else {
        // กรณีไม่มีข้อมูลที่ถูกกรอง
        this.chartOptions3.labels = [];
        this.series3 = [];
    }
},
HEAD_GRO(apidata){
    for (let i = 0; i < apidata.length; i++) {

        this.categories4.push(apidata[i].group);
        this.series4.push(apidata[i].hc)
    
}
},
setChartOptions() {
    this.chartOptions1 = {
                        colors: ['#3AA0FF', '#FF8D5C'],
                        title: {
                            text: 'Headcount transition'
                        },
                        chart: {
                            stacked: true,
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: true
                            },
                            foreColor: '#ffffff'
                        },
                        plotOptions: {
                            bar: {
                                colors: {
                                    ranges: [{
                                        from: -100,
                                        to: -46,
                                        color: '#F15B46'
                                    }, {
                                        from: -45,
                                        to: 0,
                                        color: '#FF8D5C'
                                    }]
                                },
                                columnWidth: '80%',
                            }
                        },
                        xaxis: {
                            type: 'category',
                            categories: this.categories1,
                        },
                        tooltip : {
                            enabled : true,
                            theme: 'dark'
                        },
                        legend : {
                            position: 'right'
                        }
    };
    this.chartOptions2 = {
                    colors: ['#3AA0FF', '#edde5f'],
                    title: {
                        text: 'Comparison between Employee and Employee Required'
                    },
                    chart: {
                        type: 'bar',
                        width: '50%',
                        group: 'group1',
						foreColor: '#ffffff'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    stroke: {
                        show: false,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: this.categories2
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + " employees"
                            }
                        }
                    },
                    legend: {
                        position: 'right'
                    }
				};
        this.chartOptions3 = {
                    chart: {
                        type: 'donut',
                        foreColor: '#ffffff'
                    },
                    labels: this.categories3 || [], // ตรวจสอบว่ามีข้อมูลหรือไม่
                    legend: {
                        formatter: function(seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                        },
                    },
                    theme: {
                        palette: 'palette5'
                    }
                };
    this.chartOptions4= {
			chart: {
				type: 'donut',
				foreColor: '#ffffff'
			},
			labels: this.categories4,
			legend: {
				formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
			},
			theme: {
        palette: 'palette7' }
		};
},
    

}
	
};
</script>
<template>
	<div>
		<div class="row g-0">
            <div class="col">
                <apexchart
                    type="bar"
                    height="350"
					width="700"
                    :options="chartOptions1"
                    :series="serise1"
					class="ms-5 mt-5"
					ref="chart1"
                >
                </apexchart>
            </div>
            <div class="col">
				<apexchart
                    type="bar"
                    height="350"
					width="500"
                    :options="chartOptions2"
                    :series="serise2"
					class="mt-5"
					ref="chart2"
                >
                </apexchart>
			</div>
        </div>
		<div class="row g-0">
            <div class="col">
                <h4 class="ms-5 mt-4">Headcount by Div</h4>
                <select v-model="selectedDivision" @change="filterData" class="ms-5 text-dark">
                    <option value="" class="text-dark">-- Select Division --</option>
                    <option v-for="(item, index) in divisions" :key="index" class="text-dark" :value="item">{{ item }}</option>
                </select>
                <apexchart width="400" type="donut" :options="chartOptions3" :series="series3" class="ms-5">
                </apexchart>
            </div>
            <div class="col">

				<h4 class="ms-5 mt-4">Headcount by Group</h4>
				<apexchart
					width="400" type="donut" :options="chartOptions4" :series="series4" class="mt-4 "
				>
				</apexchart>
			</div>
        </div>
        
    </div>
</template>
