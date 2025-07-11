import React, { createContext, useState } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'

function TaskPage() {
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
                            <li><span class="text-main-600 fw-normal text-15">Task</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            
		</div>
	</PrivateRoute>
  );
}

export default TaskPage;
