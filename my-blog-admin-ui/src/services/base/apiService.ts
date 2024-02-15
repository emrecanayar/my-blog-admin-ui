import axios from "axios";

const BASE_URL = "https://localhost:7265/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error("Ağ hatası veya yanıt yok"));
    }
    const { data } = error.response;

    let customError = {
      generalMessage: "Beklenmeyen bir hata oluştu.",
      validationErrors: null,
      status: data.Status,
    };


    switch (data.Status) {
      case 400: // Validation veya Business Logic Error
        if (data.Errors) {
          // Validation Error
          customError.generalMessage = "Doğrulama hataları mevcut.";
          customError.validationErrors = data.Errors;
        } else if (data.Title === "Rule violation") {
          // Business Logic Error
          customError.generalMessage = data.Detail || "İş kuralları ihlali.";
        }
        break;
      case 401: // Authorization Error
        customError.generalMessage = data.Detail || "Yetkilendirme hatası.";
        window.location.href = "/login";
        break;
      case 404: // Not Found Error
        customError.generalMessage = data.Detail || "Kaynak bulunamadı.";
        break;
      case 500: // Internal Server Error
        customError.generalMessage = "Sunucu hatası.";
        break;
    }

    // Bu noktada, tanımlanmış özel durumlar dışında bir hata varsa
    return Promise.reject(customError);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Tokenı al
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Header'a ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  get: (url: string) => apiClient.get(url).then((response) => response.data),

  post: (url: string, data: any) =>
    apiClient.post(url, data).then((response) => response.data),

  put: (url: string, data: any) =>
    apiClient.put(url, data).then((response) => response.data),

  delete: (url: string) =>
    apiClient.delete(url).then((response) => response.data),

    postFormData: (url: string, formData: FormData) =>
    apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => response.data),
};

export default apiService;
