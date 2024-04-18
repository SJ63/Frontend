
<template>
    <div class="container-fluid">
		<!-- <div class="row ">
			<div class="col-md-2">
				<h3 class="text-white" >Biz</h3>
				<div>
					<select class="form-select" aria-label="Default select example" @change="change_biz($event)" v-model="selected_biz">
						<option selected class="text-dark" >All</option>
						<option v-for="(value, name) in biz_and_process" :key="name" class="text-dark" :value="name">
							{{ name }}
						</option>
					</select>
                </div>
			</div>
			<div class="col-md-2">
				<h3 class="text-white" >Process</h3>
				<div >
					<select class="form-select" aria-label="Default select example" @change="change_process($event)" v-model="selected_process">
						<option selected class="text-dark">All</option>
						<option v-for="item in process" :key="item" class="text-dark" :value="item">
							{{ item }}
						</option>
					</select>
                </div>
			</div>
            <div class="col-md-2">
				<h3 class="text-white" >Shift</h3>
				<div class="text-white">
					{{ shift }}
                </div>
			</div>
		</div> -->
        <div class="row">
            
			<div class="col-lg-6">
                <div class="box mt-4"  style="margin-right: 1rem;">
                    <h4 class="text-white">Headcount</h4>
                    <h3 class="text-white">{{ headcount_total }} </h3>
                    <apexchart
                    @click="focusChart" width="500" type="donut"  :options="headcount_separated_option" :series="headcount_separated" class="" 
                    >
                    </apexchart>
                </div>
			</div>
			<div class="col-lg-6">
				
				<div class="col-md-10">
                    <div class="box mt-4">
                        <router-link :to="{ path: '/EmpIncompany' }" class="progress-link">
                        <h4 class="text-white">IN COMPANY</h4>
                        </router-link>
                        <h3 class="text-white">{{ in_company }}</h3>
                        <div class="text-white"> In cleanroom : {{ in_cleanroom }} ( {{Math.ceil((in_cleanroom/in_company)*100)}}% )</div>
                        <router-link :to="{ path: '/EmpIncompany' }" class="progress-link">
                            <div class="mt-4">
                                <div class="progress">
                                    <div class="progress-bar progress1" role="progressbar" v-bind:style="{'width': (in_cleanroom/in_company)*100 + '%'}" 
                                        :aria-valuenow="in_cleanroom" :aria-valuemin="0" :aria-valuemax="in_company">
                                    </div>
                                </div>
                            </div>
                        </router-link>
                        <div class="text-white">Not In cleanroom : {{ not_in_cleanroom }} ( {{Math.ceil((not_in_cleanroom/in_company)*100)}} % )</div>
                            <router-link :to="{ path: '/EmpNotInCleanroom' }" class="progress-link">
                                <div class="mt-4">
                                    <div class="progress">
                                        <div class="progress-bar progress2" role="progressbar" v-bind:style="{'width': (not_in_cleanroom/in_company)*100 + '%'}" 
                                            :aria-valuenow="not_in_cleanroom" :aria-valuemin="0" :aria-valuemax="in_company">
                                        </div>
                                    </div>
                                </div>
                            </router-link>        
                    </div>
                </div>
				<div class="col-lg-8">
                    <div class="box mt-5">
                        <h4 class="text-white" >Shift : {{ shift }}</h4>
                        <h4 class="text-white">DAY : {{ currentDate }}</h4>
                    </div>
                </div>
			</div>
       
		</div>
        <div class="row justify-content-md-center">
            <div class="col-md-11" id="accordion">
                <h3 class="text-white" >Biz</h3>
                <div class="card " style="background-color:#262D47" v-for="(processes, biz) in biz_and_process" :key="biz">
                    <div class="card-header">
                        
                            <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse' + biz" aria-expanded="false" :aria-controls="'collapse' + biz" @click="change_biz($event)" :value="biz" style="padding: 0.5rem;">
                                {{ biz }}
                            </button>
                           
                    </div>
                    <div :id="'collapse' + biz" class="collapse" :class="{ 'show': activeBiz === biz }" aria-labelledby="'heading' + biz" data-parent="#accordion">
                        <div class="card-body">
                            <div class="row" id="chart">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <h2 class="text-white" >Process</h2>
                                            <div >
                                                <select class="form-select" aria-label="Default select example" @change="change_process($event)" v-model="selected_process">
                                                    <option selected class="text-dark">All</option>
                                                    <option v-for="item in process" :key="item" class="text-dark" :value="item">
                                                        {{ item }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="text-white">
                                                <h3 class="text-white" v-if="OT !== ''">OverTime</h3>
                                                <h5 v-if="OT !== ''">Near over OT : {{ OT }}</h5>
                                            </div>    
                                        </div>
                                    </div>
                                    <div class="scrollBox">
                                        <apexchart v-if="shift === 'Day'"
                                            type="bar"
                                            height='300'
                                            width='100%'
                                            :options="require_support_option"
                                            :series="require_support"
                                            class=""
                                            ref="chart1"
                                        ></apexchart>

                                        <apexchart v-if="shift === 'Night'"
                                            type="bar"
                                            height='300'
                                            width='100%'
                                            :options="require_support_option"
                                            :series="require_support_night"
                                            class=""
                                            ref="chart1"
                                        ></apexchart>
                                    </div>
                                </div> 
                            </div>
                            <div class="row">      
                                <div class="col">
                                    <div class="scrollBox">	
                                        <apexchart
                                            type="bar"
                                            height='300'
                                            width='100%'
                                            :options="employee_skill_option"
                                            :series="employee_skill"
                                            class=""
                                            ref="chart2"
                                        ></apexchart>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
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
        date: '',
        currentDate: '',
        weekday: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"],
        months: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
		skill:[],
		req1: [],
        formatdata:[],
		selected_biz: 'All',
		selected_process: 'All',
		process: [],
        shift:'',
        activeBiz: null,
        OT:'',
        RBA_biz:'',
        RBA_pro:'',
		biz_and_process: {},
        IN_REQ:[],
        AB_REQ:[],
		require_support: [
            {
				name: 'In Company',
				data: [],
                group: 'actual',
                emname: []
				
			},
			{
				name: 'Need Allocation',
				data: [],
                group: 'actual',
				emname: []
			},
            {
				name: 'Day Require',
				data: [],
                group: 'required',
				emname: []
			},
			{
				name: 'Night Require',
				data: [],
                group: 'required',
                emname: []
			},
            {
				name: 'Require',
				data: [],
                group: 'requiredAll',
                emname: []
			},
            
		],require_support_night: [
            {
				name: 'In Company',
				data: [],
                group: 'actual',
                emname: []
				
			},
			{
				name: 'Need Allocation',
				data: [],
                group: 'actual',
				emname: []
			},
            {
				name: 'Night Require',
				data: [],
                group: 'required',
                emname: []
			},
            {
				name: 'Day Require',
				data: [],
                group: 'required',
				emname: []
			},
            {
				name: 'Require',
				data: [],
                group: 'requiredAll',
                emname: []
			},
            
		],
		require_support_option:null,
		employee_skill: [],
		employee_skill_option: null,
		headcount_total: '',
		headcount_separated: [],
		headcount_separated_option: {
			colors : ['#5598FE', '#C6831E','#BB3939'],
			chart: {
				type: 'donut',
				foreColor: '#ffffff',
                events: {
                    click: (event) => {
                        console.log(event);
                        var chartComponent = this.$refs.chart1;

                        // ตรวจสอบว่ามี element ของกราฟแบบแท่งหรือไม่
                        if (chartComponent) {
                            // ทำการเรียก method ของกราฟแบบแท่งเพื่อเลื่อนโฟกัส
                            chartComponent.focus();
                        }
                    }
                }
			},
            dataLabels: {
              formatter: (val) => {
                return val 
              }
            },
			labels: ['In cleanroom', 'Not in cleanroom','Absent'],
          
    },
		in_company: '',
		in_cleanroom: '',
		not_in_cleanroom: '',

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
		}

	}
    },
	watch: {
		selected_biz: function () {
			this.process = this.biz_and_process[this.selected_biz]
		},
        selected_process: function () {
		},

    },mounted() {
    this.updateCurrentDate(); 
    },
    created(){
		this.man_power_plan();
        this.Realtime();

        setInterval(() => {
        this.Realtime();
            }, 10000); // 10000 มิลลิวินาที = 10 วินาที
        
	},
	methods: {
    async man_power_plan() {
        try {
            const Head_count = await axios.get("http://43.239.251.75:5000/CombinedData");
            this.respond1 = Head_count.data;
            
            const HEAD_COM = await axios.get("http://43.239.251.75:5000/RBAControl"); 
            this.responseData2 = HEAD_COM.data;

            const REQ = await axios.get("http://43.239.251.75:5000/HeadCountTransitionCOUNT")
            this.respondq = REQ.data;

            const REP = await axios.get("http://43.239.251.75:5000/Replacement")
            this.respondre = REP.data;
            
            // this.date = new Date()
            this.format(this.respondq)
            this.REQUIRED(this.responseData2);	
            this.categorizeEmployees(this.respond1,this.respondre);
			let newList = this.countEmployeesWithSkill();
            console.log('newList',newList);
                for (const biz in newList) {
                    for (const process in newList[biz]) {
                        for (const skillGroup in newList[biz][process]) {
                            let existingSkillGroup = this.employee_skill.find(item => item.name === skillGroup);
                            if (existingSkillGroup) {
                                existingSkillGroup.data.push(newList[biz][process][skillGroup].length);
                                existingSkillGroup.emname.push(newList[biz][process][skillGroup]);
                            }
                        }
                    }
                }
                this.prepareChartData();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
    },
    async Realtime() {
        try {
            const Head_count = await axios.get("http://43.239.251.75:5000/REALTIME_ATTEN");
            this.respond1 = Head_count.data;
            
            this.Head_CO(this.respond1);	

			
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
    },
    REQUIRED(api) {
        let selected_biz = this.selected_biz;
        let selected_process = this.selected_process;
        let OT = '';

        
        if (selected_biz !== 'All' && selected_process !== 'All') {
            for (let i = 0; i < api.length; i++) {
                
                if (selected_biz === api[i].biz && selected_process === api[i].process) {
                    OT = api[i].statusVal.toString();
                    break; 
                }
            }
        }

        
        if (OT !== '' && selected_biz !== 'All' && selected_process !== 'All') {
            
            this.OT = OT;
        } else {
            this.OT = ''; 
        }
    },
    Head_CO(apidata) {
        this.headcount_total = apidata.length;
        this.shift = apidata[0].manpowerPlan.shift
        let InsideCleanroomCount = 0;
        let NotInCleanroomCount = 0;
        let AbsentCount = 0;

        for (const DATA of apidata) {
            // ตรวจสอบ FaceScanLog และ Gatelog ว่าเป็น null หรือไม
            if (!DATA.faceScanLog && !DATA.gateLog) {
                AbsentCount++;
            } else {
                // ตรวจสอบ GateLog ว่าเข้าหรือออก
                if (DATA.gateLog) {
                    if (DATA.gateLog.status === 'IN') {
                        InsideCleanroomCount++;
                    } else if (DATA.gateLog.status === 'OUT') {
                            NotInCleanroomCount++;
                    }
                }else {
                        NotInCleanroomCount++;
                }
            }
        }

        this.cleanroom_inroom[0].data.push(InsideCleanroomCount);

        this.in_company = InsideCleanroomCount + NotInCleanroomCount;
        this.in_cleanroom = InsideCleanroomCount;
        this.not_in_cleanroom = NotInCleanroomCount

        this.headcount_separated = [InsideCleanroomCount, NotInCleanroomCount, AbsentCount];
    },
//     categorizeEmployees(apidata, datareplace) {
   
//     if (this.selected_biz == 'All') {
//         this.selected_process = 'All';
//     } else if (!this.process.includes(this.selected_process)) {
//         this.selected_process = 'All';
//     }
//     for (const DATA of apidata) {
//         let biz = DATA.employeeInfo.biz;
//         let process = DATA.employeeInfo.process;

//                 // ตรวจสอบว่าแผนกนี้มีการสร้างแล้วหรือยัง
//                 if (!this.departments[biz]) {
//                     this.$set(this.departments, biz, {});
//                 }

//                 // ตรวจสอบว่าข้อมูลของ process นี้มีการสร้างแล้วหรือยัง
//                 if (!this.departments[biz][process]) {
//                     this.$set(this.departments[biz], process, {
//                         IN_COMPANY: [],
//                         NEED_ALLOWCATE: [],
//                         REQUIRED: []
//                     });
//                 }

//                 // ตรวจสอบและกำหนดค่าให้ biz และ process ตาม selected_biz และ selected_process
//                 if (!this.biz_and_process[biz]) {
//                     this.$set(this.biz_and_process, biz, []);
//                 }
//                 if (!this.biz_and_process[biz].includes(process)) {
//                     this.biz_and_process[biz].push(process);
//                 }

//                 // ตรวจสอบ faceScanLog และ gateLog เพื่อกำหนดสถานะของพนักงาน
//                 let attendanceStatus = '';
//                 if (DATA.faceScanLog) {
//                     // ถ้ามี faceScanLog และ gateLog คือ IN_COMPANY
//                     attendanceStatus = 'IN_COMPANY';
//                 } else {
//                     // ถ้าไม่มี faceScanLog และ gateLog คือ NEED_ALLOWCATE
//                     attendanceStatus = 'NEED_ALLOWCATE';
//                 }

//                 let employeeInfo = {
//                     empID: DATA.employeeInfo.empId,
//                     firstName: DATA.employeeInfo.firstName,
//                     lastName: DATA.employeeInfo.lastName,
//                     biz: biz,
//                     process: process,
//                     skill: []
//                 };

//                 // วนลูปเพื่อเพิ่มข้อมูลทักษะ skill1 ลงในพนักงาน
//                 for (let skill1 of DATA.ojT_InspectionSkill) {
//                     employeeInfo.skill.push(skill1.skillGroup);
//                 }
//                 // เช็คว่าพนักงานนี้ต้องการแทนที่หรือไม่
//                 const replacedEmployee = datareplace.find(replaceData => {
//                     return replaceData.empID === employeeInfo.empID &&
//                         replaceData.firstName === employeeInfo.firstName &&
//                         replaceData.lastName === employeeInfo.lastName &&
//                         replaceData.biz === employeeInfo.biz &&
//                         replaceData.process === employeeInfo.process;
//                 });

//                 if (replacedEmployee) {
//                     // หาข้อมูลของพนักงานที่ต้องการแทนที่ใน apidata
//                     const replacedEmployeeData = apidata.find(data => data.employeeInfo.empId === replacedEmployee.r_EmpID);

//                     if (replacedEmployeeData) {
//                         this.departments[employeeInfo.biz][employeeInfo.process]['IN_COMPANY'].push({
//                             empID: replacedEmployee.r_EmpID,
//                             firstName: replacedEmployeeData.employeeInfo.firstName,
//                             lastName: replacedEmployeeData.employeeInfo.lastName,
//                             biz: employeeInfo.biz,
//                             process: employeeInfo.process,
//                             skill: replacedEmployeeData.ojT_InspectionSkill.map(skill => skill.skillGroup) 
//                         });

                        

//                         const indexToRemove = this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['IN_COMPANY'].findIndex(emp => {
//                             return emp.empID === replacedEmployee.r_EmpID &&
//                                 emp.firstName === replacedEmployeeData.employeeInfo.firstName &&
//                                 emp.lastName === replacedEmployeeData.employeeInfo.lastName &&
//                                 emp.biz === replacedEmployee.r_Biz &&
//                                 emp.process === replacedEmployee.r_Process;
//                         });

//                         if (indexToRemove !== -1) {
//                             this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['IN_COMPANY'].splice(indexToRemove, 1);
//                         }

                        

//                         // ลบข้อมูลของพนักงานที่มาแทนออกจาก datareplace
//                         const replacedIndex = datareplace.findIndex(data => data === replacedEmployee);
//                         if (replacedIndex !== -1) {
//                             datareplace.splice(replacedIndex, 1);
//                         }

//                         // ลบข้อมูลพนักงานที่มาแทนออกจาก IN_COMPANY ของฝ่ายและกระบวนการเดิมของพนักงานที่มาแทน
//                         const replacedEmployeeIndex = this.departments[employeeInfo.biz][employeeInfo.process]['IN_COMPANY'].findIndex(emp => {
//                             return emp.empID === replacedEmployee.r_EmpID &&
//                                 emp.firstName === replacedEmployeeData.employeeInfo.firstName &&
//                                 emp.lastName === replacedEmployeeData.employeeInfo.lastName &&
//                                 emp.biz === replacedEmployee.r_Biz &&
//                                 emp.process === replacedEmployee.r_Process;
//                         });
                        
//                         if (replacedEmployeeIndex !== -1) {
//                             this.departments[employeeInfo.biz][employeeInfo.process]['IN_COMPANY'].splice(replacedEmployeeIndex, 1);
//                         }

//                         // ลบข้อมูลพนักงานที่ไม่มาออกจาก NEED_ALLOWCATE ของฝ่ายและกระบวนการเดิมของพนักงานที่มาแทน
//                         const originalEmployeeIndex = this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['NEED_ALLOWCATE'].findIndex(emp => {
//                             return emp.empID === replacedEmployee.r_EmpID &&
//                                 emp.firstName === replacedEmployeeData.employeeInfo.firstName &&
//                                 emp.lastName === replacedEmployeeData.employeeInfo.lastName &&
//                                 emp.biz === replacedEmployee.r_Biz &&
//                                 emp.process === replacedEmployee.r_Process;
//                         });

//                         if (originalEmployeeIndex !== -1) {
//                             this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['NEED_ALLOWCATE'].splice(originalEmployeeIndex, 1);
//                         }

//                         continue; // ข้ามไปยังการประมวลผลของพนักงานถัดไป
//                     }
//                 }

//                 this.departments[biz][process][attendanceStatus].push(employeeInfo);
//             }
//             if (this.selected_biz !== 'All' && this.selected_process !== 'All') {
//             this.departments = Object.keys(this.departments)
//                 .filter(biz => biz === this.selected_biz)
//                 .reduce((obj, key) => {
//                     obj[key] = this.departments[key];
//                     return obj;
//                 }, {});

//             // Filter processes for the selected biz
//             if (this.departments[this.selected_biz]) {
//                 this.departments[this.selected_biz] = Object.keys(this.departments[this.selected_biz])
//                     .filter(process => process === this.selected_process)
//                     .reduce((obj, key) => {
//                         obj[key] = this.departments[this.selected_biz][key];
//                         return obj;
//                     }, {});
//             }
//         } else if (this.selected_biz !== 'All') {
//             // Filter by selected_biz only
//             this.departments = Object.keys(this.departments)
//                 .filter(biz => biz === this.selected_biz)
//                 .reduce((obj, key) => {
//                     obj[key] = this.departments[key];
//                     return obj;
//                 }, {});
//         } else if (this.selected_process !== 'All') {
//             // Filter by selected_process only
//             Object.keys(this.departments).forEach(biz => {
//                 this.departments[biz] = Object.keys(this.departments[biz])
//                     .filter(process => process === this.selected_process)
//                     .reduce((obj, key) => {
//                         obj[key] = this.departments[biz][key];
//                         return obj;
//                     }, {});
//             });
//         }

//     for (const biz in this.formatdata) {
//         for (const process in this.formatdata[biz]) {
//             const formattedProcessData = this.formatdata[biz][process];
//             // ตรวจสอบว่า biz และ process มีอยู่ใน this.departments.REQUIRED หรือไม่
//             if (this.departments[biz] && this.departments[biz][process]) {
//                 this.departments[biz][process].REQUIRED.push({
//                     day: formattedProcessData.day,
//                     night: formattedProcessData.night,
//                     require: formattedProcessData.require
//                 });
//             }
//         }
//     }

// },
categorizeEmployees(apidata, datareplace) {
    console.log(this.selected_biz);
    // ตรวจสอบ selected_biz และ selected_process
    const filterByBiz = this.selected_biz !== 'All';
    const filterByProcess = this.selected_process !== 'All';

    for (const DATA of apidata) {
        let biz = DATA.employeeInfo.biz;
        let process = DATA.employeeInfo.process;

        // ตรวจสอบว่าแผนกนี้และข้อมูลของ process มีการสร้างแล้วหรือยัง
        if (!this.departments[biz]) {
            this.$set(this.departments, biz, {});
        }

        if (!this.departments[biz][process]) {
            this.$set(this.departments[biz], process, {
                IN_COMPANY: [],
                NEED_ALLOWCATE: [],
                REQUIRED: []
            });
        }

        // ตรวจสอบและกำหนดค่าให้ biz และ process ตาม selected_biz และ selected_process
        if (!this.biz_and_process[biz]) {
            this.$set(this.biz_and_process, biz, []);
        }

        if (!this.biz_and_process[biz].includes(process)) {
            this.biz_and_process[biz].push(process);
        }

        // ตรวจสอบ faceScanLog และ gateLog เพื่อกำหนดสถานะของพนักงาน
        let attendanceStatus = DATA.faceScanLog ? 'IN_COMPANY' : 'NEED_ALLOWCATE';

        let employeeInfo = {
            empID: DATA.employeeInfo.empId,
            firstName: DATA.employeeInfo.firstName,
            lastName: DATA.employeeInfo.lastName,
            biz: biz,
            process: process,
            skill: DATA.ojT_InspectionSkill.map(skill1 => skill1.skillGroup)
        };

        // เช็คว่าพนักงานนี้ต้องการแทนที่หรือไม่
        const replacedEmployee = datareplace.find(replaceData =>
            replaceData.empID === employeeInfo.empID &&
            replaceData.firstName === employeeInfo.firstName &&
            replaceData.lastName === employeeInfo.lastName &&
            replaceData.biz === employeeInfo.biz &&
            replaceData.process === employeeInfo.process
        );

        if (replacedEmployee) {
            // หาข้อมูลของพนักงานที่ต้องการแทนที่ใน apidata
            const replacedEmployeeData = apidata.find(data =>
                data.employeeInfo.empId === replacedEmployee.r_EmpID
            );

            if (replacedEmployeeData) {
                this.departments[employeeInfo.biz][employeeInfo.process]['IN_COMPANY'].push({
                    empID: replacedEmployee.r_EmpID,
                    firstName: replacedEmployeeData.employeeInfo.firstName,
                    lastName: replacedEmployeeData.employeeInfo.lastName,
                    biz: employeeInfo.biz,
                    process: employeeInfo.process,
                    skill: replacedEmployeeData.ojT_InspectionSkill.map(skill => skill.skillGroup)
                });

                const indexToRemove = this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['IN_COMPANY'].findIndex(emp =>
                    emp.empID === replacedEmployee.r_EmpID &&
                    emp.firstName === replacedEmployeeData.employeeInfo.firstName &&
                    emp.lastName === replacedEmployeeData.employeeInfo.lastName &&
                    emp.biz === replacedEmployee.r_Biz &&
                    emp.process === replacedEmployee.r_Process
                );

                if (indexToRemove !== -1) {
                    this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['IN_COMPANY'].splice(indexToRemove, 1);
                }

                // ลบข้อมูลของพนักงานที่มาแทนออกจาก datareplace
                const replacedIndex = datareplace.findIndex(data => data === replacedEmployee);
                if (replacedIndex !== -1) {
                    datareplace.splice(replacedIndex, 1);
                }

                // ลบข้อมูลพนักงานที่มาแทนออกจาก IN_COMPANY ของฝ่ายและกระบวนการเดิมของพนักงานที่มาแทน
                const replacedEmployeeIndex = this.departments[employeeInfo.biz][employeeInfo.process]['IN_COMPANY'].findIndex(emp =>
                    emp.empID === replacedEmployee.r_EmpID &&
                    emp.firstName === replacedEmployeeData.employeeInfo.firstName &&
                    emp.lastName === replacedEmployeeData.employeeInfo.lastName &&
                    emp.biz === replacedEmployee.r_Biz &&
                    emp.process === replacedEmployee.r_Process
                );

                if (replacedEmployeeIndex !== -1) {
                    this.departments[employeeInfo.biz][employeeInfo.process]['IN_COMPANY'].splice(replacedEmployeeIndex, 1);
                }

                // ลบข้อมูลพนักงานที่ไม่มาออกจาก NEED_ALLOWCATE ของฝ่ายและกระบวนการเดิมของพนักงานที่มาแทน
                const originalEmployeeIndex = this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['NEED_ALLOWCATE'].findIndex(emp =>
                    emp.empID === replacedEmployee.r_EmpID &&
                    emp.firstName === replacedEmployeeData.employeeInfo.firstName &&
                    emp.lastName === replacedEmployeeData.employeeInfo.lastName &&
                    emp.biz === replacedEmployee.r_Biz &&
                    emp.process === replacedEmployee.r_Process
                );

                if (originalEmployeeIndex !== -1) {
                    this.departments[replacedEmployee.r_Biz][replacedEmployee.r_Process]['NEED_ALLOWCATE'].splice(originalEmployeeIndex, 1);
                }

                continue; // ข้ามไปยังการประมวลผลของพนักงานถัดไป
            }
        }

        this.departments[biz][process][attendanceStatus].push(employeeInfo);
    }

    // กรองข้อมูลตาม selected_biz และ selected_process
    if (filterByBiz) {
        this.departments = Object.keys(this.departments)
            .filter(biz => biz === this.selected_biz)
            .reduce((obj, key) => {
                obj[key] = this.departments[key];
                return obj;
            }, {});

        if (filterByProcess) {
            if (this.departments[this.selected_biz]) {
                this.departments[this.selected_biz] = Object.keys(this.departments[this.selected_biz])
                    .filter(process => process === this.selected_process)
                    .reduce((obj, key) => {
                        obj[key] = this.departments[this.selected_biz][key];
                        return obj;
                    }, {});
            }
        }
    } else if (!filterByBiz && filterByProcess) {
        // กรองข้อมูลตาม selected_process เท่านั้น
        for (const biz in this.departments) {
            this.departments[biz] = Object.keys(this.departments[biz])
                .filter(process => process === this.selected_process)
                .reduce((obj, key) => {
                    obj[key] = this.departments[biz][key];
                    return obj;
                }, {});
        }
    }

    // เพิ่มข้อมูล REQUIRED
    for (const biz in this.formatdata) {
        for (const process in this.formatdata[biz]) {
            const formattedProcessData = this.formatdata[biz][process];
            if (this.departments[biz] && this.departments[biz][process]) {
                this.departments[biz][process].REQUIRED.push({
                    day: formattedProcessData.day,
                    night: formattedProcessData.night,
                    require: formattedProcessData.require
                });
            }
        }
    }
},
    prepareChartData() {
        this.require_support_option = {
            colors: ['#5598FE', '#BB3939','#EDF71E','#ed9a5f','#33FF49'],
            title: {
                text: 'Require Support'
            },
            chart: {
                    type: 'bar',
                    stacked: true,
                    toolbar: {
                    show: false
                    },
                    zoom: {
                    enabled: true
                    },
                    foreColor: '#ffffff'
                },
            stroke: {
              width: 2,
              colors: ['#151F2F']
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                    },
            },
            xaxis: {
                type: 'category',
                categories: this.req1,
            },
            
            tooltip: {
                
                enabled: true,
                theme: 'dark',
                custom: ({ series,seriesIndex, dataPointIndex,w }) => {
                    const emname = this.require_support[seriesIndex].emname;
                    if (emname.length > 0 && emname[dataPointIndex]) {
                        const displayedNames = emname[dataPointIndex].slice(0, 5);
                        const remainingNamesCount = emname[dataPointIndex].length - 5;
                        const remainingNamesText = remainingNamesCount > 0 ? ` และอีก ${remainingNamesCount} คน` : '';

                        return `
                            <div class="arrow_box" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; background-color: #f9f9f9;">
                                <span style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
                                    ${displayedNames.join(', ')}<br>${remainingNamesText}
                                </span>
                            </div>
                        `;
                    } else {
                        return (
                                '<div class="arrow_box">' +
                                "<span>" +
                                w.globals.labels[dataPointIndex] +
                                ": " +
                                series[seriesIndex][dataPointIndex] +
                                "</span>" +
                                "</div>"
                            );
                    }
                }
            },legend: {
                horizontalAlign: 'left',
            }
        };

        this.employee_skill_option = {
            // colors:['#d4e157','#259b24','#db830f','#c40fd1','#F048A9','#48A9F4','#6324e0','#BB3939'],
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
                categories: this.req1
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
                custom: ({ seriesIndex, dataPointIndex }) => {
                    const emname = this.employee_skill[seriesIndex].emname;
                    if (emname.length > 0 && emname[dataPointIndex]) {
                        const displayedNames = emname[dataPointIndex].slice(0, 5);
                        const remainingNamesCount = emname[dataPointIndex].length - 5;
                        const remainingNamesText = remainingNamesCount > 0 ? ` และอีก ${remainingNamesCount} คน` : '';

                        return `
                            <div class="arrow_box" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; background-color: #f9f9f9;">
                                <span style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
                                    ${displayedNames.join(', ')}<br>${remainingNamesText}
                                </span>
                            </div>
                        `;
                    } else {
                        return ''; // ถ้าไม่มีข้อมูลใน emname ก็ไม่ต้องแสดงอะไรเลย
                    }
                }
            },
            legend: {
                horizontalAlign: 'left',
            },
            theme: { 
      palette: 'palette2', 
      monochrome: {
          enabled: false,
          color: '#255aee',
          shadeIntensity: 0.65
      },
  }
        };

        this.processEmployeeData();
    },
    // processEmployeeData() {
       
	// 	const aggregatedDepartments = {};
    //     for (const biz in this.departments) {
    //         // console.log('de',this.departments[biz]);
    //         for (const departmentName in this.departments[biz]) {
    //             const IN_COMPANY_length = this.departments[biz][departmentName].IN_COMPANY.length;
    //             const NEED_ALLOWCATE_length = this.departments[biz][departmentName].NEED_ALLOWCATE.length;
    //             const REQUIRED = this.departments[biz][departmentName].REQUIRED;
               
                
    //             const IN_COMPANY_employees = this.departments[biz][departmentName].IN_COMPANY;
    //             const NEED_ALLOWCATE_employees = this.departments[biz][departmentName].NEED_ALLOWCATE;

    //             const IN_COMPANY_names = IN_COMPANY_employees.map(employee => `${employee.firstName} ${employee.lastName}`);
    //             const NEED_ALLOWCATE_names = NEED_ALLOWCATE_employees.map(employee => `${employee.firstName} ${employee.lastName}`);

    //             if (this.selected_biz === 'All' && this.selected_process === 'All') {
    //                 if (!aggregatedDepartments[departmentName]) {
    //                     aggregatedDepartments[departmentName] = {
    //                         IN_COMPANY: [],
    //                         NEED_ALLOWCATE: [],
    //                         REQUIRED: {
    //                             day: 0,
    //                             night: 0,
    //                             require: 0
    //                         }
    //                     };
    //                 }

    //                 // Accumulate REQUIRED data
    //                 REQUIRED.forEach(employee => {
    //                     aggregatedDepartments[departmentName].REQUIRED.day += employee.day;
    //                     aggregatedDepartments[departmentName].REQUIRED.night += employee.night;
    //                     aggregatedDepartments[departmentName].REQUIRED.require += employee.require;
    //                 });

    //                 aggregatedDepartments[departmentName].IN_COMPANY.push(...IN_COMPANY_names);
    //                 aggregatedDepartments[departmentName].NEED_ALLOWCATE.push(...NEED_ALLOWCATE_names);
    //             } else {
    //                 this.req1.push(departmentName);
    //                 this.require_support[0].data.push(IN_COMPANY_length);
    //                 this.require_support[1].data.push(NEED_ALLOWCATE_length);
    //                 this.require_support[0].emname.push(IN_COMPANY_names);
    //                 this.require_support[1].emname.push(NEED_ALLOWCATE_names);
    //                 // REQUIRED.forEach(employee => {
    //                 //     this.require_support[2].data.push(employee.day);
    //                 //     this.require_support[3].data.push(employee.night);
    //                 //     this.require_support[4].data.push(employee.require);
    //                 // });   
    //             }
    //         }
    //     }
       
    // // Push aggregated data to req1 and require_support arrays
    // if (this.selected_biz === 'All' && this.selected_process === 'All') {
    //     for (const departmentName in aggregatedDepartments) {
    //         this.req1.push(departmentName);
    //         const departmentData = aggregatedDepartments[departmentName];
    //         this.require_support[0].data.push(departmentData.IN_COMPANY.length);
    //         this.require_support[1].data.push(departmentData.NEED_ALLOWCATE.length);
    //         this.require_support[0].emname.push(aggregatedDepartments[departmentName].IN_COMPANY);
    //         this.require_support[1].emname.push(aggregatedDepartments[departmentName].NEED_ALLOWCATE);
    //         // this.require_support[2].data.push(departmentData.REQUIRED.day);
    //         // this.require_support[3].data.push(departmentData.REQUIRED.night);
    //         // this.require_support[4].data.push(departmentData.REQUIRED.require);
    //     }
    // }
    
    // },
    processEmployeeData() {
       for (const biz in this.departments) {
           // console.log('de',this.departments[biz]);
           for (const departmentName in this.departments[biz]) {
               const IN_COMPANY_length = this.departments[biz][departmentName].IN_COMPANY.length;
               const NEED_ALLOWCATE_length = this.departments[biz][departmentName].NEED_ALLOWCATE.length;
              
               
               const IN_COMPANY_employees = this.departments[biz][departmentName].IN_COMPANY;
               const NEED_ALLOWCATE_employees = this.departments[biz][departmentName].NEED_ALLOWCATE;

               const IN_COMPANY_names = IN_COMPANY_employees.map(employee => `${employee.firstName} ${employee.lastName}`);
               const NEED_ALLOWCATE_names = NEED_ALLOWCATE_employees.map(employee => `${employee.firstName} ${employee.lastName}`);
               const REQUIRED = this.departments[biz][departmentName].REQUIRED;

               if (this.selected_biz === 'All' && this.selected_process === 'All') {
                // const existingProcessIndex = this.IN_REQ.findIndex(item => item.name === departmentName);
                
               
                // if (existingProcessIndex === -1) {
                //     this.IN_REQ.push({ name: departmentName, data: [] , emname:[]  });
                //     this.AB_REQ.push({ name: departmentName, data: [] , emname:[]  });
                // }
                const combinedName = `${departmentName}  (${biz})`; 
                    this.req1.push(combinedName); 
                   this.require_support[0].data.push(IN_COMPANY_length);
                   this.require_support[1].data.push(NEED_ALLOWCATE_length);
                   this.require_support[0].emname.push(IN_COMPANY_names);
                   this.require_support[1].emname.push(NEED_ALLOWCATE_names);
                   this.require_support_night[0].data.push(IN_COMPANY_length);
                   this.require_support_night[1].data.push(NEED_ALLOWCATE_length);
                   this.require_support_night[0].emname.push(IN_COMPANY_names);
                   this.require_support_night[1].emname.push(NEED_ALLOWCATE_names);
                   REQUIRED.forEach(employee => {
                    if(this.shift == "Day"){
                       this.require_support[2].data.push(employee.day);
                       this.require_support[3].data.push(employee.night);
                       this.require_support[4].data.push(employee.require);
                    }else if(this.shift == "Night"){
                        this.require_support_night[2].data.push(employee.night);
                       this.require_support_night[3].data.push(employee.day);
                       this.require_support_night[4].data.push(employee.require);
                    }
                   });   
                   

               } else {
                   this.req1.push(departmentName);
                   this.require_support[0].data.push(IN_COMPANY_length);
                   this.require_support[1].data.push(NEED_ALLOWCATE_length);
                   this.require_support[0].emname.push(IN_COMPANY_names);
                   this.require_support[1].emname.push(NEED_ALLOWCATE_names);
                   this.require_support_night[0].data.push(IN_COMPANY_length);
                   this.require_support_night[1].data.push(NEED_ALLOWCATE_length);
                   this.require_support_night[0].emname.push(IN_COMPANY_names);
                   this.require_support_night[1].emname.push(NEED_ALLOWCATE_names);
                   REQUIRED.forEach(employee => {
                    //    this.require_support[2].data.push(employee.day);
                    //    this.require_support[3].data.push(employee.night);
                    //    this.require_support[4].data.push(employee.require);
                    if(this.shift == "Day"){
                       this.require_support[2].data.push(employee.day);
                       this.require_support[3].data.push(employee.night);
                       this.require_support[4].data.push(employee.require);
                    }else if(this.shift == "Night"){
                        this.require_support_night[2].data.push(employee.night);
                       this.require_support_night[3].data.push(employee.day);
                       this.require_support_night[4].data.push(employee.require);
                    }
                   });   
               }
           }
       }
   },
countEmployeesWithSkill() {
    let newData = {};
    let allSkillGroups = ["ALL"];
    for (const biz in this.departments) {
        for (const process in this.departments[biz]) {
            for (const attendanceStatus in this.departments[biz][process]) {
                // เช็คเฉพาะ IN_COMPANY และ NEED_ALLOWCATE เท่านั้น
                if (attendanceStatus === 'IN_COMPANY' || attendanceStatus === 'NEED_ALLOWCATE') {
                    for (const employee of this.departments[biz][process][attendanceStatus]) {
                        for (const skillGroup of employee.skill) {
                            if (!allSkillGroups.includes(skillGroup)) {
                                allSkillGroups.push(skillGroup);
                            }
                        }
                    }
                }
            }
        }
    }
    // วนลูปผ่าน departments
    for (const biz in this.departments) {
        newData[biz] = {};

        // เก็บ skillGroup ทั้งหมดใน departments ไว้ก่อน
        

        // เพิ่ม skillGroup "Noskill" ถ้า skillGroups.length เป็น 0
        if (!allSkillGroups.includes('Noskill')) {
            allSkillGroups.push('Noskill');
        }
        // นำเอา skillGroup ทั้งหมดที่เก็บไว้ใน Set มาสร้างโครงสร้างข้อมูลใหม่
        for (const process in this.departments[biz]) {
            newData[biz][process] = {};
            for (const skillGroup of allSkillGroups) {
                newData[biz][process][skillGroup] = [];
            }
        }

        // นับจำนวนคนที่มี skillGroup ใน IN_COMPANY
        for (const process in this.departments[biz]) {
            for (const employee of this.departments[biz][process].IN_COMPANY) {
                const fullName = `${employee.firstName} ${employee.lastName}`;
                for (const skillGroup of employee.skill) {
                    newData[biz][process][skillGroup].push(fullName);
                }
            }
        }

        // นับจำนวนคนที่มี skillGroup ใน NEED_ALLOWCATE
        for (const process in this.departments[biz]) {
            for (const employee of this.departments[biz][process].NEED_ALLOWCATE) {
                const fullName = `${employee.firstName} ${employee.lastName}`;
                for (const skillGroup of employee.skill) {
                    newData[biz][process][skillGroup].push(fullName);
                }
            }
        }

        // ตรวจสอบและนับ skillGroup ที่มีมากกว่า 1 skill ใน IN_COMPANY
        for (const process in this.departments[biz]) {
            for (const employee of this.departments[biz][process].IN_COMPANY) {
                let skillGroups = employee.skill;
                if (skillGroups.length > 1) {
                    if (!newData[biz][process]['ALL']) {
                        newData[biz][process]['ALL'] = [];
                    }
                    const fullName = `${employee.firstName} ${employee.lastName}`;
                    newData[biz][process]['ALL'].push(fullName);
                } else if (skillGroups.length === 0) { // เพิ่มเงื่อนไขสำหรับไม่มี skillGroup
                    if (!newData[biz][process]['Noskill']) {
                        newData[biz][process]['Noskill'] =[];
                    }
                    const fullName = `${employee.firstName} ${employee.lastName}`;
                    newData[biz][process]['Noskill'].push(fullName);
                }
            }
        }

        // ตรวจสอบและนับ skillGroup ที่มีมากกว่า 1 skill ใน NEED_ALLOWCATE
        for (const process in this.departments[biz]) {
            for (const employee of this.departments[biz][process].NEED_ALLOWCATE) {
                let skillGroups = employee.skill;
                if (skillGroups.length > 1) {
                    if (!newData[biz][process]['ALL']) {
                        newData[biz][process]['ALL'] = [];
                    }
                    const fullName = `${employee.firstName} ${employee.lastName}`;
                    newData[biz][process]['ALL'].push(fullName);
                } else if (skillGroups.length === 0) { // เพิ่มเงื่อนไขสำหรับไม่มี skillGroup
                    if (!newData[biz][process]['Noskill']) {
                        newData[biz][process]['Noskill'] = [];
                    }
                    const fullName = `${employee.firstName} ${employee.lastName}`;
                    newData[biz][process]['Noskill'].push(fullName);
                }
            }
        }
    }

    for (const biz in newData) {
        for (const process in newData[biz]) {
            for (const skillGroup in newData[biz][process]) {
                // ตรวจสอบว่า skillGroup ที่จะเพิ่มมีอยู่ใน employee_skill หรือไม่
                const existingSkill = this.employee_skill.find(skill => skill.name === skillGroup);
                
                // หากยังไม่มีให้เพิ่ม skillGroup นี้เข้าไปใน employee_skill
                if (!existingSkill) {
                    this.employee_skill.push({ name: skillGroup, data: [] , emname:[]  });
                }
            }
        }
    }
    return newData
}
,format(api) {
        // สร้าง object เพื่อเก็บข้อมูลที่จัดรูปแบบใหม่
        // let formattedData = [];

        // วนลูปผ่านข้อมูลที่ได้รับจาก API
        api.forEach(item => {
            // ตรวจสอบว่า biz นั้นมีอยู่ใน formattedData หรือไม่
            if (!this.formatdata[item.biz]) {
                this.formatdata[item.biz] = [];
            }

            // ตรวจสอบว่า process นั้นมีอยู่ใน formattedData หรือไม่
            if (!this.formatdata[item.biz][item.process]) {
                this.formatdata[item.biz][item.process] = [];
            }

            // เพิ่มข้อมูลใหม่โดยรวม day, night, และ require
            if (!this.formatdata[item.biz][item.process]["day"]) {
                this.formatdata[item.biz][item.process]["day"] = item.day;
            } else {
                this.formatdata[item.biz][item.process]["day"] += item.day;
            }

            if (!this.formatdata[item.biz][item.process]["night"]) {
                this.formatdata[item.biz][item.process]["night"] = item.night;
            } else {
                this.formatdata[item.biz][item.process]["night"] += item.night;
            }

            if (!this.formatdata[item.biz][item.process]["require"]) {
                this.formatdata[item.biz][item.process]["require"] = item.require;
            } else {
                this.formatdata[item.biz][item.process]["require"] += item.require;
            }
        });
       
},
change_biz(event) {
        this.selected_biz = event.target.getAttribute('value');
        if (this.activeBiz === this.selected_biz) {
            this.activeBiz = null; // ปิด collapse ถ้าถูกคลิกซ้ำ
        } else {
            this.activeBiz = this.selected_biz; // เปิด collapse ถ้าไม่ถูกคลิกซ้ำ
            this.clearOldData(); // เรียกใช้ฟังก์ชันเพื่อล้างข้อมูลเก่า   
            this.man_power_plan();
        }
},change_process(event){
        this.selected_process = event.target.value;
        this.clearOldData(); // เรียกใช้ฟังก์ชันเพื่อล้างข้อมูลเก่า
        this.man_power_plan();
},clearOldData() {
        this.departments = []; // ล้างข้อมูลใน departments
        this.employee_skill = []; // ล้างข้อมูลใน employee_skill
        this.req1 = [];
        this.formatdata=[];
        this.require_support= [
            {
				name: 'In Company',
				data: [],
                group: 'actual',
                emname: []
				
			},
			{
				name: 'Need Allocation',
				data: [],
                group: 'actual',
				emname: []
			},
            {
				name: 'Day Require',
				data: [],
                group: 'required',
				emname: []
			},
			{
				name: 'Night Require',
				data: [],
                group: 'required',
                emname: []
			},
            {
				name: 'Require',
				data: [],
                group: 'requiredAll',
                emname: []
			},
            
		];
        this.require_support_night= [
            {
				name: 'In Company',
				data: [],
                group: 'actual',
                emname: []
				
			},
			{
				name: 'Need Allocation',
				data: [],
                group: 'actual',
				emname: []
			},
            {
				name: 'Night Require',
				data: [],
                group: 'required',
                emname: []
			},
            {
				name: 'Day Require',
				data: [],
                group: 'required',
				emname: []
			},
            {
				name: 'Require',
				data: [],
                group: 'requiredAll',
                emname: []
			},
            
		];
        
},focusChart() {
       // คลิกที่ปุ่ม button
    const buttons = document.querySelectorAll('.btn.btn-link');
    buttons[0].click(); // คลิกที่ปุ่มแรก
    buttons[0].scrollIntoView({ behavior: 'smooth' }); // เลื่อนมุมมองไปที่ปุ่มแรก
},updateCurrentDate() {
        // รับวันที่ปัจจุบันและกำหนดให้กับตัวแปร currentDate
        this.currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
}
},


}

</script>
<style>
.progress1 {
    background-color: #5598FE !important;
    position: relative;
}
.progress2 {
    background-color: #C6831E !important;
}
.box {
  background-color: #262D47;
  padding: 25px 25px;
  border-radius: 4px;
}
.scrollBox {
    max-width: 1000px;
    margin: 50px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.scrollBox::-webkit-scrollbar {
    height: 8px;
    background-color: #1D2A3D;
}

.scrollBox::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 4px;
}

.scrollBox::-webkit-scrollbar-thumb:hover {
    background-color: #c0c0c0;
}
.card-body {
    background-color: #373e56;
}

/* #chart {
  max-width: 760px;
  margin: 35px auto;
  opacity: 0.9;
} */

</style>
