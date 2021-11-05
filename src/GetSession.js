const id = localStorage.getItem("id");
const role = localStorage.getItem("role");
const data = localStorage.getItem("data")


export default {
    id: id,
    role: role,
    data: JSON.parse(data)
}