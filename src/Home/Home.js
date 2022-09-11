import React, { useEffect, useState } from 'react';
import './Home.css';
import SelectCompoent from '../Components/SelectCompoent/SelectCompoent';
import ApiService from '../Services/ApiService';

const Home = () => {

    let disTottalLength = 200;
    const [tasks, setTasks] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [newTask, setNewTask] = useState({
        discription: '',
        exp_date: '',
        user: 'select',
        isImportant: true
    })

    useEffect(() => {
        fetchAllTasks();
    }, [])

    useEffect(() => {
        getAlertOfImportantEvents();
    }, [tasks])


    const handleChnageNewTask = (key, val) => {
        setNewTask({ ...newTask, [key]: val });
    }

    const handleSubmit = () => {
        if (!newTask.discription) {
            alert("ERROR Discription Cannot Be empty")
        } else if (!newTask.exp_date) {
            alert("ERROR Please select the Expiry Date")
        } else if (newTask.user == 'select') {
            alert("ERROR Please select the User")
        } else {
            alert("SUCCSESS Valid Input")
        }
    }

    const handleDisVal = (event) => {
        if (event.target.value.length <= disTottalLength) {
            handleChnageNewTask('discription', event.target.value)
        }
    }

    const fetchAllTasks = async () => {
        let result = await ApiService.getTasks();
        if (result.code == 200) {
            setTasks(result.data);
        } else {
            alert("Something went Wrong")
        }
    }

    const getAlertOfImportantEvents = () => {
        if (!showMessage && tasks.length > 0) {
            tasks.map(e => {
                if (e.Important) {
                    alert(`IMPORTANT TASK ${e.Task}`)
                }
            })
            setShowMessage(true);
        }
    }

    const normalFlag = (type) => {
        return (
            !type ?
                <svg
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-flag-fill falg-heighlight" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                </svg>
                : <svg
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-flag-fill falg-heighlight" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                </svg>
        )
    }

    return (
        <div className='home-contianer'>
            <div className='heading-contianer'>
                <h3>User Tasks</h3>
            </div>
            <div className='add-task-contianer'>
                <div>
                    <input
                        value={newTask.discription}
                        onChange={handleDisVal}
                        type="text"
                        className='dis-input'
                        placeholder='Task Description' />
                    <div className='dis-inout-bottom-contianer'>
                        <span>Task</span>
                        <span>{newTask.discription.length}/{disTottalLength}</span>
                    </div>
                </div>
                <div>
                    <input
                        onChange={(e) => handleChnageNewTask('exp_date', e.target.value)}
                        type="date"
                        className='date-input ' />
                    <div className='font-size-rep'>Expiry Date</div>
                </div>
                <div>
                    <SelectCompoent
                        value={newTask.user}
                        onChange={(e) => handleChnageNewTask('user', e.target.value)}
                    />
                    <div className='font-size-rep'>Users</div>
                </div>
                <div>
                    <span onClick={() => handleChnageNewTask('isImportant', !newTask.isImportant)}>
                        {
                            normalFlag(newTask.isImportant)
                        }
                    </span>
                    <div className='font-size-rep'>Important</div>
                </div>
                <div>
                    <button className='submit-button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className='table-container'>
                <table className='table-element'>
                    <tr>
                        <th>Task</th>
                        <th>Expiry Date</th>
                        <th>Users</th>
                        <th>Important</th>
                        <th>Action</th>
                    </tr>

                    {
                        tasks.map((e, i) => {
                            return (
                                <tr key={i} className='table-row'>
                                    <td>{e.Task}</td>
                                    <td>{e.Expiry_date}</td>
                                    <td>
                                        <SelectCompoent value={e.User} />
                                    </td>
                                    <td>
                                        {
                                            normalFlag(e.Important)
                                        }
                                    </td>
                                    <td>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill delete-icon" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
        </div>
    )
}

export default Home