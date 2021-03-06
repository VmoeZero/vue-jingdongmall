import axios from "../utils/axios";

export function addAddress(params) {
    return axios.post('/address', params);
}

export function EditAddress(params) {
    return axios.delete('/address',params);
}

export function DeleteAddress(id) {
    return axios.get(`/address/${id}`);
}

export function getDefaultAddress() {
    return axios.get('/address/default');
}

export function getAddressList() {
    return axios.get('/address', { pageNumber: 1, pageSize:1000 })
}

export function getAddressDetail(id) {
    return axios.get(`/address/${id}`)
}