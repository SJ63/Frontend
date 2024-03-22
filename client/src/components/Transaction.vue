<template>
    <div class="container">
        <h2>พนักงานที่ยังไม่เข้า Cleanroom</h2>
		<div>วัน{{ weekday[date.getDay()] }} ที่ {{ date.getDate() }} {{ months[date.getMonth()] }} ณ เวลา {{ date.getHours()+' : '+date.getMinutes() }}</div>
		<div>มีพนักงานที่ยังไม่เข้า Cleanroom ทั้งหมด {{ filtered_not_work.length }} คน </div>
        <div class="row mt-4 g-0 align-items-end">
            <div class="col">
                <div>Biz</div>
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{selected_biz_value}}
                    </button>
                    <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li @click="selected_biz('All')"><a
                                class="dropdown-item"
                                id='clickableAwesomeFont'
                            >All</a></li>
                        <li
                            v-for="(item, index) in all_biz"
                            :key="index"
                            @click="selected_biz(item)"
                        >
                            <a
                                class="dropdown-item"
                                id='clickableAwesomeFont'
                            >
                                {{item}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col">
                <div>Process</div>
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{selected_process_value}}
                    </button>
                    <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li @click="selected_process('All')"><a
                                class="dropdown-item"
                                id='clickableAwesomeFont'
                            >All</a></li>
                        <li
                            v-for="(item, index) in all_process"
                            :key="index"
                            @click="selected_process(item)"
                        >
                            <a
                                class="dropdown-item"
                                href="#"
                            >
                                {{item}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col">
                <input
                    class="form-control"
                    list="datalistOptions"
                    id="exampleDataList"
                    placeholder="ค้นหา ชื่อ/รหัสพนักงาน"
                    v-model="search"
                >

            </div>
        </div>
        <div class="row mt-4 g-0">
            <div class="col">
                <table class="table table-striped table-hover table-responsive table-dark">
                    <caption class="text-white">แสดง {{ 1 + ((pages-1)*10) }} ถึง {{ max_scope_page }} จากทั้งหมด {{ filtered_not_work.length }} คน
                        <nav aria-label="Page navigation">
                            <ul class="pagination d-flex justify-content-end">
                                <li
                                    class="page-item"
                                    v-for="page in total_pages"
                                    :key="page"
                                >
                                    <a
                                        class="page-link"
                                        href="#"
                                        @click="set_data_per_page(page)"
                                    >{{ page}}</a>
                                </li>

                            </ul>
                        </nav>
                    </caption>
                    <thead>
                        <tr>
							<th>ลำดับที่</th>
                            <th>รหัสพนักงาน</th>
                            <th>ชื่อ</th>
                            <th>วันที่และเวลา</th>
							<th>หมายเลขกล้อง</th>
                            <th>Biz</th>
                            <th>Process</th>
                            <th>เลือกพนักงาน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item, index) in list_not_in_cleanroom_filter_slice"
                            :key="item.autoID"
                        >
                            <td>{{ index+1 }}</td>
                            <td>{{ item.employeeID }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.dateTime }}</td>
                            <td>{{ item.cameraNo }}</td>
                            <td>{{ item.biz }}</td>
                            <td>{{ item.process }}</td>
                            <td><span
                                    id='clickableAwesomeFont'
                                    @click="selected_people(item.employeeID)"
                                >
                                    <i class="bi bi-arrow-right-circle-fill">
                                    </i></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div
            class="row mt-4 g-0"
            v-if="series[0].data.length !== 0"
        >
            <div class="col">
                <div id="chart">
                    <apexchart
                        type="rangeBar"
                        height="350"
                        :options="chartOptions"
                        :series="series"
                    ></apexchart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "Transaction",

    data: () => ({
        list_not_in_cleanroom: [],
        list_not_in_cleanroom_filter: [],
        list_not_in_cleanroom_filter_slice: [],
        search: "",
        total_pages: 0,
        pages: 1,
        max_scope_page: 0,
        divided_people: [],
        all_biz: [],
        all_process: [],
        selected_biz_value: "Select Biz",
        selected_process_value: "Select Process",
		date: '',
		weekday: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"],
		months: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
        series: [
            {
                data: [],
            },
        ],
        chartOptions: {
            chart: {
                height: 350,
                type: "rangeBar",
                foreColor: "#ffffff",
            },
            tooltip: {
                theme: "dark",
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            xaxis: {
                type: "datetime",
            },
        },
    }),
    created() {
        // * axios
        this.EmpLog();
        // * raw data
        // this.format_data()
    },
    computed: {
        filtered_not_work() {
            let filter_data = this.list_not_in_cleanroom.filter((p) => {
                // return true if the product should be visible

                // in this example we just check if the search string
                // is a substring of the product name (case insensitive)
                // console.log(parseInt(this.search));
                if (isNaN(parseInt(this.search))) {
                    return (
                        p.name
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) != -1
                    );
                } else {
                    // console.log(typeof(p.EmployeeID));
                    // console.log(typeof(this.search));
                    const str_id = p.employeeID.toString();

                    return str_id.indexOf(this.search) != -1;
                }
            });

            let filter_biz;
            let filter_process;

            if (this.selected_biz_value !== "Select Biz") {
                if (this.selected_biz_value != "All") {
                    console.log(true + "1");
                    filter_biz = filter_data.filter((q) => {
                        return (
                            q.biz
                                .toLowerCase()
                                .indexOf(
                                    this.selected_biz_value.toLowerCase()
                                ) != -1
                        );
                    });
                    console.log(filter_biz);
                    filter_data = filter_biz;
                }
            }

            if (this.selected_process_value !== "Select Process") {
                console.log(true + "2");
                if (this.selected_process_value != "All") {
                    filter_process = filter_data.filter((q) => {
                        return (
                            q.process
                                .toLowerCase()
                                .indexOf(
                                    this.selected_process_value.toLowerCase()
                                ) != -1
                        );
                    });
                    console.log(filter_process);
                    filter_data = filter_process;
                }
            }

            this.set_caption(filter_data);
            // console.log(filter_data);
            return filter_data;
        },
    },
    methods: {
        async EmpLog() {
            await axios
                .get("http://localhost:5001/NOT_INCLEAN")
                .catch((err) => console.log(err))
                .then((response) => {
                    // console.log(response.data)
                    this.list_not_in_cleanroom = response.data;
                    this.format_data();
                });
        },
        format_data() {
            // * raw data
			this.date = new Date()

            const data = this.list_not_in_cleanroom;
            // console.log(this.list_not_in_cleanroom);
            const unique_id = [
                ...new Set(
                    this.list_not_in_cleanroom.map((item) => item.employeeID)
                ),
            ];
            const unique_Biz = [
                ...new Set(this.list_not_in_cleanroom.map((item) => item.biz)),
            ];
            const unique_Process = [
                ...new Set(
                    this.list_not_in_cleanroom.map((item) => item.process)
                ),
            ];

            this.all_biz = unique_Biz;
            // console.log(this.all_biz);
            this.all_process = unique_Process;
            // console.log(test);

            const separate_data = [];
            for (let i = 0; i < unique_id.length; i++) {
                const temp_separate_data = data.filter(
                    (data) => data.employeeID == unique_id[i]
                );
                // console.log(test2);
                separate_data.push(temp_separate_data);
            }

            this.divided_people = separate_data;
            // console.log(this.divided_people[0]);

            const last_data = [];
            for (let i = 0; i < separate_data.length; i++) {
                last_data.push(separate_data[i][separate_data[i].length - 1]);
            }
            // console.log(last_data);
            // if (last_data.length > 10) {

            // }
            // console.log(Math.ceil(11/10));

            this.list_not_in_cleanroom = last_data;
        },
        set_caption(data) {
            this.list_not_in_cleanroom_filter = data;
            this.list_not_in_cleanroom_filter_slice = data;

            this.total_pages = Math.ceil(
                this.list_not_in_cleanroom_filter.length / 10
            );

            if (this.list_not_in_cleanroom_filter.length > 10) {
                this.set_data_per_page(1);
            } else {
                this.max_scope_page = this.list_not_in_cleanroom_filter.length;
            }
        },
        set_data_per_page(select_page) {
            // console.log(this.list_not_in_cleanroom_filter.length);
            this.pages = select_page;

            if (select_page * 10 > this.list_not_in_cleanroom_filter.length) {
                this.max_scope_page = this.list_not_in_cleanroom_filter.length;
            } else {
                this.max_scope_page = select_page * 10;
            }

            this.list_not_in_cleanroom_filter_slice =
                this.list_not_in_cleanroom_filter.slice(
                    (select_page - 1) * 10,
                    select_page * 10
                );
        },
        selected_people(EmpId) {
            // console.log(typeof EmpId);
            // console.log(typeof this.divided_people[0][0].EmployeeID);
            const selected = this.divided_people.filter((p) => {
                return p[0].employeeID === EmpId;
            });

            console.log(console.log(selected));

            // for (let i = 0; i <= selected[0].length-2; i++) {
            // 	this.series[0].data.push({
            // 		x: selected[0][i].cameraNo,
            // 		y: [
            // 			new Date(selected[0][i].dateTime).getTime(),
            // 			new Date(selected[0][i+1].dateTime).getTime()
            // 		]
            // 	})

            // 	// console.log(new Date(selected[0][i].dateTime).getTime());

            // }
            this.series = [
                {
                    data: [
                        {
                            x: "Code",
                            y: [
                                new Date("2019-03-02").getTime(),
                                new Date("2019-03-04").getTime(),
                            ],
                        },
                        {
                            x: "Test",
                            y: [
                                new Date("2019-03-04").getTime(),
                                new Date("2019-03-08").getTime(),
                            ],
                        },
                        {
                            x: "Validation",
                            y: [
                                new Date("2019-03-08").getTime(),
                                new Date("2019-03-12").getTime(),
                            ],
                        },
                        {
                            x: "Deployment",
                            y: [
                                new Date("2019-03-12").getTime(),
                                new Date("2019-03-18").getTime(),
                            ],
                        },
                    ],
                },
            ];

            console.log(this.series);
        },
        selected_biz(biz) {
            console.log(biz);
            this.selected_biz_value = biz;
        },
        selected_process(process) {
            console.log(process);
            this.selected_process_value = process;
        },
    },
};
</script>
<style>
#clickableAwesomeFont {
    cursor: pointer;
}

* {
    color: white;
}
</style>