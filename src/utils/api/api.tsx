import { parseISO } from "date-fns";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface ConvertibleKeys {
  created_at?: string;
  CreatedAt?: string;
  DeletedAt?: string | null;
  ID?: number;
  UpdatedAt?: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message: string;
}

function convertKeysAndParseDates<T>(response: ApiResponse<T>): ApiResponse<T> {
  // Recursive function to handle objects and arrays
  function recursiveConvert(obj: any): void {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // Check if the value is an object or an array and recursively call if necessary
      if (value && typeof value === "object") {
        if (Array.isArray(value)) {
          value.forEach((item) => recursiveConvert(item));
        } else {
          recursiveConvert(value);
        }
      }
    });

    const dateKeys = [
      "open",
      "close",
      "date",
      "end_date",
      "payment_deadline",
      "payed_at",
    ];

    // Map of old keys to new keys
    const keysToConvert: { [key: string]: string } = {
      CreatedAt: "created_at",
      DeletedAt: "deleted_at",
      ID: "id",
      UpdatedAt: "updated_at",
    };

    // Convert keys in the current object level
    (Object.keys(keysToConvert) as Array<keyof typeof keysToConvert>).forEach(
      (originalKey) => {
        if (obj.hasOwnProperty(originalKey)) {
          const newKey = keysToConvert[originalKey];
          if (originalKey === "ID") {
            obj[newKey!] = obj[originalKey];
          } else if (obj[originalKey] != null) {
            // Make sure the date is not null before parsing
            obj[newKey!] = parseISO(obj[originalKey]);
          } else if (dateKeys.includes(originalKey as string)) {
            obj[newKey!] = parseISO(obj[originalKey]);
          }
          delete obj[originalKey];
        }
      }
    );
  }

  // Start the recursive conversion from the response.data
  try {
    if (!response.data) {
      return response;
    }

    recursiveConvert(response.data);
  } catch (error: any) {
    console.error("An error occurred while parsing the response:", error);
    toast.error(
      "An error occurred while parsing the response, contact support"
    );
  }

  return response;
}

export { convertKeysAndParseDates };

export function fetchApi<T>(
  endpoint: string,
  withCredentials: boolean = true,
  fullUrl: boolean = false
): Promise<ApiResponse<T>> {
  // Note the change here to return ApiResponse<T>
  const url = fullUrl
    ? endpoint
    : `${process.env.REACT_APP_BACKEND_URL}${endpoint}`;

  return axios
    .get(url, {
      withCredentials,
    })
    .then((response: AxiosResponse<ApiResponse<T>>) => response.data) // Accessing the data property directly
    .then(convertKeysAndParseDates); // Assuming this function can handle ApiResponse<T>
}

export function postApi<T>(
  endpoint: string,
  data: any,
  withCredentials: boolean = true,
  fullUrl: boolean = false
): Promise<ApiResponse<T>> {
  let url = endpoint;
  if (!fullUrl) {
    url = `${process.env.REACT_APP_BACKEND_URL}${endpoint}`;
  }
  return axios
    .post<ApiResponse<T>>(url, data, {
      withCredentials,
    })
    .then((response) => response.data) // Directly returning ApiResponse<T>
    .then(convertKeysAndParseDates);
}

export function putApi<T>(
  url: string,
  data: any,
  withCredentials: boolean = true,
  fullUrl: boolean = false
): Promise<ApiResponse<T>> {
  const useUrl = fullUrl ? url : `${process.env.REACT_APP_BACKEND_URL}${url}`;

  return axios
    .put<ApiResponse<T>>(useUrl, data, {
      withCredentials,
    })
    .then((response) => response.data) // Directly returning ApiResponse<T>
    .then(convertKeysAndParseDates);
}

export function deleteApi<T>(
  endpoint: string,
  withCredentials: boolean = true,
  fullUrl: boolean = false
): Promise<ApiResponse<T>> {
  const url = `${process.env.REACT_APP_BACKEND_URL}${endpoint}`;
  return axios
    .delete<ApiResponse<T>>(url, {
      withCredentials,
    })
    .then((response) => response.data) // Directly returning ApiResponse<T>
    .then(convertKeysAndParseDates);
}
