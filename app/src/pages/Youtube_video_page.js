import React, { createContext, useState, useEffect } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'
import ModalTask from '../components/modal/ModalTask'

import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import $ from 'jquery';

function Youtube_video_page() {
    const [items, setItems] = useState([]);

    const [total, setTotal] = useState(0);
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limitPage, setLimitPage] = useState(50);

    const [query_ags_keyword, setQuerySearchKeyword] = useState("")
    const [query_ags_utm_source, setQuerySearchUtmsource] = useState("")


    // form import //
    const [from_import_keywords, set_from_import_keyword] = useState([])
    const [from_import_utm_source, set_from_import_utm_source] = useState("")
    var handle_search_query = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        };

        var query = new URLSearchParams({
            page: page,
            limit: limitPage,
            title: query_ags_keyword,
            video_id: query_ags_keyword,
            channel_id: query_ags_keyword,
            channel_title: query_ags_keyword,
            utm_source: query_ags_utm_source,
        }).toString();

        const res = await axiosClient({
            method: 'GET',
            url: '/youtube/video/?'+ query
        });

        if (res.status == 400) {
			setError(res.response.data)
		};

        if (res.status == 200) {
			setItems(res.data.items)
            setTotal(res.data.total)
		}

        $('#selectAll').on('change', function () {
            $('.form-check .form-check-input').prop('checked', $(this).prop('checked')); 
        });
    };


    var handle_import_video = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        };

        let complete_count = 0;
        let len_keyword = from_import_keywords.length;

        for (let i = 0; i < len_keyword; i++)
        {
            var res = await axiosClient({
                method: 'POST',
                url: '/youtube/keyword/new',
                data: JSON.stringify({
                    "keyword": from_import_keywords[i],
                    "utm_source": from_import_utm_source
                })
            });

            if (res.status == 400) {
                setError(res.response.data)
            };

            if (res.status == 200) {
                complete_count += 1;
            }
        };
    };

    var handle_Effect_task = (e) => {
        
    };
    

    useEffect(() => {
        setError(null)
        handle_search_query()
    }, [page, query_ags_keyword, query_ags_utm_source]);

    useEffect(() => {
        setError(null)
        handle_search_query()
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
                            <li><span class="text-main-600 fw-normal text-15">Channel keyword</span></li>
                        </ul>
                    </div>
                </div>

                <div class="row gy-4">
                    <div class="col-xxl-3 col-sm-6">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="mb-2">{total}</h4>
                                <span class="text-gray-600">Total</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-24 card overflow-hidden">
                    <div class="card-header border-bottom border-gray-100">
                        <div class="flex-between flex-wrap gap-8">
                            <form action="#" class="row search_form" onSubmit={(e) => { setPage(1); handle_search_query(e) }}>
                                <div class="col-4">
                                    <div class="position-relative">
                                        <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i class="ph ph-magnifying-glass"></i></button> 
                                        <input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Keyword..." value={query_ags_keyword} onChange={(e) => { setQuerySearchKeyword(e.target.value) }} />
                                    </div>
                                </div>
                                
                                <div class="col-2">
                                    <div class="position-relative ">
                                        <input type="text" class="form-control border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Utm Source..." value={query_ags_utm_source} onChange={(e) => { setQuerySearchUtmsource(e.target.value) }} />
                                    </div>
                                </div>
                            </form>

                            <div class="flex-align gap-8 flex-wrap">
                                <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                                    <div class="position-relative">
                                        <div class="flex-align gap-8">
                                            <button type="button" class="list-view-btn text-warning-600 text-2xl" title="Add Task Scheduler" data-bs-toggle="modal" data-bs-target="#modal_import_keywords">
                                                <i class="ph ph-calendar-plus"></i>
                                            </button>

                                            <button type="button" class="list-view-btn text-warning-600 text-2xl ph  ph-arrows-counter-clockwise" title="reload" onClick={handle_search_query}>
                                            </button>
                                                
                                            <button type="button" class="grid-view-btn text-danger-600 text-2xl" title="Remove selected ">
                                                <i class="ph ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <table id="table_video_data" class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="fixed-width">
                                        <div class="form-check">
                                            <input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll" />
                                        </div>
                                    </th>
                                    <th class="h6 text-gray-300"> Video </th>
                                    <th class="h6 text-gray-300"> View </th>
                                    <th class="h6 text-gray-300"> Channel </th>
                                    <th class="h6 text-gray-300"> Keywords </th>
                                    <th class="h6 text-gray-300"> Laster Updated </th>
                                    <th class="h6 text-gray-300"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr>
                                        <td class="fixed-width">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" value={item.id} type="checkbox" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-8">
                                                <a class="h6 mb-0 fw-medium " href={ "https://www.youtube.com/video/" + item.video_id} title={item.video_title} target="_blank" > {(item.video_title.length > 50) ? item.video_title.substr(0, 50) + "..." : item.video_title } </a>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" > {item.view_count} </span>
                                        </td>
                                        <td>
                                            <a class="h6 mb-0 fw-medium text-gray-300" href={ "https://www.youtube.com/channel/" + item.channel_id} target="_blank"> {item.channel_name} </a>
                                        </td>

                                        <td>

                                            { (item.keywords) ? item.keywords.map((item2) => (
                                                <span class="h6 mb-0 fw-medium text-tag"> {item2.keyword} </span>
                                            )) : "" }
                                            
                                        </td>

                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" > {item.updated_at} </span>
                                        </td>
                                        <td>
                                            <button type="button" class="list-view-btn text-warning-600  border rounded-pill m-2 p-5 ph  ph-arrows-counter-clockwise" title="Clear task runing">
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer flex-between flex-wrap">
                        <span class="text-gray-900">Showing { (page-1)*limitPage } to { ((page-1)*limitPage) + limitPage } of {total} entries</span>
                        <ul class="pagination flex-align flex-wrap">
                            <li class="page-item">
                                <button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" onClick={ (e) => {
                                    ( ( page > 1  ) ? setPage(page-1)  : setPage(page))
                                } } ><i class="ph ph-arrow-left"></i></button>
                            </li>
                            <li class="page-item active">
                                <button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" >{page}</button>
                            </li>
                            
                            <li class="page-item">
                                <button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" onClick={ (e) => {
                                    setPage(page+1)
                                } } ><i class="ph ph-arrow-right"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
		</div>
        <div class="modal" tabindex="-1" id="modal_import_keywords">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="card">
						<div class="card-header">
							<h5 class="text-gray">Add New Keyword</h5>
						</div>
						<div class="card-body">
							<form action="" onSubmit={handle_import_video}>
								<div class="row gy-20">
									<div class="col-12">
										<div class="row g-20">
											<div class="col-sm-12">
												<label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Utm Source <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
												<div class="position-relative">
													<input type="text" value={from_import_utm_source} onChange={ (e) => set_from_import_utm_source(e.target.value) } class="text-counter placeholder-13 form-control py-11" maxlength="100" id="courseTitle" placeholder="selected Items" />
												</div>
											</div>

											<div class="col-sm-12">
												<label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Keywords <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
												<div class="position-relative">
                                                    <textarea className="text-counter placeholder-13 form-control py-11" onChange={ (e) => set_from_import_keyword(e.target.value.trim().split('\n')) }>{from_import_keywords.join('\n')}</textarea>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-align justify-content-end gap-8">
										<button type="button" class="btn btn-outline-main rounded-pill py-9" data-bs-dismiss="modal">Cancel</button>
										<button type="submit" class="btn btn-main rounded-pill py-9">Creater</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</PrivateRoute>
  );
}

export default Youtube_video_page;
