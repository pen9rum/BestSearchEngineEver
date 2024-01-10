import axios from 'axios';
import { HomePageLink } from './DTO/homePageLink';


export async function getHomePageLink() {
    try {
        const response = await axios({
            method: 'GET',  // 这里应该是字符串 'GET'
            url: `http://localhost:8080/api/nba/links`,
        });

        // 假设response.data是一个对象数组
        const res = response.data.map(item => new HomePageLink(item));
        console.log(res);
        return res;
    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
}

export async function searchFullname(name) {
    try {
        const response = await axios({
            method: 'POST',
            url: `http://localhost:8080/api/searchFullname`,
            headers: {
                'Content-Type': 'text/plain'
            },
            data: name
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
}

export async function searchGoogle(name) {
    try {
        console.log(name)
        const response = await axios({
            method: 'POST',
            url: `http://localhost:8080/api/searchGoogle`,
            headers: {
                'Content-Type': 'text/plain'
            },
            data: name
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
}

export async function searchStats() {
    try {
        const response = await axios({
            method: 'POST',
            url: `http://localhost:8080/api/searchStats`,
        });

        // 假设 response.data 包含所需的数据
        const data = response.data;

        console.log(data);
        return data;

    } catch (error) {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
}