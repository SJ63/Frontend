<template>
	<div class="container">
		<div class="row">
			<div class="col">
				Selected = {{ Id }}
			</div>
		</div>
		<div class="row">
			<div class="col">
				<table class="table table-striped table-hover">
					<thead>
						<tr >
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
						<tr v-for="item in ExamData" :key="item.Id">
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
export default {
  name: 'EmpSelect',
//   props: {
// 	Allocate: {
// 		Id: Number,
// 		Name: String,
// 		LastName: String,
// 		Biz: String,
// 		Process: String,
// 		Status: String,
// 	}
//   },
  data: () => ({
	Id : 0
  }),
  created() {
	this.start()
  },
  methods: {
	start() {
		this.Id = this.$route.query.id
	}
  }
}
</script>