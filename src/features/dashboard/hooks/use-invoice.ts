import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient
} from '@tanstack/react-query';
import { createInvoice, deleteInvoice, findAllInvoices, findOneInvoice, updateInvoice } from '../services/invoice.service';
import type { Status } from '../lib/types/status.type';

export const useCreateInvoice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
    })
};

export const useFetchInvoices = (status?: Status) => {
  return useInfiniteQuery({
    queryKey: ['invoices', status] as [string, Status] ,
    initialPageParam: null,
    queryFn: findAllInvoices,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  })
};

export const useFetchInvoiceById = (id?: string) => {
  return useQuery({
    queryKey: ['invoices', id] as string[],
    queryFn: findOneInvoice,
    enabled: !!id,
  })
};

export const useUpdateInvoice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
    })
};

export const useDeleteInvoice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
    })
};