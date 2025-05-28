export const fetchWithAuth = async (url, options = {}, onUnauthorized) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401 && onUnauthorized) {
    onUnauthorized(); // 🔥 handle session expired
  }

  return res;
};
