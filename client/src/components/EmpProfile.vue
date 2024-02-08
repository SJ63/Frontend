<template>
	<div class="container">
		<div class="row">
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
	</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'EmpProfile',
  data: () => ({
	AllEmp: [],
	Selected: ''
  }),
  created () {
	this.EmpInfo()
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