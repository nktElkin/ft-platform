"use client";

import { Button } from "@/components/ui/button"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { SelectBox } from "@/components/ui/selectbox";

const formSchema = z.object({
    categoryId: z.string().min(2)
})

type FormValues = z.infer<typeof formSchema>

interface CourseCreationFormProps {
    initials: any,
    courseId: string,
    categories: {label: string; value: string}[];
    defaultCategory : string
  }

const EditCategoryForm = ({initials, courseId, categories, defaultCategory}: CourseCreationFormProps) => {
    const [isEditigin, setIsEditing] = useState(false);
    const router = useRouter();

    function editMode() {
        setIsEditing((cur) => !cur);
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initials?.categotyId || '',
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: FormValues) => {
        values = { ...initials, ...values }
        console.log(values)
        try {
            const response = await fetch(`/api/courses/${courseId}`, { method: "PATCH", body: JSON.stringify(values) });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(response.status === 404
                    ? "Course not found. Please check the course ID."
                    : `Failed to update course: ${error}`);
            }
            const responseData = await response.json();
            console.log(responseData)
            toast.success("Successfully aplied");
        } catch (error) {
            toast.error('Fild uattenpt')
            console.error(error)
        }
        router.refresh();
    }

console.log()

    return (
        <div className="flex flex-col space-y-7">
            <Label className="">Course category</Label>
            {!isEditigin &&
                <>
                    <div aria-roledescription="field value"
                        className="overflow-hidden h-9 flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm">
                        {defaultCategory || 'Not selected category yet'}
                    </div>
                    <Button className="w-fit" type="submit" onClick={editMode}>Edit</Button>
                </>
            }
            {isEditigin &&
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                    <SelectBox list={categories} {...field} defaultValue={defaultCategory}/>
                                        {/* <Textarea placeholder="Enter course description" {...field}  disabled={isSubmitting}/> */}
                                        {/* <Input placeholder="Enter course description" {...field} disabled={isSubmitting} /> */}
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="mr-2 font-semibold" type="reset" onClick={editMode} variant='outline'>Cancel</Button>
                        <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Loading...' : 'Apply'}</Button>
                        {/* <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? "Bulishing" : `${initials.isPublished? 'To draft' : 'Publish now'}` }</Button> */}
                    </form>
                </Form>
            }
        </div>
    );
}

export default EditCategoryForm;