/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

import * as api from "../utils/requests";
import * as constant from "../global/constant";
import GetResources from "../data/getresources.json";

export const getResources = async (is_file = false) => {
  if (is_file) {
    return { data: GetResources };
  }

  return await api
    .getReq(constant.GETRESOURCES)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

///

export const postOrder = async (path, deviceId, data) => {
  return await api
    .PostReq(
      `api/CreateOrder?tableNumber=${path?.tableNumber}&tableCode=${path?.tableCode}&orderNumber=${path?.orderNumber}&orderCode=${path?.orderCode}&validation=${path?.validation}&deviceSessionId=${deviceId}`,
      data
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const postService = async (path, deviceId, data) => {
  return await api
    .PostReq(
      `api/ServiceRequest?tableNumber=${path?.tableNumber}&tableCode=${path?.tableCode}&orderNumber=${path?.orderNumber}&orderCode=${path?.orderCode}&validation=${path?.validation}&deviceSessionId=${deviceId}`,
      data
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

// export const postHistory = async (path,deviceId,data) => {
//   return await api
//     .PostReq(`/api/ServiceRequest${path}&deviceSessionId=${deviceId}`,data)
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {});
// };

export const getServiceRequeat = async (data) => {
  return await api
    .PostReq(constant.GETSERVICEREQUEST, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};

export const getOrderHistory = async (path, deviceId) => {
  return await api
    .getReq(
      `api/HistoryOrders?tableNumber=${path?.tableNumber}&tableCode=${path?.tableCode}&orderNumber=${path?.orderNumber}&orderCode=${path?.orderCode}&validation=${path?.validation}&deviceSessionId=${deviceId}`
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {});
};
