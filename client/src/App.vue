<template>
	<div id="app">
		<div class="container-fluid">
			<div class="row g-0">
				<div class="col-2 nav-bg position-relative">
					<h2 class="text-white mt-3 ms-3">DASHBOARD</h2>
					<ul class="nav flex-column ">
						<!-- <li class="nav-item ">
							<a class="nav-link icon-link" href="/" >
								<i class="bi bi-house-door d-flex" style="color: white;" ></i>
								Home
							</a>
						</li> -->
						<li class="nav-item ">
							<a class="nav-link icon-link" href="/" >
								<i class="bi bi-house-door d-flex" style="color: white;" ></i>
									หน้าหลัก
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/EmpInCompany">
								<i class="bi bi-person" style="color: white;"></i>
									ภายในบริษัท
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/EmpInCleanroom">
								<i class="bi bi-clipboard-plus" style="color: white;"></i>
									เข้า Cleanroom
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/EmpNotInCleanroom">
								<i class="bi bi-clipboard-plus" style="color: white;"></i>
									ยังไม่เข้า Cleanroom
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/EmpAbsent">
								<i class="bi bi-send-plus" style="color: white;"></i>
									ขาดงาน
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/TrendEmp">
								<i class="bi bi-calendar-date" style="color: white;"></i>
									แนวโน้ม
							</a>
						</li>
						<li class="nav-item">
							<p class="nav-link" style="color: white;">Current Time: {{ currentDate }}</p>
						</li>
					</ul>
				</div>
				<div class="col-10 page-bg">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
    return {
		list: [],// เพิ่ม list ไว้ใน data
		currentDate: this.getCurrentTime()
    };
  },mounted() {
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000); 
  },
  methods: {
    getCurrentTime() {
      return new Date().toLocaleTimeString();
    }
  }
	

}
</script>
<style>
.container-fluid{
   padding: 0 !important;
}

.nav-link {
	color: white !important;
}

.nav-bg {
	background-color: #1D2A3D;
}

.page-bg {
	background-color: #151F2F;

}

a:active {
  color: aqua;
}
</style>

