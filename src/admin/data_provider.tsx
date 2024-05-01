// src/dataProvider.ts
import axios from "axios";
import { fetchUtils } from "react-admin";
import { toast } from "react-toastify";

interface GetListParams {
  pagination: { page: number; perPage: number };
  sort: { field: string; order: string };
  filter: Record<string, any>;
}

interface GetOneParams {
  id: string | number;
}

interface UpdateParams {
  id: string | number;
  data: any;
}

interface CreateParams {
  data: any;
}

interface DeleteParams {
  id: string | number;
}

interface IdParams {
  ids: (string | number)[]; // Allow both strings and numbers
}

interface GetManyReferenceParams extends GetListParams {
  target: string;
  id: string | number; // id can also be string or number
}

const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_URL + "/admin/" ||
    "http://localhost:8080/admin/",
  withCredentials: true,
});

const dataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };

    const url = `${resource}?${fetchUtils.queryParameters(query)}`;

    const { data, headers } = await axiosInstance.get(url);
    console.log(
      data.map((item: any) => ({
        ...item,
        id: item.ID !== undefined ? item.ID : item.id,
      }))
    );
    return {
      data: data.map((item: any) => ({
        ...item,
        id: item.ID !== undefined ? item.ID : item.id,
      })),
      total: parseInt(headers["content-range"].split("/").pop(), 10),
    };
  },
  getOne: async (resource: string, params: GetOneParams) => {
    const { data } = await axiosInstance.get(`/${resource}/${params.id}`);
    return {
      data: { ...data, id: data.ID },
    };
  },
  getMany: async (resource: string, params: IdParams) => {
    const url = `${resource}?${fetchUtils.queryParameters({
      filter: JSON.stringify({ id: params.ids }),
    })}`;
    const { data } = await axiosInstance.get(url);
    return {
      data: data.map((item: any) => ({ ...item, id: item.ID })),
    };
  },
  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { target, id } = params;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({ [target]: id, ...params.filter }),
    };
    const url = `${resource}?${fetchUtils.queryParameters(query)}`;
    const { data, headers } = await axiosInstance.get(url);
    return {
      data: data.map((item: any) => ({ ...item, id: item.ID })),
      total: parseInt(headers["content-range"].split("/").pop(), 10),
    };
  },
  update: async (resource: string, params: UpdateParams) => {
    const { data } = await axiosInstance.put(
      `/${resource}/${params.id}`,
      params.data
    );
    return {
      data: { ...data, id: data.ID },
    };
  },
  updateMany: async (
    resource: string,
    params: { ids: IdParams["ids"]; data: any }
  ) => {
    const promises = params.ids.map((id) =>
      axiosInstance.put(`/${resource}/${id}`, params.data)
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
  create: async (resource: string, params: CreateParams) => {
    try {
      console.log(params.data);
      const { data } = await axiosInstance.post(`/${resource}`, params.data);
      return {
        data: { ...data, id: data.ID },
      };
    } catch (error: any) {
      console.error(error.response.data || error.message);
    }
  },
  delete: async (resource: string, params: DeleteParams) => {
    await axiosInstance.delete(`/${resource}/${params.id}`);
    return { data: { id: params.id } };
  },
  deleteMany: async (resource: string, params: IdParams) => {
    const promises = params.ids.map((id) =>
      axiosInstance.delete(`/${resource}/${id}`)
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
};

export default dataProvider;
