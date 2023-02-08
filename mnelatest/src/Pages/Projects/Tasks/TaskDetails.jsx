import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import GetSingleMilestoneAction from '../../../Redux/Actions/Milestones/GetSingleMilestone'
import moment from 'moment'
import { Avatar, Box, Grid, ListItem, ListItemAvatar, ListItemText, Tab, Tabs } from '@mui/material'
import image from "../../../Assets/custom/4.png"
import image1 from "../../../Assets/custom/user1.png"
import image2 from "../../../Assets/custom/user2.png"
import image3 from "../../../Assets/custom/user3.png"
import CreateMarkup from '../../../Utils/Components/ckeditorr'
import TabPanel from '../../../Utils/Components/TabPanel'
import { DateRange, Money } from '@mui/icons-material'
import PropTypes from "prop-types";
import a11yProps from '../../../Utils/Components/TabPanelAllyProp'
import TasksTable from '../Tasks/TasksTable'
import GetSingleTaskAction from '../../../Redux/Actions/Task/GetSingleTask'
import Activities from './TaskActivities'
import ActivitiesTable from '../Activities/ActivitiesTable'



TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

export default function TaskDetails() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch()
    const { id, milestoneId ,taskId} = useParams()
    const task = useSelector(state => state.task.data) ?? {}
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    console.log("taskRR",task)
    useEffect(() => {
        dispatch(GetSingleTaskAction(taskId))
        
    }, [])
    return (
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-8">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card overflow-hidden">
                           
                            <div>
                                <>
                                    <div class="row border-bottom pb-5">
                                        <div class="col-xl-12 col-lg-12">
                                            <div class="p-1">
                                                <h4 class="fs-32 font-w700">{task.title}</h4>
                                                <span class="mb-2 d-block">Created  on {moment(task.created_at).format('MMMM DD YYYY')}</span>
                                                <p class={task.status == "incomplete" ? "text-warning" : task.status == "completed" ? "text-suucess" : "text-danger"}>{task.status}</p>
                                                <div class="workload-button">
                                                    <Tabs
                                                        value={value}
                                                        onChange={handleChange}
                                                        indicatorColor="primary"
                                                        textColor="primary"
                                                        variant={"scrollable"}
                                                        scrollButtons="auto"
                                                        aria-label="scrollable auto tabs example"
                                                    >
                                                        <Tab label="OverView" {...a11yProps(0)} style={{ minWidth: "20%" }} />
                                                        <Tab label="Activities" {...a11yProps(1)} style={{ minWidth: "20%" }} />
                                                        {/* <Tab label="Tasks2" {...a11yProps(2)} style={{ minWidth: "20%" }} /> */}
                                                    </Tabs>
                                                    <TabPanel value={value} index={0}>
                                                        <>
                                                            <div class="project-description p-2">
                                                                <span class="fs-18 font-w500 mb-3 d-block">Task Description</span>

                                                                <p dangerouslySetInnerHTML={CreateMarkup(task?.description==null?"Not Added":task?.description)} />
                                                                {/* <p class={milestone.status=="incomplete"?"text-warning":milestone.status=="completed"?"text-suucess":"text-danger"}>{milestone.status}</p> */}
                                                            </div>

                                                            <div class="project-description">
                                                                {/* <span class="fs-18 font-w500 mb-3 d-block text-capitalize">Project Members</span> */}
                                                                <Grid container spacing={2}>

                                                                    <Grid item xs={12} sm={6}>

                                                                        <ListItem>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <DateRange color="success" />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Start Date" secondary={moment(task.start_date).format('MMMM DD YYYY')} />
                                                                        </ListItem>
                                                                        <ListItem>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <DateRange color="secondary" />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Due Date" secondary={moment(task.end_date).format('MMMM DD YYYY')} />
                                                                        </ListItem>



                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>

                                                                        <ListItem>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <Money color="success" />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Amount Spent" secondary={task.actual_cost == null ? `0` : task.actual_cost} />
                                                                        </ListItem>
                                                                        <ListItem>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    <Money color="secondary" />
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary="Estimated  Cost" secondary={task.estimated_cost} />
                                                                        </ListItem>
                                                                    </Grid>

                                                                </Grid>


                                                            </div>
                                                            <div className='project-description'>
                                                            <Activities mid={milestoneId}/>
                                                            </div>

                                                        </>
                                                    </TabPanel>
                                                    <TabPanel value={value} index={1}>

                                                        <ActivitiesTable/>
                                                    </TabPanel>
                                                    {/* <TabPanel value={value} index={2}>

                                                        <TasksTable  />
                                                    </TabPanel> */}


                                                </div>

                                            </div>
                                        </div>

                                    </div>



                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4">
                <div class=" col-xs-12 col-md-12 ">
                    <div class="card">
                        <div class="card-body px-4">
                            <h4 class="fs-18 font-w600 mb-5 text-nowrap">Completion Percentage</h4>
                            <div class="progress default-progress">
                                <div class="progress-bar progress-animated" style={{ width: `${task.completion_percent}==null?0:${task.completion_percent}`, height: "10px" }} role="progressbar">
                                    <span class="sr-only">{task.completion_percent==null?0:task.completion_percent} % Complete</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-end mt-1 justify-content-between">
                                <span><small class="text-primary">{task.completion_percent==null?0:task.completion_percent}</small> % Completed</span>
                                {/* <h4 class="mb-0 fs-32 font-w800">42</h4> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" col-xs-12 col-md-12 ">
                    <div class="card">
                        <div class="card-body d-flex px-4  justify-content-between">
                            <div>
                                <div class="">
                                    <h2 class="fs-32 font-w700">0</h2>
                                    <span class="fs-18 font-w500 d-block">Completed Activities</span>
                                    {/* <span class="d-block fs-16 font-w400">
                                        <small class="text-danger">-2%</small> than last month</span> */}
                                </div>
                            </div>
                            <div id="NewCustomers"></div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="card-body d-flex px-4 pb-0 justify-content-between">
                        <div>
                            <h4 class="fs-18 font-w600 mb-4 text-nowrap">Activities Completed</h4>
                            <div class="d-flex align-items-center">
                                <h2 class="fs-32 font-w700 mb-0">15</h2>
                                <span class="d-block ms-4">
                                    <svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z" fill="#09BD3C" />
                                    </svg>
                                    <small class="d-block fs-16 font-w400 text-success">+0,5%</small>
                                </span>
                            </div>
                        </div>
                        <div class="bg-gradient1 rounded text-center p-3">
                            <div class="d-inline-block position-relative donut-chart-sale mb-3">
                                <span class="donut1" data-peity='{ "fill": ["var(--primary)", "rgba(238, 238, 237, 1)"],   "innerRadius": 33, "radius": 10}'>5/8</span>
                                <small class="text-primary">71%</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
