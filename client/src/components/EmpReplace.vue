<template>
	<div class="collapse" :id="`${Absent.empId}`">
		<div class="card card-body ">
			<div v-if="list_replace.length === 0 " class="text-black"> ไม่มีพนักงานที่มีทักษะตรงกับที่ต้องการ </div>
			<div v-else-if ="list_replace[0].r_EmpID !== undefined " class="text-black">
				<h3 class="col gx-2"> พนักงานที่ทดแทนคือ {{list_replace[0].r_EmpID}}</h3>
				{{list_replace[0].r_FirstName}} {{list_replace[0].r_LastName}}
			</div>
			<div v-else class="text-black">
				<h3 class="col gx-2"> รายชื่อพนักงานที่สามารถทำงานทดแทนได้ มีทั้งหมด {{list_replace.length}} คน</h3>
				<div v-if="Object.keys(select_replace_emp).length === 0" class="text-black"> ยังไม่ได้เลือกพนักงาน </div>
				<div v-else class="text-black">
					พนักงานที่เลือกคือ {{ select_replace_emp.firstName }} {{select_replace_emp.lastName}}
					<button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">บันทึก</button>
					<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header text-black">
									<h5 class="modal-title" id="exampleModalLabel">พนักงานที่ขาดงานและทดแทน</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body text-black">
									พนักงานที่ขาดงาน -{{ Absent.firstName }} {{Absent.lastName}}<br />
									พนักงานที่ทดแทน -{{ select_replace_emp.firstName }} {{select_replace_emp.lastName}}
								</div>
								<div class="modal-footer text-black">
									<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
									<button type="button" class="btn btn-success" @click="post_replace()">ยืนยัน</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<table class="table">
					<thead>
						<tr>
							<td>รหัสพนักงาน</td>
							<td>ชื่อ</td>
							<td>นามสกุล</td>
							<td>biz</td>
							<td>process</td>
							<td>เลือกพนักงาน</td>
						</tr>
					</thead>
					<tbody>
						<tr  v-for="(item,index) in list_replace" :key="item.empId">
							<td >{{item.empId}}</td>
							<td >{{item.firstName}}</td>
							<td >{{item.lastName}}</td>
							<td >{{item.biz}}</td>
							<td >{{item.process}}</td>
							<td ><span id='clickableAwesomeFont' 
							@click="select_repleace({
								'empId': item.empId,
								'firstName': item.firstName,
								'lastName': item.lastName,
								'biz': item.biz,
								'process': item.process,
								'skillGroup': item.skillGroup,
							}, index)">
								<i class="bi bi-plus-circle text-dark"></i>
							</span></td>
						</tr>
					</tbody>
				
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";

export default {
	
	name: 'EmpReplace',

	props: {
		Absent: Object,
		Replace: Array
	},
	data: () => ({
		select_replace_emp: {},
		shift: '',
	}),
	computed: {
		list_replace () {
			return this.Replace
		}
	},
	methods: {
		test() {
			console.log(this.Replace);
		},
		select_repleace(obj, index) {
			console.log(this.Absent);
			console.log(obj);

			if (Object.keys(this.select_replace_emp).length === 0) {
				this.list_replace.splice(index, 1)
				this.select_replace_emp = obj
			}
			else {
				this.list_replace.splice(index, 1)
				this.list_replace.push(this.select_replace_emp)
				this.select_replace_emp = obj
			}

		},
		async post_replace () {

			const date = new Date()
			if (date.getHours() < 19) {
				this.shift = 'day'
			} else {
				this.shift = 'night'
			}

			await axios
					.post("https://localhost:5001/api/replacement", {
						"EmpID": `${this.Absent.empId}`,
						"FirstName": `${this.Absent.firstName}`,
						"LastName": `${this.Absent.lastName}`,
						"Biz": `${this.Absent.biz}`,
						"Process": `${this.Absent.process}`,
						"Shift": `${this.shift}`,
						"R_EmpID": `${this.select_replace_emp.empId}`,
						"R_FirstName": `${this.select_replace_emp.firstName}`,
						"R_LastName": `${this.select_replace_emp.lastName}`,
						"R_Biz": `${this.select_replace_emp.biz}`,
						"R_Process": `${this.select_replace_emp.process}`
					})
					.catch((e) => {
						console.log(e);
					})
					.then(
						alert("Complete")
					)
		}
	}
}
</script>
<style>
* {
	color: white
}
</style>