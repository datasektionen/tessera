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

function convertKeysAndParseDates<T>(
  response: AxiosResponse<T>
): AxiosResponse<T> {
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

    // Map of old keys to new keys
    const keysToConvert: { [key in keyof ConvertibleKeys]: string } = {
      created_at: "created_at",
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
          }
          delete obj[originalKey];
        }
      }
    );
  }

  // Start the recursive conversion from the response.data
  try {
    recursiveConvert(response.data);
  } catch (error: any) {
    console.log(error);
    toast.error(
      "An error occurred while parsing the response, contact support"
    );
  }

  return response;
}

export function fetchApi<T extends { [key: string]: any }>(
  endpoint: string
): Promise<AxiosResponse<T>> {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
      withCredentials: true,
    })
    .then(convertKeysAndParseDates);
}
