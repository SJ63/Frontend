<template>
	<div>
        <!-- <div class="col-auto">
        <p class="text-end">{{ currentDate }}</p>
        </div> -->
        <div class="row">
			<div class="col-md-2">
				<h3 class="text-white" >Biz</h3>
				<div >
					<select class="form-select" aria-label="Default select example" @change="change_biz($event)" v-model="selected_biz">
						<option selected class="text-dark" >All</option>
						<option v-for="(value, name) in all_biz_pro" :key="name" class="text-dark" :value="name">
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
						<option v-for="item in all_process" :key="item" class="text-dark" :value="item">
							{{ item }}
						</option>
					</select>
                </div>
			</div>
            <div class="col-md-3">
                <h5 class="text-white" style="display: flex; flex-direction: column; align-items: center;">
                    <p>DAY :{{ currentDate }}</p>
                </h5>   
            </div>
		</div>
		<div class="row g-1">
            <div class="col">
                <!-- <template v-if="selected_biz === 'All' && selected_process === 'All'"> -->
                        <apexchart
                            type="bar"
                            height="500"
                            width="1000"
                            :options="chartOptions1"
                            :series="serise1"
                            class="ms-5 mt-5"
                            ref="chart1"
                        >
                        </apexchart>
                    <!-- </template>
                    <template v-else>
                        <apexchart
                            type="bar"
                            height="500"
                            width="1000"
                            :options="chartOptions1"
                            :series="selct"
                            class="ms-5 mt-5"
                            ref="chart1"
                        >
                        </apexchart>
                </template> -->
            </div>
            <!-- <div class="col">
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
			</div> -->
        </div>
		<div class="row g-0">
            <div class="col">
                <h4 class="ms-5 mt-4 text-white">Headcount by Div</h4>
                <select v-model="selectedDivision" @change="filterData" class="ms-5 text-dark">
                    <option value="" class="text-dark">-- Select Division --</option>
                    <option v-for="(item, index) in divisions" :key="index" class="text-dark" :value="item">{{ item }}</option>
                </select>
                <apexchart width="400" type="donut" :options="chartOptions3" :series="series3" class="ms-5">
                </apexchart>
            </div>
            <div class="col">

				<h4 class="ms-5 mt-4 text-white">Headcount by Group</h4>
				<apexchart
					width="400" type="donut" :options="chartOptions4" :series="series4" class="mt-4 "
				>
				</apexchart>
			</div>
        </div>
        
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "TrendEmp",
    data () {
        return{
        categories1: [],
        selct:[],
        categories2: [],
        categories3: [],
        categories4: [],
        all_biz_pro: {},
        all_process: [],
        selected_biz: 'All',
		selected_process: 'All',
        selected_biz_value : "Select Biz",
        selected_process_value : "Select Process",
        selectedDivision: '', // สำหรับเก็บค่า division ที่ถูกเลือก
        divisions: [], // สำหรับเก็บรายการ division ทั้งหมด
        filteredData: [], // สำหรับเก็บข้อมูลที่ถูกกรอง
        serise1: [
            {
                name: 'New COMER',
                type: 'column',
                data: [],
                ename: []
            }, 
            {
                name: 'Resign',
                type: 'column',
                data: [],
                ename: []
            },
            {
                name: 'Trend New COMER',
                type: 'line',
                data: [],
            },
            {
                name: 'Trend Resign',
                type: 'line',
                data: [],
                
            }
        ],
		serise2: [
            {
				name: 'Employee',
				data: [],
                emname: []
			},
			{
				name: 'Employee Required',
				data: [],
                emname: []
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
        currentDate: ''
    }
},watch: {
		selected_biz: function () {
			this.all_process = this.all_biz_pro[this.selected_biz]
		},
        selected_process: function () {
		}

}, 
created(){
    this.fetchData();
},mounted() {
    // เมื่อคอมโพเนนต์ถูกโหลดเสร็จสมบูรณ์
    this.updateCurrentDate(); // เรียกใช้งานเมื่อโหลดเสร็จสมบูรณ์เพื่ออัปเดตวันที่ปัจจุบัน
},methods: {
    async fetchData() {
    try {
        const HEAD_tra = await axios.get("http://43.239.251.75:5000/HeadCountTransitionYearMonth"); 
        this.responseData1 = HEAD_tra.data;
        // const HEAD_COM = await axios.get("http://43.239.251.75:5000/HeadCountTransitionCOUNT"); 
        // this.responseData2 = HEAD_COM.data;
        
        const HEAD_DIV = await axios.get("http://43.239.251.75:5000/HeadCountbyDiv"); 
        this.responseData3 = HEAD_DIV.data;
        

        const HEAD_GROUP = await axios.get("http://43.239.251.75:5000/HeadCountbyWorkGroup"); 
        this.responseData4 = HEAD_GROUP.data;
        

        this.transformAndSetData(this.responseData1);
        // this.requireDATA(this.responseData2);
        this.HEAD_DIV_(this.responseData3);
        this.HEAD_GRO(this.responseData4);
        
        
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
},

transformAndSetData(apiData) {
    for (const year in apiData) {
            for (const month in apiData[year]) {
                const dataOfMonth = apiData[year][month];
                for (const item of dataOfMonth) {
                    const biz = item.biz;
                    const process = item.process;
                    if (!this.all_biz_pro[biz]) {
                        this.all_biz_pro[biz] = [];
                    }
                    if (!this.all_biz_pro[biz].includes(process)) {
                        this.all_biz_pro[biz].push(process);
                    }
                }
            }
        }
        
    const transformedData = this.transformData(apiData);
    
    for (const month in transformedData) {
    this.categories1.push(month);
    
    // Accessing data and list for 'New' and 'Resign'
    const newData = transformedData[month].New;
    const resignData = transformedData[month].Resign;
    
    // Pushing data to series array
    this.serise1[0].data.push(newData.data);
    this.serise1[2].data.push(newData.data);
    this.serise1[0].ename.push(newData.list);
    this.serise1[1].data.push(resignData.data);
    this.serise1[3].data.push(resignData.data);
    this.serise1[1].ename.push(resignData.list);
}
    
    this.setChartOptions();
    console.log(this.serise1);
},
transformData(apiData) {
    if (this.selected_biz == 'All') {
        this.selected_process = 'All';
    } else if (!this.all_process.includes(this.selected_process)) {
        this.selected_process = 'All';
    }
    let currentYear = new Date().getFullYear();
    let currentMonthIndex = new Date().getMonth(); 
    let chartData = {};
    // วนลูปย้อนกลับเพื่อดึงข้อมูลของเดือนและปีที่ต้องการ
    for (let i = 11; i >= 0; i--) {
        let targetYear = currentYear;
        let targetMonthIndex = currentMonthIndex - i;
        
        // ปรับค่าเดือนและปีในกรณีที่ต้องการย้อนกลับไปยังปีก่อนหน้า
        if (targetMonthIndex < 0) {
            targetMonthIndex += 12;
            targetYear -= 1;
        }
        
        let targetMonth = this.getMonthName(targetMonthIndex); // ดึงชื่อเดือนจากเลขเดือน
        
        if (apiData[targetYear] && apiData[targetYear][targetMonth]) {
            const monthData = apiData[targetYear][targetMonth];
            let newData = 0;
            let resignData = 0;
            let newDataList=[];
            let resignDataList=[];
            

            if (this.selected_biz === 'All' && this.selected_process === 'All') {
                 // Group 'New' transactions by biz and process and count for each process
                 const newTransactions = monthData.filter(item => item.transType === 'New');
                newData = newTransactions.length;
                const newProcessCounts = {};
                monthData.filter(item => item.transType === 'New').forEach(item => {
                    if (!newProcessCounts[item.biz]) {
                        newProcessCounts[item.biz] = {};
                    }
                    if (!newProcessCounts[item.biz][item.process]) {
                        newProcessCounts[item.biz][item.process] = 0;
                    }
                    newProcessCounts[item.biz][item.process]++;
                });

                // Convert newProcessCounts object to an array of objects
                newDataList = Object.keys(newProcessCounts).map(biz => ({
                    [biz]: Object.keys(newProcessCounts[biz]).reduce((acc, process) => {
                        acc[process] = newProcessCounts[biz][process];
                        return acc;
                    }, {})
                }));

                // Group 'Resign' transactions by biz and process and count for each process
                const resignTransactions = monthData.filter(item => item.transType === 'Resign');
                resignData = resignTransactions.length * -1;
                const resignProcessCounts = {};
                monthData.filter(item => item.transType === 'Resign').forEach(item => {
                    if (!resignProcessCounts[item.biz]) {
                        resignProcessCounts[item.biz] = {};
                    }
                    if (!resignProcessCounts[item.biz][item.process]) {
                        resignProcessCounts[item.biz][item.process] = 0;
                    }
                    resignProcessCounts[item.biz][item.process]++;
                });

                // Convert resignProcessCounts object to an array of objects
                resignDataList = Object.keys(resignProcessCounts).map(biz => ({
                    [biz]: Object.keys(resignProcessCounts[biz]).reduce((acc, process) => {
                        acc[process] = resignProcessCounts[biz][process];
                        return acc;
                    }, {})
                }));
            } else if (this.selected_biz !== 'All' && this.selected_process === 'All') {
                // const uniqueProcesses = Array.from(new Set(monthData.map(item => item.process)));
                // uniqueProcesses.forEach(process => {
                //     const existingSkill = this.selct.find(skill => skill.name === process);
                //     if (!existingSkill) {
                //         this.selct.push({ name: process, data: [], emname: [] });
                //     }
                // });
                // Filter data based on selected_biz when selected_process is 'All'
                // Filter 'New' transactions and count by process
                const newTransactions = monthData.filter(item => item.biz === this.selected_biz && item.transType === 'New');
                newData = newTransactions.length;

                // Group 'New' transactions by process and count for each process
                const newProcessCounts = {};
                newTransactions.forEach(item => {
                    if (!newProcessCounts[item.process]) {
                        newProcessCounts[item.process] = 0;
                    }
                    newProcessCounts[item.process]++;
                });

                // Convert newProcessCounts object to an array of objects
                newDataList = Object.keys(newProcessCounts).map(process => ({
                    [process]: newProcessCounts[process]
                }));

                // Filter 'Resign' transactions and count by process
                const resignTransactions = monthData.filter(item => item.biz === this.selected_biz && item.transType === 'Resign');
                resignData = resignTransactions.length * -1;

                // Group 'Resign' transactions by process and count for each process
                const resignProcessCounts = {};
                resignTransactions.forEach(item => {
                    if (!resignProcessCounts[item.process]) {
                        resignProcessCounts[item.process] = 0;
                    }
                    resignProcessCounts[item.process]++;
                });

                // Convert resignProcessCounts object to an array of objects
                resignDataList = Object.keys(resignProcessCounts).map(process => ({
                    [process]: resignProcessCounts[process]
                }));
            } else {
                
                // Filter 'New' transactions and count by process
                const newTransactions = monthData.filter(item => item.biz === this.selected_biz && item.process === this.selected_process && item.transType === 'New');
                newData = newTransactions.length;

                // Group 'New' transactions by process and count for each process
                const newProcessCounts = {};
                newTransactions.forEach(item => {
                    if (!newProcessCounts[item.process]) {
                        newProcessCounts[item.process] = 0;
                    }
                    newProcessCounts[item.process]++;
                });

                // Convert newProcessCounts object to an array of objects
                newDataList = Object.keys(newProcessCounts).map(process => ({
                    [process]: newProcessCounts[process]
                }));

                // Filter 'Resign' transactions and count by process
                const resignTransactions = monthData.filter(item => item.biz === this.selected_biz && item.process === this.selected_process && item.transType === 'Resign');
                resignData = resignTransactions.length * -1;

                // Group 'Resign' transactions by process and count for each process
                const resignProcessCounts = {};
                resignTransactions.forEach(item => {
                    if (!resignProcessCounts[item.process]) {
                        resignProcessCounts[item.process] = 0;
                    }
                    resignProcessCounts[item.process]++;
                });

                // Convert resignProcessCounts object to an array of objects
                resignDataList = Object.keys(resignProcessCounts).map(process => ({
                    [process]: resignProcessCounts[process]
                }));
            }

            chartData[`${targetMonth.toUpperCase()}${targetYear}`] = {
                New: { data: newData, list: newDataList },
                Resign: { data: resignData, list: resignDataList }
            };
        }
    }
    return chartData;
},

getMonthName(monthIndex) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthIndex];
}

,
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
this.divisions = [...divisionSet];


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
    console.log(this.series3);
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
                            stacked: false,    
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: true
                            },
                            foreColor: '#ffffff'
                        },
                        stroke: {
                                width: [0, 4]
                                },
                        dataLabels: {
                            enabled: true,
                            enabledOnSeries: [0,1]
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
                            theme: 'dark',
                            custom: ({ seriesIndex, dataPointIndex }) => {
                                // เข้าถึงข้อมูล ename จาก serise1
                                const emname = this.serise1[seriesIndex].ename;
                                
                                // ตรวจสอบว่า emname มีข้อมูลและมีความยาวมากกว่า 0 และมีข้อมูลในตำแหน่ง dataPointIndex
                                if (emname && emname.length > 0 && emname[dataPointIndex]) {
                                    // ดึงข้อมูล ename ที่ต้องการแสดงผล
                                    const data = emname[dataPointIndex];
                                    let text = '';

                                    // วนลูปเพื่อสร้างข้อความในรูปแบบที่ต้องการ
                                    if (this.selected_biz === 'All' && this.selected_process === 'All'){
                                        for (const key in data) {
                                            for(const biz in data[key]){
                                                for(const process in data[key][biz]){
                                                    console.log(data[key][biz][process]);
                                                    text += `${biz}: ${process} = ${data[key][biz][process]}, `;
                                                }
                                            }
                                        }

                                    }else
                                    {
                                        for (const key in data) {
                                            for(const process in data[key]){
                                                    text += `${process}: ${data[key][process]}, `;
                                                
                                            }
                                        }
                                    }
                                    

                                    // ลบเครื่องหมาย ',' ที่อยู่ท้ายสุดของข้อความ
                                    text = text.slice(0, -2);

                                    // สร้าง HTML สำหรับแสดงข้อมูล ename
                                    let htmlContent = '<div class="arrow_box" style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; background-color: #f9f9f9;">';
                                    htmlContent += '<span style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">';

                                    // แยกรายการใน text และเพิ่ม <br> หลังจากแต่ละรายการ
                                    text.split(', ').forEach(item => {
                                        htmlContent += `${item}<br>`;
                                    });

                                    htmlContent += '</span></div>';
                                    
                                    // คืนค่า HTML ที่สร้างขึ้นเพื่อแสดงผล
                                    return htmlContent;
                                } else {
                                    return ''; // ถ้าไม่มีข้อมูลใน emname ก็ไม่ต้องแสดงอะไรเลย
                                }
                            }
                        },
                        legend : {
                            position: 'right'
                        }
    };
    // this.chartOptions2 = {
    //                 colors: ['#3AA0FF', '#edde5f'],
    //                 title: {
    //                     text: 'Comparison between Employee and Employee Required'
    //                 },
    //                 chart: {
    //                     type: 'bar',
    //                     width: '50%',
    //                     group: 'group1',
	// 					foreColor: '#ffffff'
    //                 },
    //                 plotOptions: {
    //                     bar: {
    //                         horizontal: false,
    //                         columnWidth: '55%',
    //                         endingShape: 'rounded'
    //                     },
    //                 },
    //                 stroke: {
    //                     show: false,
    //                     width: 2,
    //                     colors: ['transparent']
    //                 },
    //                 xaxis: {
    //                     categories: this.categories2
    //                 },
    //                 fill: {
    //                     opacity: 1
    //                 },
    //                 tooltip: {
    //                     y: {
    //                         formatter: function (val) {
    //                             return val + " employees"
    //                         }
    //                     }
    //                 },
    //                 legend: {
    //                     position: 'right'
    //                 }
	// 			};
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
},updateCurrentDate() {
        // รับวันที่ปัจจุบันและกำหนดให้กับตัวแปร currentDate
        this.currentDate = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
},change_biz(event) {
        this.selectbiz = event.target.value;
        this.clearOldData();
        this.fetchData()
        
},change_process(event){
        this.selected_process = event.target.value;
        this.clearOldData();
        this.fetchData()

},clearOldData() {
    this.categories1 =[];
    this.categories3 =[];
    this.categories4 =[];
    this.serise1 =[
            {
                name: 'New COMER',
                type: 'column',
                data: [],
                ename: []
            }, 
            {
                name: 'Resign',
                type: 'column',
                data: [],
                ename: []
            },
            {
                name: 'Trend New COMER',
                type: 'line',
                data: [],
            },
            {
                name: 'Trend Resign',
                type: 'line',
                data: [],
                
            }
        ],
    this.series3= [];
    this.series4= [];
    this.selct=[];
},
    

}
	
};
</script>

