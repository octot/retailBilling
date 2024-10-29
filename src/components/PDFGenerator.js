import React, { useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import axios from "axios";
import {
  WhatsAppIcon,
  GmailIcon,
  TelegramIcon,
  CloseIcon,
  ShareIcon,
} from "./icons";
import { URI } from "./CONSTANTS";
const PDFGenerator = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [shareUrl, setShareUrl] = useState(""); // State to hold the shareable URL
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  // Create a PDF document
  const MyDocument = () => (
    <Document>
      <Page>
        <View>
          <Text>{name}</Text>
          <Text>{data}</Text>
        </View>
      </Page>
    </Document>
  );

  const generateAndUploadPDF = async () => {
    // Generate PDF Blob
    const blob = await pdf(<MyDocument />).toBlob();

    // Create formData with the blob to upload
    const formData = new FormData();
    formData.append("pdf", blob, `${name}.pdf`);
    // console.log('formData ', formData)
    // Upload PDF to backend
    try {
      const response = await axios.post(`${URI}/pdf/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Get the shareable URL from the backend response
      setShareUrl(response.data.shareUrl);
      // console.log('PDF generated and shareable URL:', response.data.shareUrl);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  // Handle PDF sharing on social platforms
  const sharePDF = (platform) => {
    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "gmail":
        shareLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Check%20out%20this%20PDF&body=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "telegram":
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      default:
        console.error("Unsupported platform");
        return;
    }
    window.open(shareLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter content"
      />
      <button onClick={generateAndUploadPDF}>Generate & Upload PDF</button>

      {/* Show the PDF viewer */}
      <PDFViewer width="600" height="400">
        <MyDocument />
      </PDFViewer>

      {/* Display shareable URL */}
      {shareUrl && (
        <div>
          <button onClick={togglePopup}>
            <ShareIcon />
          </button>
          {isPopupVisible && (
            <div className="popup">
              <button onClick={togglePopup}>
                <CloseIcon />
              </button>
              <div className="popup-content">
                <button onClick={() => sharePDF("whatsapp")}>
                  <WhatsAppIcon />
                </button>
                <button onClick={() => sharePDF("gmail")}>
                  <GmailIcon />
                </button>
                <button onClick={() => sharePDF("telegram")}>
                  <TelegramIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFGenerator;
