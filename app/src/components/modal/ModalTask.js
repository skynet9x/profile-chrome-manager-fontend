import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

function ModalTask(props) {
	var  secondsToTime = (seconds) => {
			const hours = Math.floor(seconds / 3600);
			const minutes = Math.floor((seconds % 3600) / 60);
			const secs = seconds % 60;

			return [
				hours.toString().padStart(2, '0'),
				minutes.toString().padStart(2, '0'),
				secs.toString().padStart(2, '0'),
			].join(':');
		}
  return (<>
		<div class="modal" tabindex="-1" id={props.id}>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="card">
						<div class="card-header">
							<h5 class="text-gray">{props.title}</h5>
						</div>
						<div class="card-body">
							<form action="" onSubmit={props.on_submit}>
								<div class="row gy-20">
									<div class="col-12">
										<div class="row g-20">
											<div class="col-sm-12">
												<label for="courseTitle" class="h5 mb-8 fw-semibold font-heading">Selected Email <span class="text-13 text-gray-400 fw-medium">(Required)</span> </label>
												<div class="position-relative">
													<input type="text" disabled class="text-counter placeholder-13 form-control py-11 pe-76" maxlength="100" id="courseTitle" placeholder="selected Items" />
													<div class="text-gray-400 position-absolute inset-inline-end-0 top-50 translate-middle-y me-16">
														<span id="current">{ props.body.ids.length }</span>
														<span id="maximum">/ 50</span>
													</div>
												</div>
											</div>
											
											<div class="col-sm-6">
												<label for="courseLevel" class="h5 mb-8 fw-semibold font-heading">Scheduler action</label>
												<div class="position-relative">
													<select class="form-select py-9 placeholder-13 text-15" name="scheduler_action" value={ props.body.scheduler_action } onChange={ props.on_change }>
														<option value="interact">Interact</option>
														<option value="login_gmail">Login gmail</option>
														<option value="load_channel_info">Load channel</option>
													</select>                                            
												</div>
											</div>

											<div class="col-sm-6">
												<label for="courseCategory" class="h5 mb-8 fw-semibold font-heading">Date type</label>
												<div class="position-relative">
													<select name="scheduler_date_type" class="form-select py-9 placeholder-13 text-15" value={ props.body.scheduler_date_type } onChange={ props.on_change }>
														<option value="delay">Delay Loop</option>
														<option value="fixed">Date Fixed</option>
														<option value="random">Range Time</option>
													</select>  
												</div>
											</div>

											{ props.body.scheduler_date_type == "delay" ? (
												<div class="col-sm-6">
													<label for="courseTime" class="h5 mb-8 fw-semibold font-heading">Delay</label>
													<div class="position-relative">
														<input type="number" class="text-counter placeholder-13 form-control py-11" name="scheduler_date_delay" value={ props.body.scheduler_date_delay } onChange={ props.on_change }/>
													</div>
												</div>
											) : "" }

											{ props.body.scheduler_date_type == "fixed" ? (
												<div class="col-sm-6">
													<label for="courseLesson" class="h5 mb-8 fw-semibold font-heading">Datetime</label>
													<div class="position-relative">
														<input type="text" class="text-counter placeholder-13 form-control py-11" name="scheduler_date_fixed" value={ props.body.scheduler_date_fixed } onChange={ props.on_change }/>
													</div>
												</div>
											) : "" }

											{ props.body.scheduler_date_type == "random" ? (
												<>
													<div class="col-sm-6">
														<label for="courseTime" class="h5 mb-8 fw-semibold font-heading">Time Start</label>
														<div class="position-relative">
															<input type="text" class="text-counter placeholder-13 form-control py-11" name="scheduler_date_range_min" value={ props.body.scheduler_date_range_min } onChange={ props.on_change }/>
														</div>
													</div>
													
													<div class="col-sm-6">
														<label for="courseTime" class="h5 mb-8 fw-semibold font-heading">Time End</label>
														<div class="position-relative">
															<input type="text" class="text-counter placeholder-13 form-control py-11" name="scheduler_date_range_max" value={ props.body.scheduler_date_range_max } onChange={ props.on_change }/>
														</div>
													</div>
												</>
											) : "" }
											
										</div>
									</div>
									<div class="flex-align justify-content-end gap-8">
										<button type="button" class="btn btn-outline-main rounded-pill py-9" data-bs-dismiss="modal">Cancel</button>
										<button type="submit" class="btn btn-main rounded-pill py-9">Creater</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</>); 
}

export default ModalTask;
