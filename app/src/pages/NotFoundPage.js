import React, { createContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function NotFoundPage() {
  return (
	<div class="dashboard-main-wrapper">
		<div class="dashboard-body">
			<div class="mb-20 flex-between flex-wrap gap-8">
				<Link to="/" className="text-gray-300 text-20">go to Home</Link>
			</div>

			<div class="mb-20">
				<div class="col-xxl-3 col-lg-4 col-sm-6">
					<div class="card ">
						<div class="card-body p-8">
							Error: page empty
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  );
}

export default NotFoundPage;
