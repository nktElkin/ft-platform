'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title of course sould be at least 2 character.",
    }),
})


export default function CreateCoursePage() {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const { isSubmitting, isValid } = form.formState;

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // sending the created one to the api as api/course/{values}
            toast.success("Success", {
                cancel: {
                    label: 'Undo',
                    onClick() {
                        console.log("undo course creating with titile: ", values);
                    },
                    actionButtonStyle: {},
                }
            });
            // // router.push(`/tutor/overview/{response.data.id}`);
        } catch (error) {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            toast.error("Failed to create course");
            console.error(error);
        }

    }

    return (
        <div className="flex flex-col w-full items-center h-full gap-y-10">
            <div className="">
                <div className="">
                    <h1 className="">New course</h1>
                    <p className="">It's easy to create new course, we'll help you. <br /> Just fill out a form. Let's do it!</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course title</FormLabel>
                                <FormControl>
                                    <Input placeholder="My new course title" {...field} disabled={isSubmitting} />
                                </FormControl>
                                <FormDescription>
                                    This is the public information.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    <div className="flex gap-x-4">
                        <Link href="/">
                            <Button type="button" variant="secondary">Back</Button>
                        </Link>
                        <Button type="submit" className="disable" disabled={!isValid || isSubmitting}>Submit</Button>
                    </div>
                </form>
            </Form>
        </div>

    );
};