'use client';
import MDEditor from "@uiw/react-md-editor";

// If link is video, render iframe in the center with video player; else render normal link

// const TextView = ({text}:{text:string}) => {
//     return (
//         <MDEditor.Markdown 
//             source={text} 
//             style={{ 
//                 whiteSpace: 'pre-wrap',
//                 color: '#333', 
//                 backgroundColor: 'transparent',
//             }}
//             components={{
//                 img: ({ ...props }) => (
//                     <div style={{ display: 'flex', justifyContent: 'center' }}>
//                         <img {...props} />
//                     </div>
//                 ),
//                 a: ({ ...props }) => (
//                     <a {...props} target="_blank" rel="noopener noreferrer" />
//                 ),
//             }}
//         />
//     );
// }
 
// export default TextView;



const TextView = ({text}:{text:string}) => {
    return (
        <MDEditor.Markdown 
            source={text} 
            style={{ 
                whiteSpace: 'pre-wrap',
                color: '#111', 
                backgroundColor: 'transparent',
            }}
            components={{
                img: ({ ...props }) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img {...props} />
                    </div>
                ),
                a: ({ ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
            }}
        />
    );
}
 
export default TextView;

