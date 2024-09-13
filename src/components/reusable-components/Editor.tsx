import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

const fontSizes = ['small', false, 'large', 'huge'];
const fonts = ['Arial'];
// import { setContractEditor } from "@/components/services/redux/reducer/addcontracteditor";
var modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ header: ["Heading", 1, 2, 3, 4, 5, 6] }],
    [],
  ],
};
var formats = [
  "header",
  "height",
  "bold",
  "italic",
  "underline",
];
export default function Editor() {
  const dispatch = useDispatch();
  const [valuecontent, setvaluecontent] = useState();
//   console.log("Editor Content Entered new is ", imgcontent);
//   const handleProcedureContentChange = (content) => {
//     console.log("Editor Content image---->", imgcontent);
//     if (imgcontent !== null) {
//       console.log("this is edotor content",content)
//       setvaluecontent(content);
//       dispatch(setContractEditor(content));
//     } else {
//       setvaluecontent(content);
//       dispatch(setContractEditor(content));
//     }
//   };
//   useEffect(() => {
//     if (imgcontent !== null) {
//       setvaluecontent(imgcontent);
//       dispatch(setContractEditor(imgcontent));
//     }
//   }, [imgcontent]);
  return (
    <ReactQuill
      theme="snow"
      value={valuecontent}
    //   onChange={handleProcedureContentChange}
      modules={modules}
      formats={formats}
      placeholder="Enter Event Description"
      style={{ height: "100%", width: "940px" }}
       className="custom-quill w-full sm:w-3/4 md:w-[720px] lg:w-[940px]"
    />
  );
}