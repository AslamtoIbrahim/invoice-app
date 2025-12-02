import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/auth/components/ui/card";
import { Field } from "@/features/auth/components/ui/field";
import { Input } from "@/features/auth/components/ui/input";
import { Label } from "@/features/auth/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon, CircleXIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useCreateInvoice, useUpdateInvoice } from "../hooks/use-invoice";
import { InvoiceFormSchema } from "../lib/schemas/invoice.schema";
import type { InvoiceField, InvoiceRead } from "../lib/types/invoice.types";
import type { Status } from "../lib/types/status.type";
import { fixPrice, generateInvoiceCode } from "../lib/utils/utils";

type FormInvoiceProps = React.ComponentProps<'div'> & {
  className?: string;
  onCloseFormInvoice?: () => void;
  updateInvocie?: InvoiceRead;
}


function InvoiceForm({ className, onCloseFormInvoice, updateInvocie, ...props }: FormInvoiceProps) {
  const [defaulStatus, setDefaulStatus] = useState<Status>("PENDING");
  const [loading, setLoading] = useState(false);
  const createInvoice = useCreateInvoice()
  const updateInvoice = useUpdateInvoice()
  const form = useForm<InvoiceField>({
    resolver: zodResolver(InvoiceFormSchema),
  });

  const watchItems = form.watch('items');

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  useEffect(() => {
    if (updateInvocie) {
      form.reset({
        ...updateInvocie,
        date: updateInvocie ? new Date(updateInvocie.date) : undefined,
        paymentTerm: String(updateInvocie.paymentTerm) || '2'
      })
    }
  }, [updateInvocie]);

  function onSubmit(data: InvoiceField) {
    setLoading(true)
    console.log('🤑 defaulStatus: ', defaulStatus);
    console.log('😍 data: ', data);
    console.log('🥩 terms: ', addDays(data.date, Number(data.paymentTerm)));
    const updatedInvoices = {
      ...data,
      status: defaulStatus,
    }
    if (updateInvocie?.id) {
      updateInvoice.mutate({ id: updateInvocie.id, invoice: updatedInvoices }, {
        onSuccess(inv) {
          console.log('msg', inv);
          setLoading(false)
          onCloseFormInvoice?.();
        }
      })
      return
    }

    const newInvoice = {
      ...data,
      status: defaulStatus,
      code: generateInvoiceCode()
    }
    createInvoice.mutate(newInvoice, {
      onSuccess(inv) {
        console.log('msg', inv);
        setLoading(false)
        onCloseFormInvoice?.();
      }
    })
  }

  function handleRestForm() {
    form.reset();
    onCloseFormInvoice?.();
  }

  return <div className={cn('fixed inset-0 z-50  md:mr-20 shadow-md rounded-tr-2xl ', className)} {...props}>
    <Card className="bg-background h-full overflow-auto md:p-8">

      <CardHeader>
        <CardTitle>{updateInvocie ? <>Update <span className="text-primary">#</span> {updateInvocie.code}</> : "Create"} Invoice</CardTitle>
        <CardDescription>
          Enter the billing details for the sender and the client.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="invoice-form" onSubmit={form.handleSubmit(onSubmit)}>
          <CardTitle className="text-primary">Bill From</CardTitle>
          <div className="flex flex-wrap gap-y-4 gap-x-2 my-2 mb-6 ">
            <Controller
              name="billFrom.street"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Street Address</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billFrom.street"
                    placeholder="9 Union Terrace" />
                </Field>
              )}
            />
            <Controller
              name="billFrom.city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Label>City</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billFrom.city"
                    placeholder="New York" />
                </Field>
              )}
            />
            <Controller
              name="billFrom.postCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Label>Post Code</Label>
                  <Input {...field}
                    type="number"
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billFrom.postCode"
                    placeholder="10001" />
                </Field>
              )}
            />

            <Controller
              name="billFrom.country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Country</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billFrom.country"
                    placeholder="United States" />
                </Field>
              )}
            />
          </div>

          <CardTitle className="text-primary ">Bill To</CardTitle>

          <div className="flex flex-wrap gap-y-4 gap-x-2 my-4 ">
            <Controller
              name="billTo.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Client's Name</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billTo.name"
                    placeholder="John Doe" />
                </Field>
              )}
            />
            <Controller
              name="billTo.email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Client's Email</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billTo.email"
                    placeholder="john.doe@example.com" />
                </Field>
              )}
            />
            <Controller
              name="billTo.street"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Street Address</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billTo.street"
                    placeholder="9 Union Terrace" />
                </Field>
              )}
            />
            <Controller

              name="billTo.city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Label>City</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billTo.city"
                    placeholder="New York" />
                </Field>
              )}
            />
            <Controller
              name="billTo.postCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Label>Post Code</Label>
                  <Input {...field}
                    type="number"
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billTo.postCode"
                    placeholder="18888" />
                </Field>
              )}
            />

            <Controller
              name="billTo.country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Country</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="billTo.country"
                    placeholder="United Kingdom" />
                </Field>
              )}
            />
          </div>
          <div className="flex flex-wrap gap-y-4 gap-x-2 my-8">

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <Label>Invoice Date</Label>
                  <Popover >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        aria-invalid={fieldState.invalid}
                      >
                        <CalendarIcon />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value} onSelect={(date) => field.onChange(date)} required />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />

            <Controller
              name="paymentTerm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <Label>Payment Terms</Label>
                  <Select
                    name={field.name}
                    value={field.value}
                    defaultValue={updateInvocie ? updateInvocie.paymentTerm : '1'}
                    onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select Net Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Net 1 Day</SelectItem>
                      <SelectItem value="7">Net 7 Days</SelectItem>
                      <SelectItem value="14">Net 14 Days</SelectItem>
                      <SelectItem value="30">Net 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label>Description</Label>
                  <Input {...field}
                    className="placeholder-shown:text-sm"
                    aria-invalid={fieldState.invalid}
                    id="description"
                    placeholder="e.g. Graphic Design Service" />
                </Field>
              )}
            />

          </div>
          <CardTitle className="text-primary">Items</CardTitle>
          <div className="gap-y-4 gap-x-2 my-4">

            {
              fields.map((item, index) => (
                <div key={item._tempId} className="flex flex-wrap items-center justify-around gap-4 mb-4 relative">
                  <Controller
                    name={`items.${index}.name`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="w-full md:w-auto" >
                        <Label>Name</Label>
                        <Input {...field}
                          className="placeholder-shown:text-sm text-sm"
                          id={`items.${index}.name`}
                          placeholder="Laptop" />
                      </Field>
                    )}
                  />
                  <Controller
                    name={`items.${index}.qty`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="flex-1" >
                        <Label>Qty.</Label>
                        <Input {...field}
                          className="placeholder-shown:text-sm text-sm"
                          id={`items.${index}.qty`}
                          type="number"
                          placeholder="1" />

                      </Field>
                    )}
                  />
                  <Controller
                    name={`items.${index}.price`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="flex-1" >
                        <Label>Price</Label>
                        <Input {...field}
                          className="placeholder-shown:text-sm text-sm"
                          id={`itmes.${index}.price`}
                          type="number"
                          placeholder="000.0" />
                      </Field>
                    )}
                  />

                  <div className="flex-1 space-y-3">
                    <Label>Total</Label>
                    <p className="py-1.5 truncate max-w-20 md:max-w-32 lg:max-w-38 text-sm bg-popover px-1.5 rounded text-center">£{fixPrice((Number(watchItems?.[index]?.qty) || 0) * (Number(watchItems?.[index]?.price) || 0))}</p>
                  </div>

                  {fields.length > 1 && <CircleXIcon
                    onClick={() => { remove(index); form.trigger('items'); }}
                    className="text-foreground/50 shrink-0 mt-5 absolute right-0 size-5 -top-6  lg:top-2 hover:text-red-400 cursor-pointer"
                  />}

                </div>

              ))
            }

            {
              form.formState.errors.items && (
                <p className="text-red-400 text-sm">
                  {form.formState.errors.items.message}
                </p>
              )
            }

            <Button
              variant={'outline'}
              type="button"
              onClick={() =>
                append({
                  _tempId: crypto.randomUUID(),
                  name: '',
                  qty: '',
                  price: '',
                })
              }
              className="w-full"
            >
              <Plus className="size-4" />
              Add Item
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="md:flex gap-1 md:gap-2 md:justify-end" >
        <Field className="w-fit text-xs md:mr-auto">
          <Button
            disabled={loading}
            variant={'outline'}
            form="invoice-form"
            type="button"
            onClick={handleRestForm}
          >
            Disard
          </Button>
        </Field>

        <Field className="w-23 md:w-fit text-xs">
          <Button
            disabled={loading}
            className=" text-xs bg-popover "
            form="invoice-form"
            type="submit"
            onClick={() => setDefaulStatus('DRAFT')}
          >
            Save as Draft
          </Button>
        </Field>
        <Field className="w-23 md:w-fit text-xs">
          <Button
            disabled={loading}
            form="invoice-form"
            type="submit"
            onClick={() => setDefaulStatus('PENDING')}
          >
            {updateInvocie ? "Update" : "Save & Send"}
          </Button>
        </Field>

      </CardFooter>
    </Card>
  </div>
}


export default InvoiceForm;