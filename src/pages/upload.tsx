import { FileUpload } from "~/components/file-upload";
import { useNavigate } from "react-router";
export function Upload() {
  const navigate = useNavigate();

  const handleFileChange = (files: File[]) => {
    navigate(`/preview?file=${files[0].name}`);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white/60 border-neutral-200 rounded-lg">
        <FileUpload onChange={handleFileChange} />
      </div>
    </div>
  )
}