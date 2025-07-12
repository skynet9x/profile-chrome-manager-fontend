import React, { createContext, useState, useEffect} from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'
import { toast } from "react-toastify";
import axiosClient from "../api/axiosClient";
import $ from 'jquery';

function TaskschedulerPage() {
	const [Tasks, setTasks] = useState([])
	const [total, setTotal] = useState(0)
	const [error, setError] = useState(null)

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(100)
	const [query_ags_email, setQuerySearchEmail] = useState("")
	const [query_ags_status, setQuerySearchStatus] = useState("")
	const [query_ags_type, setQuerySearchTaskType] = useState("")
	const [query_ags_utm_source, setQuerySearchTaskUtmSource] = useState("")
	
	var handle_search_query = async (e) => {
		if (e && e.preventDefault) {
			e.preventDefault(); 
		};
		var query = new URLSearchParams({
            page: page,
            limit: limit,
            email: query_ags_email,
            status: query_ags_status,
            utm_source: query_ags_utm_source,
			type: query_ags_type
        }).toString();

        const res = await axiosClient({
            method: 'GET',
            url: '/task/scheduler/email?'+ query
        });

        if (res.status == 400) {
			setError(res.response.data)
		};

        if (res.status == 200) {
			setTasks(res.data.task_scheduler)
            setTotal(res.data.total)
		}

        $('#selectAll').on('change', function () {
            $('.form-check .form-check-input').prop('checked', $(this).prop('checked')); 
        }); 
	};

	var nextPage = () => {
		setPage((page) => page+1);
	};
	var pevPage = () => {
		setPage((page) => page > 1 ? page-1 : page );
	};

	var handle_on_remove = async (e) => {
		let id = $(e.target).attr("data-id");
		let index = $(e.target).attr("data-index");
		var query = new URLSearchParams({
            page: page,
            limit: limit,
            email: query_ags_email,
            status: query_ags_status,
            utm_source: query_ags_utm_source,
			type: query_ags_type
        }).toString();

        const res = await axiosClient({
            method: 'DELETE',
            url: `/task/scheduler/${id}`
        });

        if (res.status == 400) {
			setError(res.response.data)
			toast.error("delete fail")
		};

        if (res.status == 200) {
			toast.success("delete complete");
			setTasks((pevtasks) => pevtasks.filter((_, i) => i != index));
		};
	};

	useEffect(() => {
		setError(null);
		handle_search_query();
	}, [page, query_ags_status, query_ags_utm_source, query_ags_type, query_ags_utm_source, query_ags_email]);

	useEffect(() => {
		setError(null);
		handle_search_query();
	}, []);
  return (
	<PrivateRoute>
		<SideBar />
		<div class="dashboard-main-wrapper">
			<TopNavBar />

			<div class="dashboard-body">
				<div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
					<div class="breadcrumb mb-24">
						<ul class="flex-align gap-4">
							<li><a href="/" class="text-gray-200 fw-normal text-15 hover-text-main-600">Dashboard</a></li>
							<li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
							<li><span class="text-main-600 fw-normal text-15">Scheduler</span></li>
						</ul>
					</div>
				</div>

				<div class="row gy-4">
					<div class="col-xxl-3 col-sm-6">
						<div class="card h-100">
							<div class="card-body">
								<h4 class="mb-2">{total}</h4>
								<span class="text-gray-600">Task scheduler</span>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-24  overflow-hidden">
					<ul class="nav common-tab style-two nav-pills mb-0" id="pills-tab" role="tablist">
						<li class="nav-item" role="presentation">
							<button class="nav-link active" id="pills-gmail-tab" data-bs-toggle="pill" data-bs-target="#pills-gmail" type="button" role="tab" aria-controls="pills-gmail" aria-selected="true">Gmail</button>
						</li>
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="pills-youtube-tab" data-bs-toggle="pill" data-bs-target="#pills-youtube" type="button" role="tab" aria-controls="pills-youtube" aria-selected="true">Youtube Channel</button>
						</li>
					</ul>
				</div>
				<div class="card overflow-hidden">
					<div class="tab-content" id="pills-tabContent">
						<div class="tab-pane fade show active" id="pills-gmail" role="tabpanel" aria-labelledby="pills-gmail-tab" tabindex="0">
							<div class="card mt-24">
								<div class="card-header border-bottom border-gray-100">
									<div class="flex-between flex-wrap gap-8">
										<form action="#" class="row search_form" onSubmit={(e) => { setPage(1); handle_search_query(e); }}>
											<div class="col-4">
												<div class="position-relative">
													<button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i class="ph ph-magnifying-glass"></i></button> 
													<input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Email..." value={query_ags_email} onChange={(e) => { setQuerySearchEmail(e.target.value) }} />
												</div>
											</div>

											<div class="col-3">
												<div class="position-relative">
													<select class="form-control ps-100 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-50" value={query_ags_type} onChange={(e) => { setQuerySearchTaskType(e.target.value);  }}>
														<option value="" disabled="" selected="">Type Action All</option>
														<option value="interact">Interact</option>
														<option value="login_gmail">Login Gmail</option>
														<option value="load_channel_info">Load channel</option>
													</select>
												</div>
											</div>
											
											<div class="col-2">
												<div class="position-relative">
													<select class="form-control ps-100 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-50" value={query_ags_status} onChange={(e) => { setQuerySearchStatus(e.target.value);  }}>
														<option value="" disabled="" selected="">Status all</option>
														<option value="pending">Pending</option>
														<option value="runing">Runing</option>
														<option value="complete">Complete</option>
													</select>
												</div>
											</div>

											<div class="col-3">
												<div class="position-relative">
													<input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Utm source" value={query_ags_utm_source} onChange={(e) => { setQuerySearchTaskUtmSource(e.target.value) }} />
												</div>
											</div>
										</form>
										<div class="flex-align gap-8 flex-wrap">
											<div class="position-relative text-gray-500 flex-align gap-4 text-13">
												<div class="position-relative">
													<div class="flex-align gap-8">
														<button type="button" class="list-view-btn text-warning-600 text-2xl" title="reload" onClick={handle_search_query}>
															<i class="ph  ph-arrows-counter-clockwise"></i>
														</button>
															
														<button type="button" class="grid-view-btn text-danger-600 text-2xl" title="Remove selected">
															<i class="ph ph-trash"></i>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="card-body p-0">
									<table id="table_task_scheduler_data" class="table table-striped">
										<thead>
											<tr>
												<th class="fixed-width">
													<div class="form-check">
														<input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll" />
													</div>
												</th>
												<th class="h6 text-gray-300">Email</th>
												<th class="h6 text-gray-300">Scheduler Action</th>
												<th class="h6 text-gray-300">Scheduler Date</th>
												<th class="h6 text-gray-300">Status</th>
												<th class="h6 text-gray-300">Messages</th>
												<th class="h6 text-gray-300">data</th>
												<th class="h6 text-gray-300">Actions</th>
											</tr>
										</thead>
										<tbody>
											{ Tasks.map((item, index) => (
												<tr>
													<td class="fixed-width">
														<div class="form-check">
															<input class="form-check-input border-gray-200 rounded-4" value={item.id} type="checkbox" />
														</div>
													</td>
													<td>
														<div class="flex-align gap-8">
															<span class="h6 mb-0 fw-medium text-gray-300">{item.email}</span>
														</div>
													</td>
													<td>
														<span class="h6 mb-0 fw-medium text-gray-300">{item.scheduler_action}</span>
													</td>
													<td>
														<span class="h6 mb-0 fw-medium text-gray-300">{item.scheduler_date_type} </span>
													</td>
													<td>
														<span class="h6 mb-0 fw-medium text-gray-300">{item.status} </span>
													</td>
													<td>
														<span class="h6 mb-0 fw-medium text-gray-300">{item.message} </span>
													</td>
													<td>
														<span class="h6 mb-0 fw-medium text-gray-300" > --- </span>
													</td>
													<td>
														<button type="button" class="list-view-btn text-warning-600  border rounded-pill m-2  p-5 ph  ph-arrows-counter-clockwise" title="Clear task runing">
														</button>
															
														<button type="button" class="grid-view-btn text-danger-600  border rounded-pill m-2 p-5 ph ph-trash" data-id={item.id} data-index={index} onClick={handle_on_remove} title="Remove this task">
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div class="card-footer flex-between flex-wrap">
									<span class="text-gray-900">Showing { (page-1)*limit } to { ((page-1)*limit) + limit } of {total} entries</span>
									<ul class="pagination flex-align flex-wrap">
										<li class="page-item">
											<button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" onClick={pevPage}><i class="ph ph-arrow-left"></i></button>
										</li>
										<li class="page-item active">
											<button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" >{page}</button>
										</li>
										
										<li class="page-item">
											<button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" onClick={nextPage} ><i class="ph ph-arrow-right"></i></button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="tab-pane fade show " id="pills-youtube" role="tabpanel" aria-labelledby="pills-youtube-tab" tabindex="0">

						</div>
					</div>
					
				</div>
			</div>
			
		</div>
	</PrivateRoute>
  );
}

export default TaskschedulerPage;
