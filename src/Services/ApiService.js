import axios from "axios";

let Url = "http://localhost:4000/api";

const getCall = (url) => {
    return new Promise((resolve, reject) => {
        axios
            .get(Url + url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response) resolve(error.response.data);
            });
    });
};

const getUsers = () => {
    return getCall("/schedule/get_users");
};

const getTasks = () => {
    return getCall("/schedule/get_tasks");
};

export default {
    getUsers,
    getTasks
}