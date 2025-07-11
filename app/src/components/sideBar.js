import React, { createContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import img_con_1 from '../../src/assets/images/img_con_1.png';

function SideBar() {
	const location = useLocation();
  	return (
	<aside class="sidebar">
		<button type="button" class="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"><i class="ph ph-x"></i></button>
		<Link to="/" className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10">
			<img src={img_con_1} alt="Logo" />
		</Link>

		<div class="sidebar-menu-wrapper overflow-y-auto scroll-sm">
			<div class="p-20 pt-10">
				<ul class="sidebar-menu">
					<li className={ (location.pathname == "/") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-squares-four"></i></span>
							<span class="text">Dashboard</span>
						</Link>
						
					</li>

					<li className={ (location.pathname == "/gmail") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>

						<Link to="/gmail" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-users-three"></i></span>
							<span class="text">Gmail</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/youtube/keywords") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/youtube/keywords" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-key"></i></span>
							<span class="text">Youtube keywords</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/youtube/analytic") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/youtube/analytic" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-chart-line-up"></i></span>
							<span class="text">Youtube analytic</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/youtube") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/youtube" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-youtube-logo"></i></span>
							<span class="text">Youtube</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/youtube/video") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/youtube/video" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-file-video"></i></span>
							<span class="text">Youtube video</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/scheduler") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/scheduler" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-calendar"></i></span>
							<span class="text">Scheduler</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/tasks") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/tasks" className="sidebar-menu__link">
							<span class="icon"><i class="ph  ph-list-numbers"></i></span>
							<span class="text">Tasks</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/drives") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/drives" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-hard-drives"></i></span>
							<span class="text">Drives</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/proxy") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/proxy" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-clipboard-text"></i></span>
							<span class="text">Proxy</span>
						</Link>
					</li>

					<li className={ (location.pathname == "/api/seting") ? "sidebar-menu__item activePage" : "sidebar-menu__item" }>
						<Link to="/api/seting" className="sidebar-menu__link">
							<span class="icon"><i class="ph ph-gear"></i></span>
							<span class="text">Api seting</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</aside>
  	);
}

export default SideBar;
