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
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    isPublished: z.boolean().default(false),
})

interface PublishFormProps {
    allowedToPublish: boolean;
    initialValue: boolean,
    courseId: string
}

export function PublishCourseForm({allowedToPublish, initialValue, courseId}: PublishFormProps) {
    const [currentState, setCurrentState] = useState(initialValue)
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            isPublished: false,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch(`/api/courses/${courseId}`, { method: "PATCH", body: JSON.stringify({isPublished : data.isPublished}) });
            if (!response.ok) {
                const error = await response.text();
                toast.error('Fild uattenpt')
                throw new Error(response.status === 404
                    ? "Course not found. Please check the course ID."
                    : `Failed to update course: ${error}`);
            }
            // console.log(response.json())
            // const responseData = await response.json();
            // console.log(responseData)
            toast.success("Successfully aplied");
            setCurrentState(!currentState);
            router.refresh();
        } catch (error) {
            toast.error('Fild uattenpt')
            // console.error(error)
        }
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
