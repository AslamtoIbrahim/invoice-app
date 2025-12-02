import { BACKEND_URL } from '@/shared/lib/utils';
import axios from 'axios';
import type { InvoiceAxiosResponse, InvoiceCreate, InvoiceRead, InvoiceUpdate } from '../lib/types/invoice.types';
import type { Status } from '../lib/types/status.type';

export const createInvoice = async (invoice: InvoiceCreate) => {
    const res = await axios.post(`${BACKEND_URL}/invoice`, invoice, {
        withCredentials: true,
    })
    return res.data
};

export const findAllInvoices = async ({pageParam, queryKey}: {pageParam: string | null, queryKey: [string, Status]}) => {
    const [, status] = queryKey
    const res = await axios.get<InvoiceAxiosResponse>(`${BACKEND_URL}/invoice`, {
        params:{
            limit: 3,
            cursor: pageParam || null,
            status,
        },
        withCredentials: true,
    })
    return res.data
};

export const findOneInvoice = async ({queryKey}: {queryKey: string[]}) => {
    const [, id] = queryKey
    const res = await axios.get<InvoiceRead>(`${BACKEND_URL}/invoice/${id}`, {
        withCredentials: true,
    })
    return res.data
};

export const updateInvoice = async ({id, invoice}:{id: string, invoice: InvoiceUpdate}) => {
    const res = await axios.patch(`${BACKEND_URL}/invoice/${id}`, invoice, {
        withCredentials: true,
    })
    return res.data
};

export const deleteInvoice = async (id: string) => {
    const res = await axios.delete(`${BACKEND_URL}/invoice/${id}`, {
        withCredentials: true,
    })
    return res.data
};