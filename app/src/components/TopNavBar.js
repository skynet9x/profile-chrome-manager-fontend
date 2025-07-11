import { useEffect, useState } from "react";
import BtnLogout from '../components/btnLogout'
import axiosClient from "../api/axiosClient";
import { Link, useLocation } from "react-router-dom";

function TopNavBar() {
    const [error, SetError] = useState(false);
    const [user, SetUser] = useState({});
    var load_user = async () => {
        const res = await axiosClient({
            method: 'GET',
            url: '/user'
        });

        if (res.status == 400) {
            SetError(res.response.data)
        };

        if (res.status == 200) {
            SetUser(res.data.info)
        }
    }
    useEffect(() => {   
        load_user();
    }, []);


  return (
    <>
        <div class="top-navbar flex-between gap-16">
            <div class="flex-align gap-16">
            </div>

            <div class="flex-align gap-16">
                <div class="flex-align gap-8">
                </div>

                <div class="dropdown">
                    <button class="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="position-relative">
                            <img src="/images/user.png" alt="Image" class="h-32 w-32 rounded-circle" />
                            <span class="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0">
                            </span>
                        </span>
                        <span class="position-relative p-6">
                            {user.username}
                        </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                        <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                            <div class="card-body">
                                <div class="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                                    <img src="/images/user.png" alt="" class="w-54 h-54 rounded-circle" />
                                    <div class="">
                                        <h4 class="mb-0">{user.first_name} {user.last_name}</h4>
                                        <p class="fw-medium text-13 text-gray-200">{user.email}</p>
                                    </div>
                                </div>
                                <ul class="max-h-270 pe-4">
                                    <li class="pt-8 ">
                                        <Link to="/profile" className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-gear"></i></span>
                                            <span class="text">Account Settings</span>
                                        </Link>
                                    </li>
                                    <li class="pt-8 ">
                                        <BtnLogout />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
  );
}

export default TopNavBar;