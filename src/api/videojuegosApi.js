import { api } from './axiosInstance'

const RECURSO = '/videojuegos'

export const getAll = (signal) =>
  api.get(RECURSO, { signal }).then((r) => r.data)

export const getById = (id, signal) =>
  api.get(`${RECURSO}/${id}`, { signal }).then((r) => r.data)

export const create = (data) =>
  api.post(RECURSO, data).then((r) => r.data)

export const update = (id, data) =>
  api.put(`${RECURSO}/${id}`, data).then((r) => r.data)

export const remove = (id) =>
  api.delete(`${RECURSO}/${id}`).then((r) => r.data)
