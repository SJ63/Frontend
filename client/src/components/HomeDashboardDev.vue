
<template>
    <div class="container-fluid">
		<div class="row ">
			<div class="col-2">
				<h3>Biz</h3>
				<div >
					<select class="form-select" aria-label="Default select example" v-model="selected_biz">
						<option selected class="text-dark">All</option>
						<option v-for="(value, name) in biz_and_process" :key="name" class="text-dark" :value="name">
							{{ name }}
						</option>
					</select>
                </div>
			</div>
			<div class="col-2">
				<h3>Process</h3>
				<div >
					<select class="form-select" aria-label="Default select example" v-model="selected_process">
						<option selected class="text-dark">All</option>
						<option v-for="item in process" :key="item" class="text-dark" :value="item">
							{{ item }}
						</option>
					</select>
                </div>
			</div>
			<!-- <div class="col-2 align-self-end offset-md-4">
				{{ ot }}
				<div>Near over OT</div>
			</div> -->
		</div>
		<div class="row">
			<div class="col">
				<!-- Require support ( Shift ) -->
				<apexchart
                    type="bar"
                    height="350"
					width="700"
                    :options="require_support_option"
                    :series="require_support"
					class=""
					ref="chart1"
                >
                </apexchart>
			</div>
			<div class="col">
				
				<apexchart
                    type="bar"
                    height="350"
					width="500"
                    :options="employee_skill_option"
                    :series="employee_skill"
					class=""
					ref="chart2"
                >
                </apexchart>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h4>Headcount</h4>
				{{ headcount_total }}
				<apexchart
					width="500" type="donut" :options="headcount_separated_option" :series="headcount_separated" class=""
				>
				</apexchart>
			</div>
			<div class="col">
				<h4>Clean room ( Realtime )</h4>
				{{ in_company }}
				<apexchart
					height="70" width="500" type="bar" :options="cleanroom_option" :series="cleanroom_inroom" class=""
				>
				</apexchart>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";

export default {
	name: "HomedashoboardDev",
	data ()  {
		return{
		departments: [],
		req1: [],
		selected_biz: "All",
		selected_process: "All",
		process: [],
		biz_and_process: {
			IS: ["ASSY","MOKU", "CSAT", "JUNB"],
			IS_BMS: ["ASSY","BMS", "MOKU", "BURN", "CSAT3", "JUNB"],
			HTPS: ["PCLN","PA", "JIK", "MPK"],
			MOLED: ["PA","KEN", "PK"],
			SMOLED: ["PCL", "PA", "ELU1", "AG", "HTH", "TKA", "EGC", "LBL", "KOC", "KSP", "KDU", "INF", "PF", "ELU2", "FC", "PK"],
		},
		require_support: [
            {
				name: 'In Company',
				data: []
			},
			{
				name: 'Need Allocation',
				data: []
			}
		],
		require_support_option:null,
		employee_skill: [
            // {
			// 	name: 'Materoal',
			// 	data: [10, 8, 4]
			// },
			// {
			// 	name: 'All',
			// 	data: [1, 0, 0]
			// },
			// {
			// 	name: 'M/C S1',
			// 	data: [0, 2, 0]
			// },
			// {
			// 	name: 'No skill',
			// 	data: [1, 0, 0]
			// }
		],
		employee_skill_option: {
			colors : ['#3D84A8', '#48466D', '#3CB7B9', '#7AB09F'],
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
		headcount_total: '',
		headcount_separated: [],
		headcount_separated_option: {
			colors : ['#5598FE', '#C6831E','#9932CC','#BB3939'],
			chart: {
				type: 'donut',
				foreColor: '#ffffff',
				events: {
					click: function(event, chartContext, config) {
						console.log(config.dataPointIndex);
					}
				}
			},
			labels: ['Inside Cleanroom', 'Not in cleanroom','Go Home','Absent'],
		},
		in_company: '',
		cleanroom: [17,6],
		cleanroom_inroom:[{
			name: "Inside CleanRoom",
			data: []
		}],
		cleanroom_option: {
			chart: {
				height: 70,
				type: "bar",
				stacked: true,
				sparkline: {
					enabled: true
				},
				foreColor: '#ffffff'
			},
			plotOptions: {
				bar: {
					horizontal: true,
					barHeight: "20%",
					colors: {
						backgroundBarColors: ["#40475D"]
					}
				}
			},
			stroke: {
				width: 0
			},
			title: {
				floating: true,
				offsetX: -10,
				offsetY: 5,
				text: "Inside CleanRoom"
			},
			subtitle: {
				floating: true,
				align: "right",
				offsetY: 0,
				style: {
				fontSize: "20px"
				}
			},
			tooltip: {
				enabled: false
			},
			xaxis: {
				categories: ["Process 1"]
			},
			yaxis: {
				max: 100
			},
			fill: {
				opacity: 1
			}
		},
		ot:3

	}},
	watch: {
		selected_biz: function () {
			const selected = this.selected_biz
			console.log(this.biz_and_process[`${selected}`]);
			this.process = this.biz_and_process[`${selected}`]
		}
	},created(){
		this.man_power_plan();
	},
	methods: {
		async man_power_plan() {
			try{
				const Head_count = await axios.get("https://localhost:5001/CombinedData");
				this.respond1 = Head_count.data;
				console.log(this.respond1);
				this.Head_CO(this.respond1);
				this.categorizeEmployees(this.respond1)
				
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		},
		Head_CO(apidata){
			this.headcount_total = apidata.length;
			console.log(this.headcount_total);
			let InsideCleanroomCount = 0;
			let NotInCleanroomCount = 0;
			let GoHomeCount = 0;
			let AbsentCount = 0;

			for(const DATA of apidata){
				// ตรวจสอบ FaceScanLog และ Gatelog ว่าเป็น null หรือไม่
				if (!DATA.faceScanLog && !DATA.gateLog) {
					AbsentCount++;
				} else {
					// ตรวจสอบ GateLog ว่าเข้าหรือออก
					if (DATA.gateLog) {
						if (DATA.gateLog.status === 'IN') {
							InsideCleanroomCount++;
						} else if (DATA.gateLog.status === 'OUT') {
							// ตรวจสอบ FaceScanLog ว่าเข้าหรือออก
							if (DATA.faceScanLog && DATA.faceScanLog.status === 'IN') {
								NotInCleanroomCount++;
							} else {
								GoHomeCount++;
							}
						}
					}
				}
			}

			this.cleanroom_inroom[0].data.push(InsideCleanroomCount);
			
			this.in_company = InsideCleanroomCount;
			
			this.headcount_separated = [InsideCleanroomCount, NotInCleanroomCount, GoHomeCount, AbsentCount];
		},
		categorizeEmployees(apidata) {
				for (const DATA of apidata) {
					let process = DATA.employeeInfo.process;
					if (!this.departments[process]) {
						this.$set(this.departments, process, {
							IN_COMPANY: [],
							NEED_ALLOWCATE: []
						});
					}

					// ตรวจสอบ faceScanLog และ gateLog เพื่อกำหนดสถานะของพนักงาน
					let attendanceStatus = '';
					if (DATA.faceScanLog && DATA.gateLog) {
						// ถ้ามี faceScanLog และ gateLog คือ IN_COMPANY
						attendanceStatus = 'IN_COMPANY';
					} else {
						// ถ้าไม่มี faceScanLog และ gateLog คือ NEED_ALLOWCATE
						attendanceStatus = 'NEED_ALLOWCATE';
					}

					let employeeInfo = {
						empID: DATA.employeeInfo.empID,
						firstName: DATA.employeeInfo.firstName,
						lastName: DATA.employeeInfo.lastName
					};

					this.departments[process][attendanceStatus].push(employeeInfo);
				}
				this.require_support_option= {
					colors : ['#5598FE', '#BB3939'],
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
						categories: this.req1,
					},
					tooltip : {
						enabled : true,
						theme: 'dark'
					},
					legend : {
						position: 'right'
					}
				};

			

				for (const departmentName in this.departments) {
					this.req1.push(departmentName);
					this.require_support[0].data.push(this.departments[departmentName].IN_COMPANY.length);
					this.require_support[1].data.push(this.departments[departmentName].NEED_ALLOWCATE.length);
				}
			

			
			
			
    },
		
	
	},

}
</script>
