const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axoisClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function getCategories() {
  return (await axoisClient.get("/categories?populate=*")).data;
}

export async function getDoctors() {
  return (await axoisClient.get("/doctors?populate=*")).data;
}

export async function getDoctorsByCategory(category) {
  return (
    await axoisClient.get(
      `/doctors?filters[categories][Name][$in]=${category}&populate=*`
    )
  ).data;
}

export async function getDoctorInfo(id) {
  return (await axoisClient.get(`/doctors/${id}?populate=*`)).data;
}

export async function BookAppointment(data) {
  return (await axoisClient.post(`/appointments`, data)).data;
}
