import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const FileUpload = ({ message }) => {
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [cid, setCid] = useState("");
  // Upload file to Pinata via your backend endpoint
  const uploadToIPFS = async () => {
    // if (!message) return;

    // Create JSON content and wrap it in a file object
    const jsonData = JSON.stringify({ message });
    const blob = new Blob([jsonData], { type: "application/json" });
    const file = new File([blob], "ai-generated-content.json");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call your backend endpoint that handles Pinata upload
      const response = await axios.post("https://b5a7-2409-4060-20b-95d3-fd67-7e87-be1b-bced.ngrok-free.app/upload-file", { file: formData }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const cid = response.data.cid;
      setCid(cid)
      console.log("Response: " + cid)
      alert(cid)
      return cid;
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
  };

  // Save file details (including the user's CID and URL) into your database
  const saveFileDetails = async (data) => {
    try {
      await axios.post(`https://b5a7-2409-4060-20b-95d3-fd67-7e87-be1b-bced.ngrok-free.app/get-file?fileHash=${cid}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("File details saved to the database.");
    } catch (error) {
      console.error("Error saving file details to database:", error);
    }
  };

  // Handle the complete upload: first send to IPFS, then save to DB
  const handleUpload = async () => {
    const result = await uploadToIPFS();
    if (result) {
      await saveFileDetails({
        cid: result.cid,
        url: result.url,
        message,
        // userId  // Pass the current user's id if required by your schema
      });
    }
  };

  return (
    <div>
      <Button
        onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white p-6"
      >
        Upload Content to IPFS
      </Button>
      {ipfsUrl && (
        <p>
          Content stored at:{" "}
          <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
            {ipfsUrl}
          </a>
        </p>
      )}
      {/* {ipfsUrl && <p>Content stored at: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a></p>} */}
    </div>
  );
};

export default FileUpload;