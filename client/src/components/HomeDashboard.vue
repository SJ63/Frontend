<style>
* {
    color: white;
	padding: 0;
	margin: 0;
}

/* .btn1 {
	background-color: #9a908c !important;
	border-color: #FF8D5C !important;
	width: 100%;
	text-align: left !important;
} */

.apexcharts-tooltip {
    background: #df6363 !important;
}


.col {
    flex: 1; /* ให้คอลัมน์แต่ละคอลัมน์มีพื้นที่เท่ากัน */
}

.circle { 
	background: 
    linear-gradient(#151F2F 0 0) padding-box, /*this is your grey background*/
    linear-gradient(to bottom, #FF8D5C, #3AA0FF) border-box;
	color: #FF8D5C;
	font-size: 35px;
	padding: 10px;
	border: 7px solid transparent;
	border-radius: 50%;
	display: inline-block;
	height:100px;
    width:100px;
	display: flex;
	align-items: center; 
	justify-content: center;
	margin-left: 60px;
}
</style>
<script>
import axios from "axios";

export default {
    name: "HomeDashboard",
    data: () => ({
        serise1: [
            {
				name: 'Actual',
				data: [9, 2, 6]
			},
			{
				name: 'Need Allocation',
				data: [1, 0, 0]
			}
		],
		serise2: [
            {
				name: 'M/C S1',
				data: [6, 1, 3]
			},
			{
				name: 'Material',
				data: [1, 1, 2]
			},
			{
				name: 'All',
				data: [2, 0, 1]
			},
			{
				name: 'No skill',
				data: [1, 0, 0]
			}
			],
        chartOptions1: {
			colors : ['#3AA0FF', '#FF8D5C', '#f76363'],
			title: {
				text: 'Require Support'
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
			xaxis: {
				type: 'category',
				categories: ['ASSY', 'MOKU', 'JUNB'],
			},
			tooltip : {
				enabled : true,
				theme: 'dark'
			},
			legend : {
				position: 'right'
			}
		},
		chartOptions2: {
			colors : ['#3AA0FF', '#edde5f', '#4dc496', '#f76363'],
			title: {
				text: 'Employee skill'
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
			xaxis: {
				type: 'category',
				categories: ['ASSY', 'MOKU', 'JUNB'],
			},
			tooltip : {
				enabled : true,
				theme: 'dark'
			},
			legend : {
				position: 'right'
			}
		},
		series3: [6,4,8],
		chartOptions3: {
			colors : ['#3AA0FF', '#f76363','#edde5f'],
			chart: {
				type: 'donut',
				foreColor: '#ffffff'
			},
			labels: ['Inside Cleanroom', 'Absent','Actual'],
			legend: {
				formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
			}
		},
		series4: [38],
		chartOptions4: {
			colors : ['#3AA0FF'],
			chart: {
				type: 'donut',
				foreColor: '#ffffff'
			},
			labels: ['IN'],
			plotOptions: {
				radialBar: {
					track: {
						background: '#ffffff'
					},
					hollow: {
						size: '70%',
					},
					dataLabels : {
						show: true,
						value: {
							show: true,
							formatter: function (val) {
								return (val/100)*16
							}
						}
					}
				},
			}
		},
		series5: [16, 4],
		chartOptions5: {
			colors : ['#3AA0FF', '#f76363'],
			chart: {
				type: 'donut',
				foreColor: '#ffffff'
			},
			labels: ['Actual', 'Absent']
		},
		series6: [50],
		chartOptions6: {
			colors : ['#edde5f'],
			chart: {
				type: 'donut',
				foreColor: '#ffffff'
			},
			labels: ['OFF'],
			plotOptions: {
				radialBar: {
					track: {
						background: '#ffffff'
					},
					hollow: {
						size: '70%',
					},
					dataLabels : {
						show: true,
						value: {
							show: true,
							formatter: function (val) {
								return (val/100)*16
							}
						}
					}
				},
			}
		},
		
        InRoom: [],
		SelectedProcess: "All",
		list: [],
		list2: []
    }),
	watch: {
		SelectedProcess: function() {
			console.log(this.SelectedProcess);
			this.list = JSON.parse(JSON.stringify(this.serise1))
			this.list2 = JSON.parse(JSON.stringify(this.serise2))
			switch (this.SelectedProcess) {
				case 'ASSY':
					for (let i = 0; i < this.list.length; i++) {
						for (let j = 0; j < this.list[0].data.length; j++) {
							if (j > 0) {
								this.list[i].data[j] = 0
							}
						}
					}

					for (let i = 0; i < this.list2.length; i++) {
						for (let j = 0; j < this.list2[0].data.length; j++) {
							if (j > 0) {
								this.list2[i].data[j] = 0
							}
						}
					}
					console.log(this.list[0].data[0]);
					console.log(this.serise1[0].data[0]);
					this.$refs.chart1.updateSeries(this.list);
					this.$refs.chart2.updateSeries(this.list2);
					break;

				case 'MOKU':
					for (let i = 0; i < this.list.length; i++) {
						for (let j = 0; j < this.list[0].data.length; j++) {
							if (j != 1) {
								this.list[i].data[j] = 0
							}
						}
					}

					for (let i = 0; i < this.list2.length; i++) {
						for (let j = 0; j < this.list2[0].data.length; j++) {
							if (j != 1) {
								this.list2[i].data[j] = 0
							}
						}
					}
					console.log(this.list[0].data[0]);
					console.log(this.serise1[0].data[0]);
					this.$refs.chart1.updateSeries(this.list);
					this.$refs.chart2.updateSeries(this.list2);
					break;

				case 'JUNB':
					for (let i = 0; i < this.list.length; i++) {
						for (let j = 0; j < this.list[0].data.length; j++) {
							if (j != 2) {
								this.list[i].data[j] = 0
							}
						}
					}

					for (let i = 0; i < this.list2.length; i++) {
						for (let j = 0; j < this.list2[0].data.length; j++) {
							if (j != 2) {
								this.list2[i].data[j] = 0
							}
						}
					}
					console.log(this.list[0].data[0]);
					console.log(this.serise1[0].data[0]);
					this.$refs.chart1.updateSeries(this.list);
					this.$refs.chart2.updateSeries(this.list2);
					break;

				default:
					// this.list = this.serise1.slice(0)
					this.$refs.chart1.updateSeries(this.serise1);
					this.$refs.chart2.updateSeries(this.serise2);
					// console.log(this.serise1);
					break;
			}
		}
	},
    created() {
        // this.GateLog()
		this.list = JSON.parse(JSON.stringify(this.serise1))
		
    },
    methods: {
        async GateLog() {
            await axios
                .get("https://localhost:5001/GateLog")
                .catch((err) => {
                    console.log(err);
                })
                .then((response) => {
                    console.log(response.data);

                    let count = [0, 0];
                    response.data.map((val) => {
                        if (val.status === "IN") {
                            count[0]++;
                        } else if (val.status === "OUT") {
                            count[1]++;
                            count[0]--;
                        }
                    });

                    this.InRoom = response.data;

                    console.log("count: " + count);

                    this.serise1 = count;
                });
            console.log("New: " + this.serise1);
        },
    },
};
</script>
<template>
    <div>
        <div class="mt-4 ms-5">
            <div class="row g-0">
                <div class="col-2">Biz</div>
                <div class="col-2 ms-3">Process</div>
            </div>
            <div class="row g-0">
                <div class="col-2">
					<select class="form-select" aria-label="Default select example" v-model="SelectedBiz">
						<option selected class="text-dark">Select Biz</option>
						<option value="IS" class="text-dark">IS</option>
						<option value="AB" class="text-dark">AB</option>
						<option value="CD" class="text-dark">CD</option>
					</select>
                </div>
                <div class="col-2 ms-3">
					<select class="form-select" aria-label="Default select example" v-model="SelectedProcess">
						<option selected class="text-dark">All</option>
						<option value="ASSY" class="text-dark">ASSY</option>
						<option value="MOKU" class="text-dark">MOKU</option>
						<option value="JUNB" class="text-dark">JUNB</option>
					</select>
                </div>
            </div>
        </div>
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
				<h4 class="ms-5 mt-4">Headcount</h4>
				<apexchart
					width="500" type="donut" :options="chartOptions3" :series="series3" class="ms-5"
				>
				</apexchart>
			</div>
				<div class="col">
					<h4>Clean room</h4>
					<div class="chart-container">
						<apexchart width="300" type="radialBar" :options="chartOptions4" :series="series4" class="mt-4"></apexchart>
					</div>
				</div>
				<div class="col">
					<div class="chart-container">
						<apexchart width="300" type="radialBar" :options="chartOptions6" :series="series6" class="mt-4"></apexchart>
					</div>
				</div>
        </div>
    </div>
</template>

