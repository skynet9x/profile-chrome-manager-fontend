import React, { createContext, useState, useEffect } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'
import ModalTask_channel from '../components/modal/ModalTask_channel'

import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import $ from 'jquery';

function Google_drive_page() {
    const [items, setItems] = useState([]);
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

    const [query_ags_file_id, setQuery_file_id] = useState("")
    const [query_ags_drive_id, setQuery_drive_id] = useState("")
    const [query_ags_status, setQuery_status] = useState("")

    var handle_search_query = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        };

        var query = new URLSearchParams({
            page: page,
            limit: limitPage,
            file_id: query_ags_file_id,
            drive_id: query_ags_drive_id,
            status: query_ags_status
        }).toString();

        const res = await axiosClient({
            method: 'GET',
            url: '/google/drive/?'+ query
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

    const [form_title, set_from_title] = useState("");
    const [form_description, set_form_description] = useState("");
    const [form_drive_url, set_form_drive_url] = useState("");

    var handle_new_video = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        };

        var drive_id = form_drive_url.split('/')[5];


        const res = await axiosClient({
            method: 'POST',
            url: '/google/drive/save',
            data: JSON.stringify({
                "type": "video",
                "drive_id": drive_id,
                "json_data": {
                    "title": form_title,
                    "description": form_description
                }
            })
        });

    };

    useEffect(() => {
        setError(null)
        handle_search_query()
    }, [page, query_ags_status, query_ags_drive_id, query_ags_file_id]);

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
                            <li><span class="text-main-600 fw-normal text-15"> Google Drive </span></li>
                        </ul>
                    </div>
                </div>

                <div class="row gy-4">
                    <div class="col-xxl-3 col-sm-6">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="mb-2">{total}</h4>
                                <span class="text-gray-600"> Total</span>
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
                                        <input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill" placeholder="Drive ID..." value={query_ags_drive_id} onChange={(e) => { setQuery_drive_id(e.target.value) }} />
                                    </div>
                                </div>
                                
                                <div class="col-2">
                                        <div class="position-relative">
                                        <select class="form-control ps-100 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-50" onChange={(e) => { setQuery_status(e.target.value);  }}>
                                            <option value="" disabled="" selected="">Status</option>
                                        </select>
                                    </div>
                                </div>
                            </form>

                            <div class="flex-align gap-8 flex-wrap">
                                <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                                    <div class="position-relative">
                                        <div class="flex-align gap-8">
                                            <button type="button" class="list-view-btn text-warning-600 text-2xl" title="Add Task Scheduler" data-bs-toggle="modal" data-bs-target="#create_drive_file">
                                                <i class="ph ph-calendar-plus"></i>
                                            </button>

                                            <button type="button" class="list-view-btn text-warning-600 text-2xl ph  ph-arrows-counter-clockwise" title="reload" onClick={handle_search_query}>
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
                        <table id="table_data" class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="fixed-width">
                                        <div class="form-check">
                                            <input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll" />
                                        </div>
                                    </th>
                                    <th class="h6 text-gray-300">ID</th>
                                    <th class="h6 text-gray-300">Type</th>
                                    <th class="h6 text-gray-300">Actions</th>
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
                                            <span class="h6 mb-0 fw-medium text-gray-300 text-password" data-text={ item.name } >{ item.drive_id }</span>
                                        </td>
                                        <td>
                                            <span class="h6 mb-0 fw-medium text-gray-300" > {item.drive_type} </span>
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
        <div class="modal" tabindex="-1" id="create_drive_file">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="card">
                        <div class="card-body">
                            <form action="" onSubmit={handle_new_video} >
                                <div class="row gy-20">
                                    <div class="col-12">
                                        <div class="row g-20">
                                            <div class="col-sm-12">
                                                <label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Title </label>
                                                <div class="position-relative">
                                                    <input type="text"  class="text-counter placeholder-13 form-control py-11 " value={form_title} onChange={(e) => { set_from_title(e.target.value) }}  />
                                                    
                                                </div>
                                            </div>

                                            <div class="col-sm-12">
                                                <label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Description </label>
                                                <div class="position-relative">
                                                    <textarea type="text"  class="text-counter placeholder-13 form-control py-11 " value={form_description} onChange={(e) => { set_form_description(e.target.value) }}></textarea>
                                                    
                                                </div>
                                            </div>

                                            <div class="col-sm-12">
                                                <label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Drive Url </label>
                                                <div class="position-relative">
                                                    <input type="text"  class="text-counter placeholder-13 form-control py-11 " value={form_drive_url} onChange={(e) => { set_form_drive_url(e.target.value) }}  />
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="flex-align justify-content-end gap-8">
                                        <button type="button" class="btn btn-outline-main rounded-pill py-9" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-main rounded-pill py-9">Save</button>
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

export default Google_drive_page;
