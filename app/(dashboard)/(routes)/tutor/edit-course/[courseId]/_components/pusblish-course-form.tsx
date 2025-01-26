"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner";
import { useState } from "react"

const FormSchema = z.object({
    isPublished: z.boolean().default(false),
})

interface PublishFormProps {
    allowedToPublish: boolean;
    initialValue: boolean
}

export function PublishCourseForm({allowedToPublish, initialValue}: PublishFormProps) {
    const [currentState, setCurrentState] = useState(initialValue)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            isPublished: false,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // })
        toast.message(JSON.stringify(data, null, 2))
        setCurrentState(!currentState);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row items-center">
                <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-end space-x-2">
                            <FormLabel className="text-base">
                                {currentState ? 'Unpublish' : 'Publish'}
                            </FormLabel>
                            <FormControl>
                                <Switch
                                disabled={!allowedToPublish}
                                    type="submit"
                                    checked={currentState}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
