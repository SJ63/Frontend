<template>
    <div class="container">
        <h2>การขาดงาน</h2>		
		<div>วัน{{ weekday[date.getDay()] }} ที่ {{ date.getDate() }} {{ months[date.getMonth()] }} ณ เวลา {{ date.getHours()+' : '+date.getMinutes() }}</div>
		<div>มีพนักงานขาดงานทั้งหมด {{ filtered_not_work.length }} คน </div>
        <div class="row mt-4 g-0 align-items-end">
            <div class="col">
                <div>Biz</div>
                <div class="dropdown ">
                    <button
                        class="btn btn-secondary dropdown-toggle "
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
                            >ทั้งหมด</a></li>
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
                            >ทั้งหมด</a></li>
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
                <div>CourseGroup</div>
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{selected_course_value}}
                    </button>
                    <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li @click="selected_course('All')"><a
                                class="dropdown-item"
                                id='clickableAwesomeFont'
                            >ทั้งหมด</a></li>
                        <li
                            v-for="(item, index) in all_course_group"
                            :key="index"
                            @click="selected_course(item)"
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
                <div>SkillGroup</div>
                <div class="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {{selected_skill_value}}
                    </button>
                    <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li @click="selected_skill('All')"><a
                                class="dropdown-item"
                                id='clickableAwesomeFont'
                            >ทั้งหมด</a></li>
                        <li
                            v-for="(item, index) in all_skill_group"
                            :key="index"
                            @click="selected_skill(item)"
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
            <div class="col-2 offset-2">
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
                                    >{{ page }}</a>
                                </li>

                            </ul>
                        </nav>
                    </caption>
                    <thead>
                        <tr>
                            <th>ลำดับที่</th>
                            <th>รหัสพนักงาน</th>
                            <th>ชื่อ</th>
                            <th>นามสกุล</th>
                            <th>Biz</th>
                            <th>Process</th>
                            <th>CourseGroup</th>
                            <th>SkillGroup</th>
                            <th>สถานะ</th>
                            <th>เลือกพนักงาน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item, index) in list_absent_filter_slice">
                            <tr :key="item.index">
                                <td>{{ index+1 }}</td>
                                <td>{{ item.empId }}</td>
                                <td>{{ item.firstName }}</td>
                                <td>{{ item.lastName }}</td>
                                <td>{{ item.biz }}</td>
                                <td>{{ item.process }}</td>
                                <td>{{ item.courseGroup[0] }}</td>
                                <td>{{ item.skillGroup[0] }}</td>
                                <td>No</td>
                                <td><span
                                        id='clickableAwesomeFont'
                                        @click="selected_people(
											{
												'empId': item.empId,
												'firstName': item.firstName,
												'lastName': item.lastName,
												'biz': item.biz,
												'process': item.process,
												'courseGroup': item.courseGroup[0],
												'skillGroup': item.skillGroup[0],
											}
										)"
                                        data-bs-toggle="collapse"
                                        :data-bs-target="`#${item.empId}`"
                                        aria-expanded="false"
                                        :aria-controls="`#${item.empId}`"
                                    >
                                        <i class="bi bi-arrow-right-circle-fill">
                                        </i></span></td>

                            </tr>
                            <tr :key="item.empId">
                                <td colspan="10">
                                    <EmpReplace :Absent="{
												'empId': item.empId,
												'firstName': item.firstName,
												'lastName': item.lastName,
												'biz': item.biz,
												'process': item.process,
												'courseGroup': item.courseGroup[0],
												'skillGroup': item.skillGroup[0],
											}" 
											:Replace="replace_skill">
									</EmpReplace>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					...
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
				</div>
			</div>
		</div> -->

    </div>
</template>
<script>
import axios from "axios";
import EmpReplace from "./EmpReplace.vue";

export default {
    name: "EmpAbsent",

    components: {
        EmpReplace,
    },
    data: () => ({
		list_Work: [],
        list_absent: [],
        list_absent_filter: [],
        list_absent_filter_slice: [],
        search: "",
        total_pages: 0,
        pages: 1,
        max_scope_page: 0,
        all_biz: [],
        all_process: [],
        selected_biz_value: "Select Biz",
        selected_process_value: "Select Process",
        selected_course_value: "Select CourseGroup",
        selected_skill_value: "Select SkillGroup",
        all_course_group: [],
        all_skill_group: [],
		man_require: [],
		shift: '',
		replace_skill: [],
		date: '',
		weekday: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์"],
		months: [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    }),
    created() {
        // * axios
        this.EmpLog();
        // * raw data
        // this.format_data()
    },
    computed: {
        filtered_not_work() {
            let filter_data = this.list_absent.filter((p) => {
                // return true if the product should be visible

                // in this example we just check if the search string
                // is a substring of the product name (case insensitive)
                // console.log(isNaN(parseInt(this.search)));
                if (isNaN(parseInt(this.search))) {
                    return (
                        p.firstName
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) != -1
                    );
                } else {
                    // console.log(typeof(p.empId));
                    // console.log(typeof(this.search));
                    // console.log('540'.indexOf(5));

                    return p.empId.indexOf(this.search) != -1;
                }
            });

            let filter_biz;
            let filter_process;
            let filter_course;
            let filter_skill;

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

            if (this.selected_course_value !== "Select CourseGroup") {
                console.log(true + "3");
                if (this.selected_course_value != "All") {
                    filter_course = filter_data.filter((q) => {
                        return (
                            q.courseGroup[0]
                                .toLowerCase()
                                .indexOf(
                                    this.selected_course_value.toLowerCase()
                                ) != -1
                        );
                    });
                    console.log(filter_course);
                    filter_data = filter_course;
                }
            }

            if (this.selected_skill_value !== "Select SkillGroup") {
                console.log(true + "4");
                if (this.selected_skill_value != "All") {
                    filter_skill = filter_data.filter((q) => {
                        return (
                            q.skillGroup[0]
                                .toLowerCase()
                                .indexOf(
                                    this.selected_skill_value.toLowerCase()
                                ) != -1
                        );
                    });
                    console.log(filter_skill);
                    filter_data = filter_skill;
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
                .get("http://localhost:5001/CombinedData")
                .catch((err) => console.log(err))
                .then((response) => {
                    // console.log(response.data)
                    const data = response.data;

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].faceScanLog === null) {
                            // this.list_absent.push(data[i])

                            this.list_absent.push({
                                empId: data[i].employeeInfo.empId,
                                firstName: data[i].employeeInfo.firstName,
                                lastName: data[i].employeeInfo.lastName,
                                biz: data[i].employeeInfo.biz,
                                process: data[i].employeeInfo.process,
                                courseGroup: data[i].ojT_InspectionSkill.map(
                                    (c) => c.courseGroup
                                ),
                                skillGroup: data[i].ojT_InspectionSkill.map(
                                    (sk) => sk.skillGroup
                                ),
                            });
                        } else{
							this.list_Work.push({
                                empId: data[i].employeeInfo.empId,
                                firstName: data[i].employeeInfo.firstName,
                                lastName: data[i].employeeInfo.lastName,
                                biz: data[i].employeeInfo.biz,
                                process: data[i].employeeInfo.process,
                                courseGroup: data[i].ojT_InspectionSkill.map(
                                    (c) => c.courseGroup
                                ),
                                skillGroup: data[i].ojT_InspectionSkill.map(
                                    (sk) => sk.skillGroup
                                ),
                            });
						}
                    }

                    console.log(this.list_absent);

                    // const unique_id = [...new Set(this.list_absent.map(item => item.employeeInfo.empId))];
                    const unique_biz = [
                        ...new Set(this.list_absent.map((item) => item.biz)),
                    ];
                    this.all_biz = unique_biz;

                    const unique_process = [
                        ...new Set(
                            this.list_absent.map((item) => item.process)
                        ),
                    ];
                    this.all_process = unique_process;

                    const unique_course = [
                        ...new Set(
                            this.list_absent.map((item) => item.courseGroup[0])
                        ),
                    ];
                    this.all_course_group = unique_course;

                    const unique_skill = [
                        ...new Set(
                            this.list_absent.map((item) => item.skillGroup[0])
                        ),
                    ];
                    this.all_skill_group = unique_skill;

                    console.log(unique_biz);
                    // this.format_data()
					const date = new Date()
					this.date = date
                });
        },
		async Man_Require() {
			await axios.get("http://localhost:5001/HeadCountTransitionCOUNT")
						.catch((err) => console.log(err))
						.then((response) => {
							const data = response.data
							
							this.man_require = data.slice(0)
						})
		},
        format_data() {
            const data = this.list_absent;
            // console.log(this.list_absent);
            const unique_id = [
                ...new Set(this.list_absent.map((item) => item.empId)),
            ];
            // const unique_biz = [...new Set(this.list_absent.map(item => item.EmployeeID))];
            // const unique_process = [...new Set(this.list_absent.map(item => item.EmployeeID))];
            // const unique_course = [...new Set(this.list_absent.map(item => item.EmployeeID))];
            // const unique_skill = [...new Set(this.list_absent.map(item => item.EmployeeID))];
            // console.log(test);

            const separate_data = [];
            for (let i = 0; i < unique_id.length; i++) {
                const temp_separate_data = data.filter(
                    (data) => data.EmployeeID == unique_id[i]
                );
                // console.log(test2);
                separate_data.push(temp_separate_data);
            }

            // console.log(separate_data);

            const last_data = [];
            for (let i = 0; i < separate_data.length; i++) {
                last_data.push(separate_data[i][separate_data[i].length - 1]);
            }
            // console.log(last_data);
            // if (last_data.length > 10) {

            // }
            // console.log(Math.ceil(11/10));

            this.list_absent = last_data;
        },
        set_caption(data) {
            this.list_absent_filter = data;
            this.list_absent_filter_slice = data;

            this.total_pages = Math.ceil(this.list_absent_filter.length / 10);

            if (this.list_absent_filter.length > 10) {
                this.set_data_per_page(1);
            }
        },
        set_data_per_page(select_page) {
            // console.log(select_page);
            this.pages = select_page;

            if (select_page * 10 > this.list_absent_filter.length) {
                this.max_scope_page = this.list_absent_filter.length;
            } else {
                this.max_scope_page = select_page * 10;
            }

            this.list_absent_filter_slice = this.list_absent_filter.slice(
                (select_page - 1) * 10,
                select_page * 10
            );
        },
        selected_biz(biz) {
            console.log(biz);
            this.selected_biz_value = biz;
        },
        selected_process(process) {
            console.log(process);
            this.selected_process_value = process;
        },
        selected_course(course) {
            console.log(course);
            this.selected_course_value = course;
        },
        selected_skill(skill) {
            console.log(skill);
            this.selected_skill_value = skill;
        },
        async selected_people(obj) {

			await this.Man_Require()
			// console.log(obj);
			this.find_repleace(obj)
        },
		find_repleace (obj) {
			this.shift = 'night'
			// const date = new Date()
			// if (date.getHours() < 19) {
			// 	this.shift = 'day'
			// } else {
			// 	this.shift = 'night'
			// }
			// console.log(obj);
			// console.log( this.man_require);
			const require_over = this.man_require.filter((p) => {
				if ((p.day + p.night) > p.require) {
					return p
				}
			})

			// console.log(require_over);
			const repleace = this.list_Work.filter((p) => {
				for (let i = 0; i < require_over.length; i++) {
					if (require_over[i].biz === p.biz && require_over[i].process === p.process ) {
						if ( p.skillGroup.length > 1) {
							for (let j = 0; j < p.skillGroup.length; j++) {
								if (require_over[j].skillGroup === p.skillGroup[i]) {
									return p
								}
							}
						} else {
							if (require_over[i].skillGroup === p.skillGroup[0]) {
								return p
							}
							
						}
					}
				}
			})
			
			console.log(repleace);
			const repleace_filter = repleace.filter((p) => {
				if (obj.skillGroup === p.skillGroup[0]) {
					return p
				}
			})

			this.replace_skill = repleace_filter
			console.log(repleace_filter);
		}
    },
};
</script>
<style>
* {
    color: white;
}
</style>