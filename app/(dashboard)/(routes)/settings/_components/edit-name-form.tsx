"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import InputCover from "@/components/ui/input-cover";
import { User } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
    }),
    story: z.string().min(2, {
      message: "Story must be at least 2 characters",
    }),
  });



type FormValues = z.infer<typeof formSchema>;

const EditUserDataForm = ({ currentUser }: {currentUser:User}) => {
  const router = useRouter();
  const {name, id} = currentUser;
  const story = currentUser.story || "";
  const image = currentUser.image || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      story: story || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
      });
      // dev dev dev dev dev dev dev dev
      console.log(response);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(
          response.status === 404
            ? "User not found. Please contact administrator."
            : `Failed to chnage name: ${error}`,
        );
      }
      toast.success("Successfully changed");
    } catch (error) {
      toast.error(`Failed attempt`);
      // console.error(error)
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Label className="">User name</Label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="User name (public information)"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <Label className="">User story</Label>
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                    className="h-fit"
                      placeholder="User story (public information, optional)"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mr-2 font-semibold"
              type="reset"
              onClick={() => form.reset()}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting || !form.formState.isDirty}>
              {isSubmitting ? "Loading..." : "Apply"}
            </Button>
            {/* <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? "Bulishing" : `${initials.isPublished? 'To draft' : 'Publish now'}` }</Button> */}
          </form>
        </Form>
    </div>
  );
};

export default EditUserDataForm;
