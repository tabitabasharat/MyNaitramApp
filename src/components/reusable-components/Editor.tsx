import { Content } from "@radix-ui/react-popover";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

const fontSizes = ["small", false, "large", "huge"];
const fonts = ["Arial"];
// import { setContractEditor } from "@/components/services/redux/reducer/addcontracteditor";
var modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ header: ["Heading", 1, 2, 3, 4, 5, 6] }],
    [],
  ],
};
var formats = ["header", "height", "bold", "italic", "underline"];

interface EditorProps {
  onChange: (content: string) => void;
  value?: string; // Define prop type for onChange
}

const Editor: React.FC<EditorProps> = ({ onChange,value }) => {
  // Function to handle content change in the editor
  const handleEditorChange = (content: string) => {
    console.log("my content ", content)
    if (onChange) {
      onChange(content); // Call the onChange prop if it exists
    }
  };

  return(
  <ReactQuill
    onChange={handleEditorChange}
    theme="snow"
   value={value}
    // onChange = {onContentChange}
    modules={modules}
    formats={formats}
    placeholder="Enter Event Description"
    style={{ height: "100%", width: "100%" }}
    className="custom-quill w-full 
    placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  sm:w-3/4 md:w-[720px] lg:w-[940px] overflow-hidden no-scrollbar"
  />
  );
};

export default Editor;
