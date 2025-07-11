import React, { createContext, useState, useEffect } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'
import ModalTask from '../components/modal/ModalTask'

import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import $ from 'jquery';

function GmailPage() {
    const [emails, setEmails] = useState([]);
    const [status, setStatus] = useState({
        "error_timeout_captcha": 0,
        "live": 0,
        "none": 0,
        "none_login_driver": 0,
        "not_exist_email": 0,
        "pending": 0,
        "phone_very": 0,
        "wrong_password": 0
    });

    const [lable_status, setLableStatus] = useState({
        "error_timeout_captcha": 0,
        "live": 0,
        "none": 0,
        "none_login_driver": 0,
        "not_exist_email": 0,
        "pending": 0,
        "phone_very": 0,
        "wrong_password": 0
    });
    const [total, setTotal] = useState(0);
    const [ids, setIds] = useState([]);
    const [query_total, setQueryTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [limitPage, setLimitPage] = useState(50);

    const [query_ags_email, setQuerySearchEmail] = useState("")
    const [query_ags_status, setQuerySearchStatus] = useState("")
    const [query_ags_utm_source, setQuerySearchUtmsource] = useState("")

    const [scheduler_action, setFrom_scheduler_action] = useState("")
    const [scheduler_date_type, setFrom_scheduler_date_type] = useState("fixed")
    const [scheduler_date_fixed, setFrom_scheduler_date_fixed] = useState(moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"))
    const [scheduler_date_delay, setFrom_scheduler_date_delay] = useState(600)
    const [scheduler_date_range_min, setFrom_scheduler_date_range_min] = useState(0)
    const [scheduler_date_range_max, setFrom_scheduler_date_range_max] = useState(86400 - 1)

    var timeToSeconds = (timeStr) => {
        const [h, m, s] = timeStr.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    }

    var getLableStatus = async () => {
        var query = new URLSearchParams({
            page: page,
            limit: limitPage,
            email: query_ags_email,
            status: query_ags_status,
            utm_source: query_ags_utm_source
        }).toString();
        const res = await axiosClient({
            method: 'GET',
            url: '/email/lable?'+ query
        });

        if (res.status == 400) {
			setError(res.response.data)
		};

        if (res.status == 200) {
            setStatus(res.data.status)
            setTotal(res.data.total)
            let _temp = {
                "error_timeout_captcha": 0,
                "live": 0,
                "none": 0,
                "none_login_driver": 0,
                "not_exist_email": 0,
                "pending": 0,
                "phone_very": 0,
                "wrong_password": 0
            }
            Object.entries(res.data.status).map((key, index) => {
                _temp[key[0]] = key[1];
            });

            setLableStatus(_temp);
		}
    };

    var getData = async () => {
        var query = new URLSearchParams({
            page: page,
            limit: limitPage,
            email: query_ags_email,
            status: query_ags_status,
            utm_source: query_ags_utm_source
        }).toString();
        const res = await axiosClient({
            method: 'GET',
            url: '/email/?'+ query
        });

        if (res.status == 400) {
			setError(res.response.data)
		};

        if (res.status == 200) {
			setEmails(res.data.items)
            setQueryTotal(res.data.total)
		}

        $('#selectAll').on('change', function () {
            $('.form-check .form-check-input').prop('checked', $(this).prop('checked')); 
        }); 
    };

    var handle_to_clipboard = (e) => {
        console.log(e.target);
        navigator.clipboard.writeText($(e.target).attr('data-text'))
        .then(() => {
            toast.success("Copied to clipboard!")
        })
        .catch(err => {
            toast.error("Copied to clipboard!")
        });
    };

    var handle_search_query = (e) => {
        if (e.preventDefault) {
            e.preventDefault(); 
        };
        getData();
        getLableStatus();
    };

    var handle_Effect_task = (e) => {
        setIds([]);
        let temp = [];
        $('tbody .form-check .form-check-input:checked').map((index, elm) => {
            temp.push($(elm).val())
        });
        setIds(temp);
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
        }
    };

    var handle_submit_form_task = async (e) => {
        e.preventDefault(); 

        var body = {
            ids: ids,
            "object_model": "gmail",
            "scheduler_action": scheduler_action,
            "scheduler_date_type": scheduler_date_type,
            "scheduler_date_fixed": scheduler_date_fixed,
            "scheduler_date_range_min": scheduler_date_range_min,
            "scheduler_date_range_max": scheduler_date_range_max,
            "scheduler_date_delay": scheduler_date_delay,
            "scheduler_data": { "is_proxy": 0 }
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
    }

    useEffect(() => {
        setError(null);
        getLableStatus();
        getData();
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
                                <li><span class="text-main-600 fw-normal text-15">Gmail</span></li>
                            </ul>
                        </div>
                    </div>

                    <div class="row gy-4">
                        <div class="col-xxl-3 col-sm-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h4 class="mb-2">{total}</h4>
                                    <span class="text-gray-600">Email Total</span>
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
                        <div class="col-xxl-6 col-sm-12">
                            <div class="card h-100">
                                <div class="card-body">
                                    <div class="flex-between gap-8 flex-wrap mt-20">
                                        { Object.entries(status).map((key, index) => (
                                            <div class="flex-align flex-column" key={key[0]}>
                                                <h6 class="mb-0"> {key[1]} </h6>
                                                <span class="text-13 my-4 text-main-600" lable-status={key[0]} >{key[0]}</span>
                                            </div>
                                        ))}
                                    </div>
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
                                                 
                                                <button type="button" class="list-view-btn text-warning-600 text-2xl" onClick={handle_Effect_task} title="Add Task Scheduler" data-bs-toggle="modal" data-bs-target="#push_task_email">
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
                            <table id="table_email_data" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="fixed-width">
                                            <div class="form-check">
                                                <input class="form-check-input border-gray-200 rounded-4" type="checkbox" id="selectAll" />
                                            </div>
                                        </th>
                                        <th class="h6 text-gray-300">Email</th>
                                        <th class="h6 text-gray-300">Password</th>
                                        <th class="h6 text-gray-300">Recover</th>
                                        <th class="h6 text-gray-300">2FA</th>
                                        <th class="h6 text-gray-300">Status</th>
                                        <th class="h6 text-gray-300">Utm Source</th>
                                        <th class="h6 text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emails.map((item) => (
                                        <tr>
                                            <td class="fixed-width">
                                                <div class="form-check">
                                                    <input class="form-check-input border-gray-200 rounded-4" value={item.id} type="checkbox" />
                                                </div>
                                            </td>
                                            <td>
                                                <div class="flex-align gap-8">
                                                    <span class="h6 mb-0 fw-medium text-gray-300" data-text={ item.email }  onClick={ handle_to_clipboard }>{item.email} 
                                                        </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="h6 mb-0 fw-medium text-gray-300 text-password" data-text={ item.password } onClick={ handle_to_clipboard }>
                                                    **********  </span>
                                            </td>
                                            <td>
                                                <span class="h6 mb-0 fw-medium text-gray-300" data-text={ item.recover }  onClick={ handle_to_clipboard }>{item.recover} </span>
                                            </td>
                                            <td>
                                                <span class="h6 mb-0 fw-medium text-gray-300" data-text={ item._2fa }  onClick={ handle_to_clipboard }>{item._2fa} </span>
                                            </td>
                                            <td>
                                                <span class="text-13 py-2 px-8 bg-teal-50 text-teal-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                                    <span class="w-6 h-6 bg-teal-600 rounded-circle flex-shrink-0"></span>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="h6 mb-0 fw-medium text-gray-300" data-text={ item.utm_source }   onClick={ handle_to_clipboard } >
                                                    {item.utm_source} 
                                                    
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
                            <span class="text-gray-900">Showing { (page-1)*limitPage } to { ((page-1)*limitPage) + limitPage } of {query_total} entries</span>
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

            <ModalTask id="push_task_email" title="Task Email" body={ {
                    "ids": ids, 
                    "scheduler_action": scheduler_action, 
                    "scheduler_date_type": scheduler_date_type, 
                    "scheduler_date_delay": scheduler_date_delay,  
                    "scheduler_date_fixed": scheduler_date_fixed,  
                    "scheduler_date_range_min": scheduler_date_range_min,  
                    "scheduler_date_range_max": scheduler_date_range_max,
                } } on_change={handle_change_form_input} on_submit={handle_submit_form_task}/>
        </PrivateRoute>
    );
}

export default GmailPage;
