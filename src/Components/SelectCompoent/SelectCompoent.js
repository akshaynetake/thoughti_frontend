import React, { useEffect, useState } from 'react';
import './SelectCompoent.css';

import ApiService from '../../Services/ApiService';

const SelectCompoent = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        let result = await ApiService.getUsers();
        if (result.code == '200') {
            setUsers(result.data);
        } else {
            alert("Something went Wrong");
        }
    }

    return (
        <select onChange={(e) => { props.onChange(e) }} value={props.value} className='select-dropdown'>
            <option value={'select'}>Select</option>

            {
                users.map(e => {
                    return (
                        <option key={e} value={e}>{e}</option>
                    )
                })
            }

        </select>
    )
}

export default SelectCompoent