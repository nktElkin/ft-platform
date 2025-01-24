'use client';
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const TextEditSection = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (newValue: string | undefined) => {
        setIsLoading(true);
        setValue(newValue ? newValue : '');
        setIsLoading(false);
    };




    return (
      
            <MDEditor
            className='col-span-2'
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                preview='edit'
                textareaProps={{
                    placeholder: 'Please enter Markdown text',
                }}
                value={value}
                onChange={handleChange}
            />
            // <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap', color: '#333', backgroundColor: 'transparent' }}/>    

        //   {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
        // {/* <div className="bg-slate-50"><h1>in</h1>
        // <textarea name="textIn" id="mkdIn"></textarea>
        // </div>
        // <div className="bg-slate-50"><h1>out</h1>
        // {text}
        // </div> */}
        // {/* <section className="grid grid-cols-2 gap-4">
        //         </section> */}
    );
}

export default TextEditSection; 