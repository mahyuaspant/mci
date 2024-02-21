import Editor from "react-simple-wysiwyg";

export default function TextEditor({ html, setHtml }) {
  function onChange(e) {
    setHtml(e.target.value);
  }
  return (
    <div className="w-full bg-white ">
      <Editor
        defaultValue={html}
        value={html}
        onChange={onChange}
        className="cursor-pointer  h-full w-full"
      />
    </div>
  );
}
