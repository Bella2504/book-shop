import axios from "axios";
import { useEffect, useState } from "react";

interface AxiosPayload {
  url: string;
  payload?: Object;
  method?: string;
}
export const useAxios = ({
  url,
  payload = Object,
  method = "get",
}: AxiosPayload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios(url, {
          method,
          ...payload,
        });

        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [data, error, loading];
};
