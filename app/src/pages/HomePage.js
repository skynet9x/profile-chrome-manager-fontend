import React, { createContext, useState } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'

function HomePage() {
  return (
	<PrivateRoute>
		<SideBar />
		<div class="dashboard-main-wrapper">
			<TopNavBar />

            <div class="dashboard-body">
                <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
                    <div class="breadcrumb mb-24">
                        <ul class="flex-align gap-4">
                            <li><span class="text-main-600 fw-normal text-15">dashboard</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            
		</div>
	</PrivateRoute>
  );
}

export default HomePage;
