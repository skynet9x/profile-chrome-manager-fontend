import React, { createContext, useState, useEffect } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'

import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import $ from 'jquery';

function Youtube_channel_page() {
    const [channel_items, setChannel_items] = useState([]);
    const [status, setStatus] = useState({
        "live": 0,
        "die": 0,
        "none": 0
    });

    const [lable_status, setLableStatus] = useState({
        "live": 0,
        "die": 0,
        "none": 0
    });

    const [total, setTotal] = useState(0);
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limitPage, setLimitPage] = useState(50);

    const [query_ags_email, setQuerySearchEmail] = useState("")
    const [query_ags_status, setQuerySearchStatus] = useState("")
    const [query_ags_utm_source, setQuerySearchUtmsource] = useState("")

    var handle_search_query = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        };

        var query = new URLSearchParams({
            page: page,
            limit: limitPage,
            email: query_ags_email,
            status: query_ags_status,
            utm_source: query_ags_utm_source
        }).toString();

        const res = await axiosClient({
            method: 'GET',
            url: '/youtube/?'+ query
        });

        if (res.status == 400) {
			setError(res.response.data)
		};

        if (res.status == 200) {
			setChannel_items(res.data.items)
            setTotal(res.data.total)
		}

        $('#selectAll').on('change', function () {
            $('.form-check .form-check-input').prop('checked', $(this).prop('checked')); 
        }); 
    };

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
                            <li><span class="text-main-600 fw-normal text-15">Channel Youtube</span></li>
                        </ul>
                    </div>
                </div>

                <div class="row gy-4">
                    <div class="col-xxl-3 col-sm-6">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="mb-2">{total}</h4>
                                <span class="text-gray-600">Channel Total</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-sm-6">
                        <div class="card h-100">
                            <div class="card-body ">
                                <h4 class="mb-2">{status.live}</h4>
                                <span class="text-gray-600">Live</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-sm-6">
                         <div class="card h-100">
                            <div class="card-body ">
                                <h4 class="mb-2">{status.die}</h4>
                                <span class="text-gray-600">Die</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-24 card overflow-hidden">
                    <div class="card-header border-bottom border-gray-100">
                        <div class="flex-between flex-wrap gap-8">
                            <form action="#" class="row search_form" onSubmit={(e) => { setPage(1); handle_search_query(e) }}>
                                <div class="col-6">
                                    <div class="position-relative">
                                        <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i class="ph ph-magnifying-glass"></i></button> 
                                        <input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Email..." value={query_ags_email} onChange={(e) => { setQuerySearchEmail(e.target.value) }} />
                                    </div>
                                </div>
                                
                                <div class="col-3">
                                        <div class="position-relative">
                                        <select class="form-control ps-100 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-50" onChange={(e) => { setQuerySearchStatus(e.target.value);  }}>
                                            <option value="" disabled="" selected="">Status</option>
                                            { Object.entries(lable_status).map((key, index) => (
                                                <option value={key[0]} >
                                                    {key[0]} 
                                                    ( {key[1]} )
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div class="col-3">
                                    <div class="position-relative ">
                                        <input type="text" class="form-control border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Utm Source..." value={query_ags_utm_source} onChange={(e) => { setQuerySearchUtmsource(e.target.value) }} />
                                    </div>
                                </div>
                            </form>

                            <div class="flex-align gap-8 flex-wrap">
                                <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                                    <div class="position-relative">
                                        <div class="flex-align gap-8">
                                            <button type="button" class="list-view-btn text-info-600 text-2xl" title="Implode Form">
                                                <i class="ph ph-file-code"></i>
                                            </button>

                                            <button type="button" class="list-view-btn text-info-600 text-2xl" title="Implode File *.csv">
                                                <i class="ph  ph-file-csv"></i>
                                            </button>
                                                
                                            <button type="button" class="list-view-btn text-warning-600 text-2xl" title="Add Task Scheduler" data-bs-toggle="modal" data-bs-target="#push_task_email">
                                                <i class="ph ph-calendar-plus"></i>
                                            </button>

                                            <button type="button" class="list-view-btn text-warning-600 text-2xl" title="Clear task runing">
                                                <i class="ph  ph-arrows-counter-clockwise"></i>
                                            </button>
                                                
                                            <button type="button" class="grid-view-btn text-danger-600 text-2xl" title="Remove selected email">
                                                <i class="ph ph-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <table id="table_channel_data" class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="fixed-width">
                                        <div class="form-check">
                                            <input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll" />
                                        </div>
                                    </th>
                                    <th class="h6 text-gray-300">Channel</th>
                                    <th class="h6 text-gray-300">Email</th>
                                    <th class="h6 text-gray-300">View</th>
                                    <th class="h6 text-gray-300">Subscriber</th>
                                    <th class="h6 text-gray-300">Video</th>
                                    <th class="h6 text-gray-300">Playlist</th>
                                    <th class="h6 text-gray-300">LiveStream</th>
                                    <th class="h6 text-gray-300">Status</th>
                                    <th class="h6 text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {channel_items.map((item) => (
                                    <tr>
                                        <td class="fixed-width">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" value={item.id} type="checkbox" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex-align gap-8">
                                                <span class="h6 mb-0 fw-medium text-gray-300" data-text={ item.channel_id } >
                                                    <a href={ "https://www.youtube.com/channel/" + item.channel_id } target="_blank" >{ item.channel_name }</a>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300 text-password" data-text={ item.email } >{ item.email }</span>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" >{item.view_count} </span>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" >{item.subscriber_count} </span>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" >{item.video_count} </span>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" >{item.playlist_count} </span>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" >{item.livestream_count} </span>
                                        </td>
                                        <td>
                                            <span class="text-13 py-2 px-8 bg-teal-50 text-teal-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                                <span class="w-6 h-6 bg-teal-600 rounded-circle flex-shrink-0"></span>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button type="button" class="list-view-btn text-warning-600  border rounded-pill m-2  p-5" title="Clear task runing">
                                                <i class="ph  ph-arrows-counter-clockwise"></i>
                                            </button>
                                                
                                            <button type="button" class="grid-view-btn text-danger-600  border rounded-pill m-2 p-5" title="Remove this email">
                                                <i class="ph ph-trash"></i>
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
                                    handle_search_query(e)
                                } } ><i class="ph ph-arrow-left"></i></button>
                            </li>
                            <li class="page-item active">
                                <button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" >{page}</button>
                            </li>
                            
                            <li class="page-item">
                                <button class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" onClick={ (e) => {
                                    setPage(page+1)
                                    handle_search_query(e)
                                } } ><i class="ph ph-arrow-right"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
		</div>
	</PrivateRoute>
  );
}

export default Youtube_channel_page;
