<template>
	<div class="container">
		<h2>Absent</h2>
		<div class="row mt-4 g-0">
			<div class="col">
					<input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."
						v-model="Selected">
						<datalist id="datalistOptions">
							<option v-for="Emp in AllEmp" :key="Emp.empId">{{Emp.firstName}} {{Emp.lastName}}</option>
						</datalist>
			</div>
			<div class="col">
				{{Selected}}
			</div>
		</div>
		<div class="row mt-4 g-0">
			<div class="col">
				<table class="table table-striped table-hover">
					<thead>
						<tr >
							<th>#</th>
							<th >ID</th>
							<th >NAME</th>
							<th >LASTNAME</th>
							<th >BIZ</th>
							<th >PROCESS</th>
							<th >STATUS</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in ExamData" :key="item.Id">
							<td>{{ index+1 }}</td>
							<td>{{ item.Id }}</td>
							<td>{{ item.Name }}</td>
							<td>{{ item.LastName }}</td>
							<td>{{ item.Biz }}</td>
							<td>{{ item.Process }}</td>
							<td>{{ item.Status }}</td>
							<td>
								<a class="icon-link" :href="'/EmpSelect?id=' + item.Id" >
									<i class="bi bi-box-arrow-right" style="color: black;"></i>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'EmpProfile',
  data: () => ({
	AllEmp: [],
	Selected: '',
	ExamData: [
		{
			Id: '2020033',
			Name: 'Patchara',
			LastName: 'Khuenept',
			Biz: 'IS',
			Process: 'ASSY',
			Status: 'Was allocated'
		},
		{
			Id: '2020034',
			Name: 'Tanwaruth',
			LastName: 'Papapai',
			Biz: 'IS',
			Process: 'ASSY',
			Status: 'Not allocate yet'
		},
		{
			Id: '2020035',
			Name: 'Sudaporn',
			LastName: 'Sena',
			Biz: 'IS',
			Process: 'ASSY',
			Status: 'Not allocate yet'
		},
	],
  }),
  created () {
	// this.EmpInfo()
  },
  methods: {
	async EmpInfo () {
		await axios.get("https://localhost:5001/EmployeeInfo")
				.catch((err) => console.log(err))
				.then((response) => (this.AllEmp = response.data))
	}
  }
}
</script>