import React, { createContext, useState, useEffect } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'
import ModalTask_channel from '../components/modal/ModalTask_channel'

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

    const [query_ags_channel_id, setQuerySearchChannelID] = useState("")
    const [query_ags_email, setQuerySearchEmail] = useState("")
    const [query_ags_status, setQuerySearchStatus] = useState("")
    const [query_ags_utm_source, setQuerySearchUtmsource] = useState("")

    const [scheduler_action, setFrom_scheduler_action] = useState("create_playlist")
    const [scheduler_date_type, setFrom_scheduler_date_type] = useState("fixed")
    const [scheduler_date_fixed, setFrom_scheduler_date_fixed] = useState(moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"))
    const [scheduler_date_delay, setFrom_scheduler_date_delay] = useState(600)
    const [scheduler_date_range_min, setFrom_scheduler_date_range_min] = useState(0)
    const [scheduler_date_range_max, setFrom_scheduler_date_range_max] = useState(86400 - 1)
    const [keyword_groups, setFrom_keyword_groups] = useState([])
    const [keyword_use, setFrom_keyword_use] = useState("")
    const [video_append_id, set_video_append_id] = useState("")
    const [languages, set_languages] = useState({})
    const [language_code, set_language_code] = useState("en")

    const scheduler_action_lable = [
        "upload_video", "live_stream", "list_stream_stop", "create_playlist", "remove_playlist", "update_playlist"
    ]

    var get_keyword_groups = async (e) => {
        const res = await axiosClient({
            method: 'GET',
            url: '/youtube/keyword/group'
        });

        if (res.status == 400) {
			setError(res.response.data)
		};

        if (res.status == 200) {
			setFrom_keyword_groups(res.data.items)
            setFrom_keyword_use(res.data.items[0].group)
		}
    };

    var handle_search_query = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault(); 
        };

        var query = new URLSearchParams({
            page: page,
            limit: limitPage,
            email: query_ags_email,
            status: query_ags_status,
            utm_source: query_ags_utm_source,
            channel_id: query_ags_channel_id
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

    var handle_Effect_task = (e) => {
        setIds([]);
        let temp = [];
        $('tbody .form-check .form-check-input:checked').map((index, elm) => {
            temp.push($(elm).val())
        });
        setIds(temp);
        get_keyword_groups()
        
        // setFrom_scheduler_date_fixed(moment());
    };

    var handle_new_task_scheduler = async (e) => {
        var body = {
            "ids": ids,
            "object_model": "gmail",
            "scheduler_action": "login_gmail",
            "scheduler_date_type": "fixed",
            "scheduler_date_fixed": "2025-07-10 11:00:00",
            "scheduler_date_delay": "",
            "scheduler_date_range_min": "01:00:00",
            "scheduler_date_range_max": "20:00:00",
            "scheduler_data": {
                "is_proxy": 0,
                "proxy": {
                    "host": "",
                    "type": "http",
                    "username": "",
                    "password": ""
                }
            }
        };
        const res = await axiosClient({
            method: 'POST',
            url: '/task/scheduler/new',
            data: JSON.stringify(body)
        });
    };

    var handle_change_form_input = (e) => {
        let _name = $(e.target).attr("name");
        switch (_name) {
            case "scheduler_action":
                    setFrom_scheduler_action(e.target.value);
                break;
            case "scheduler_date_type":
                    setFrom_scheduler_date_type(e.target.value);
                break;
            case "scheduler_date_delay":
                    setFrom_scheduler_date_delay(e.target.value);
                break;
            case "scheduler_date_fixed":
                    setFrom_scheduler_date_fixed(e.target.value);
                break;
            case "scheduler_date_range_min":
                    setFrom_scheduler_date_range_min(e.target.value);
                break;
            case "scheduler_date_range_max":
                    setFrom_scheduler_date_range_max(e.target.value);
                break;
            case "keyword_use":
                    setFrom_keyword_use(e.target.value)
                break;
            case "video_append":
                    set_video_append_id(e.target.value)
                break;
            case "language_code":
                    set_language_code(e.target.value)
                break;
        }
    };

    var handle_load_langue = (e) => {
        $.ajax({
            url: "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0",
            headers: {
                "Ocp-Apim-Subscription-Key": "61b437a7ee644d939d2f6187c1909918"
            }
        }).then((e) => {
            set_languages(e.translation);
        });
    };

    var handle_submit_form_task = async (e) => {
        e.preventDefault(); 

        var body = {
            ids: ids,
            "object_model": "youtube_channel",
            "scheduler_action": scheduler_action,
            "scheduler_date_type": scheduler_date_type,
            "scheduler_date_fixed": scheduler_date_fixed,
            "scheduler_date_range_min": scheduler_date_range_min,
            "scheduler_date_range_max": scheduler_date_range_max,
            "scheduler_date_delay": scheduler_date_delay,
            "scheduler_data": { 
                "is_proxy": 0,
                "keyword_use": keyword_use,
                "video_append_id": video_append_id,
                "playlist_count": 10,
                "language_code": language_code
            }
        }

        const res = await axiosClient({
            method: 'POST',
            url: '/task/scheduler/new',
            data: JSON.stringify(body)
        });

        if (res.status == 400) {
			setError(res.response.data)
            toast.error("new task error")
		};

        if (res.status == 200) {
			toast.success("Done new Task")
		}
    };

    useEffect(() => {
        setError(null)
        handle_search_query()
    }, [page, query_ags_email, query_ags_status, query_ags_utm_source, query_ags_channel_id]);

    useEffect(() => {
        setError(null)
        handle_search_query();
        handle_load_langue();
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
                                <div class="col-4">
                                    <div class="position-relative">
                                        <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i class="ph ph-magnifying-glass"></i></button> 
                                        <input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Email..." value={query_ags_email} onChange={(e) => { setQuerySearchEmail(e.target.value) }} />
                                    </div>
                                </div>

                                <div class="col-4">
                                    <div class="position-relative">
                                        <input type="text" class="form-control ps-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill" placeholder="Channel ID..." value={query_ags_channel_id} onChange={(e) => { setQuerySearchChannelID(e.target.value) }} />
                                    </div>
                                </div>
                                
                                <div class="col-2">
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
                                            <button type="button" class="list-view-btn text-warning-600 text-2xl" title="Add Task Scheduler" onClick={handle_Effect_task} data-bs-toggle="modal" data-bs-target="#push_task_channel">
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
            <ModalTask_channel id="push_task_channel" title="Task Channel" body={ {
                    "ids": ids, 
                    "scheduler_action": scheduler_action, 
                    "scheduler_date_type": scheduler_date_type, 
                    "scheduler_date_delay": scheduler_date_delay,  
                    "scheduler_date_fixed": scheduler_date_fixed,  
                    "scheduler_date_range_min": scheduler_date_range_min,  
                    "scheduler_date_range_max": scheduler_date_range_max,
                    "scheduler_action_lable": scheduler_action_lable,
                    "keyword_groups": keyword_groups,
                    "keyword_use": keyword_use,
                    "video_append_id": video_append_id,
                    "languages": languages,
                    "language_code": language_code
                } } on_change={handle_change_form_input} on_submit={handle_submit_form_task}/>
		</div>
	</PrivateRoute>
  );
}

export default Youtube_channel_page;
