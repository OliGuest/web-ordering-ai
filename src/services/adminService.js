import { http } from "../utils/http";
import * as endpoints from "../global/constant";
import GetResources from "../data/getresources.json";
import DemoOrderResponse from "../data/demo-order-response.json";
import DemoHistoryResponse from "../data/demo-history-response.json";
import DemoServiceResponse from "../data/demo-service-response.json";

const isDemoMode = () => window.config?.APP_DEMO_MODE === true;

function buildQueryParams(path, deviceId, extras = {}) {
  const params = new URLSearchParams({
    tableNumber: path?.tableNumber ?? "",
    orderNumber: path?.orderNumber ?? "",
    validation: path?.validation ?? "",
    deviceSessionId: deviceId ?? "",
    ...extras,
  });
  return `?${params.toString()}`;
}

export const getResources = async (is_file = false) => {
  if (is_file || isDemoMode()) {
    return { data: GetResources };
  }
  return http.get(endpoints.GETRESOURCES).catch((err) => {
    console.error("[getResources]", err?.message);
    return undefined;
  });
};

export const getResourcesWithParams = async (path, deviceId) => {
  if (isDemoMode()) {
    return { data: GetResources };
  }
  const qs = buildQueryParams(path, deviceId);
  return http.get(`${endpoints.GETFULLRESOURCES}${qs}`).catch((err) => {
    console.error("[getResourcesWithParams]", err?.message);
    return undefined;
  });
};

export const postOrder = async (path, deviceId, data) => {
  if (isDemoMode()) {
    return { status: 200, data: DemoOrderResponse };
  }
  const qs = buildQueryParams(path, deviceId, {
    senderName: localStorage.getItem("username") ?? "",
  });
  return http.post(`${endpoints.CREATEORDER}${qs}`, data).catch((err) => {
    console.error("[postOrder]", err?.message);
    return undefined;
  });
};

export const postService = async (path, deviceId, data) => {
  if (isDemoMode()) {
    return { status: 200, data: DemoServiceResponse };
  }
  const qs = buildQueryParams(path, deviceId);
  return http.post(`${endpoints.SERVICEREQUEST}${qs}`, data).catch((err) => {
    console.error("[postService]", err?.message);
    return undefined;
  });
};

export const postPayWithPinService = async (path, deviceId) => {
  if (isDemoMode()) {
    return { status: 200, data: DemoServiceResponse };
  }
  const qs = buildQueryParams(path, deviceId);
  return http.post(`${endpoints.SERVICEPAYWITHPINREQUEST}${qs}`).catch((err) => {
    console.error("[postPayWithPinService]", err?.message);
    return undefined;
  });
};

export const postPayWithCashService = async (path, deviceId) => {
  if (isDemoMode()) {
    return { status: 200, data: DemoServiceResponse };
  }
  const qs = buildQueryParams(path, deviceId);
  return http.post(`${endpoints.SERVICEPAYWITHCASHREQUEST}${qs}`).catch((err) => {
    console.error("[postPayWithCashService]", err?.message);
    return undefined;
  });
};

export const postSignalR = async (data) => {
  if (isDemoMode()) {
    return { status: 200 };
  }
  return http.post(endpoints.ADDQUANTITYVIASIGNALR, data).catch((err) => {
    console.error("[postSignalR]", err?.message);
    return undefined;
  });
};

export const getOrderHistory = async (path, deviceId) => {
  if (isDemoMode()) {
    return { status: 200, data: DemoHistoryResponse };
  }
  const qs = buildQueryParams(path, deviceId);
  return http.get(`${endpoints.HISTORYORDERS}${qs}`).catch((err) => {
    console.error("[getOrderHistory]", err?.message);
    return undefined;
  });
};
