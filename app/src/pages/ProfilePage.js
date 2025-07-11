import React, { createContext, useState } from "react";
import PrivateRoute from '../components/PrivateRoute'
import SideBar from '../components/sideBar'
import TopNavBar from '../components/TopNavBar'

function ProfilePage() {
  return (
	<PrivateRoute>
		<SideBar />
		<div class="dashboard-main-wrapper">
			<TopNavBar />

            <div class="dashboard-body">
                <div class="card overflow-hidden">
                    <div class="card-body p-0">
                        <div class="cover-img position-relative">
                            <label for="coverImageUpload" class="btn border-gray-200 text-gray-200 fw-normal hover-bg-gray-400 rounded-pill py-4 px-14 position-absolute inset-block-start-0 inset-inline-end-0 mt-24 me-24">Edit Cover</label>
                            <div class="avatar-upload">
                                <input type='file' id="coverImageUpload" accept=".png, .jpg, .jpeg" />
                                <div class="avatar-preview">
                                    <div id="coverImagePreview" >
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <div class="setting-profile px-24">
                            <div class="flex-between">
                                <div class="d-flex align-items-end flex-wrap mb-32 gap-24">
                                    <img src="assets/images/thumbs/setting-profile-img.jpg" alt="" class="w-120 h-120 rounded-circle border border-white" />
                                    <div>
                                        <h4 class="mb-8">Mohid Khan</h4>
                                        <div class="setting-profile__infos flex-align flex-wrap gap-16">
                                            <div class="flex-align gap-6">
                                                <span class="text-gray-600 d-flex text-lg"><i class="ph ph-swatches"></i></span>
                                                <span class="text-gray-600 d-flex text-15">UX Designer</span>
                                            </div>
                                            <div class="flex-align gap-6">
                                                <span class="text-gray-600 d-flex text-lg"><i class="ph ph-map-pin"></i></span>
                                                <span class="text-gray-600 d-flex text-15">Sans Fransisco</span>
                                            </div>
                                            <div class="flex-align gap-6">
                                                <span class="text-gray-600 d-flex text-lg"><i class="ph ph-calendar-dots"></i></span>
                                                <span class="text-gray-600 d-flex text-15">Join August 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="nav common-tab style-two nav-pills mb-0" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-details-tab" data-bs-toggle="pill" data-bs-target="#pills-details" type="button" role="tab" aria-controls="pills-details" aria-selected="true">My Details</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-details" role="tabpanel" aria-labelledby="pills-details-tab" tabindex="0">
                        <div class="card mt-24">
                            <div class="card-header border-bottom">
                                <h4 class="mb-4">My Details</h4>
                            </div>
                            <div class="card-body">
                                <form action="#">
                                    <div class="row gy-4">
                                        <div class="col-sm-6 col-xs-6">
                                            <label for="fname" class="form-label mb-8 h6">First Name</label>
                                            <input type="text" class="form-control py-11" id="fname" placeholder="Enter First Name" />
                                        </div>
                                        <div class="col-sm-6 col-xs-6">
                                            <label for="lname" class="form-label mb-8 h6">Last Name</label>
                                            <input type="text" class="form-control py-11" id="lname" placeholder="Enter Last Name" />
                                        </div>
                                        <div class="col-sm-6 col-xs-6">
                                            <label for="email" class="form-label mb-8 h6">Email</label>
                                            <input type="email" class="form-control py-11" id="email" placeholder="Enter Email" />
                                        </div>
                                        <div class="col-12">
                                            <div class="flex-align justify-content-end gap-8">
                                                <button type="reset" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Cancel</button>
                                                <button type="submit" class="btn btn-main rounded-pill py-9">Save  Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="card mt-24">
                            <div class="card-header border-bottom">
                                <h4 class="mb-4">Password</h4>
                            </div>
                            <div class="card-body">
                                <form action="#">
                                    <div class="row gy-4">
                                        <div class="col-sm-6 col-xs-6">
                                            <label for="fname" class="form-label mb-8 h6">Password</label>
                                            <input type="password" class="form-control py-11" id="fname" />
                                        </div>
                                        <div class="col-sm-6 col-xs-6">
                                            <label for="lname" class="form-label mb-8 h6">Re-Password</label>
                                            <input type="password" class="form-control py-11" id="lname" />
                                        </div>
                                        <div class="col-12">
                                            <div class="flex-align justify-content-end gap-8">
                                                <button type="reset" class="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">Cancel</button>
                                                <button type="submit" class="btn btn-main rounded-pill py-9">Save  Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</PrivateRoute>
  );
}

export default ProfilePage;
