import { useEffect, useState } from "react";
import {
  WhatsAppIcon,
  GmailIcon,
  TelegramIcon,
  CloseIcon,
  ShareIcon,
} from "./icons";
import { PDFViewer } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import PDfReport from "../components/pdfReport";
import {
  orderBulletPoints,
  itemsToParts,
  getCustomerInfo,
  getShipmentInfo,
  getGstList,
  getGstTotalList,
  getGstTotalFinalListMap,
  getGstCellContainerValueMap,
  getPaymentDetails,
} from "../Utils/pdfUtil";
import { Dialog } from "@mui/material";
import BulletPoints from "../components/bulletPoints";
import PaymentDetails from "../components/PaymentDetails";
import "../componentStyles/PdfReportData.css";
import axios from "axios";
import { URI } from "./CONSTANTS";
import { StyledButton } from "./StyleButton";
import AddIcon from "@mui/icons-material/Add";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using react-icons for the eye icon
const PdfReportData = ({
  invoiceType,
  invoiceDate,
  dueDate,
  discountAmount,
  formatDate,
  items,
  customerDetails,
  date,
  shipmentDetails,
  gstTotalValues,
  billNo,
}) => {
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const togglePdfVisibility = () => {
    setIsPdfVisible(!isPdfVisible);
  };
  // const [image, setImage] = useState(null);
  const itemsInPiecesList = itemsToParts(items, 10);
  const customerInfo = getCustomerInfo(customerDetails, date);
  const shipmentInfo = getShipmentInfo(shipmentDetails, date);
  const gstList = getGstList();
  const gstTotalList = getGstTotalList();
  const gstTotalFInalListMap = getGstTotalFinalListMap();
  const gstCellContainerValueMap = getGstCellContainerValueMap();
  const [paymentDetails, setPaymentDetails] = useState({
    accountName: "Your Account Name",
    accountNumber: "123456789012",
    bankName: "Your Bank Name",
    gpayNumber: "9876543210",
  });

  const [inputText, setInputText] = useState("");
  const [bulletPoints, setBulletPoints] = useState([
    "All taxes are calculated based on the current tax laws and regulations.",
    "The customer is responsible for any additional taxes or fees that may apply.",
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [isbulletPointsVisible, setBulletPointsVisible] = useState(false);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);
  const [myCompany, setMyCompany] = useState([]);
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch(`${URI}/getCompany`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setMyCompany(data);
      } catch (error) {
        console.error("Error in fetchCompanyInfo:", error);
      }
    };
    fetchCompanyInfo();
  }, []);
  // console.log("myCompany", myCompany);
  const handleBulletPointsOpen = () => {
    setBulletPointsVisible(true);
  };
  const handleBulletPointsClose = () => {
    setBulletPointsVisible(false);
  };
  const handlePaymentDetailsOpen = () => {
    setPaymentDetailsOpen(true);
  };
  const handlePaymentDetailsClose = () => {
    setPaymentDetailsOpen(false);
  };
  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const paymentDetailsInfo = getPaymentDetails(paymentDetails);
  // // console.log("paymentDetail s1111", paymentDetails);
  const combinedDataOfCustShipItemBill = {
    items: items,
    customerDetails: customerDetails,
    date: date,
    shipmentDetails: shipmentDetails,
    gstTotalValues: gstTotalValues,
    billNo: billNo,
  };
  const setCustShipItemBillDetails = async () => {
    try {
      // Ensure URI is defined
      if (!URI) {
        throw new Error("URI is not defined");
      }
      const response = await fetch(`${URI}/setCustShipItemBillDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedDataOfCustShipItemBill),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      // Parse and return the response data
      const data = await response.json();
      console.log("custShipItemBillDetailsData", data);
      return data;
    } catch (err) {
      // Differentiate between network and server errors
      if (err.name === "TypeError") {
        console.error("Network error: Failed to fetch data", err);
      } else {
        console.error(
          "Failed to fetch data from setCustShipItemBillDetails",
          err
        );
      }
      throw err; // Re-throw the error to be handled by the caller
    }
  };

  const generateBillNumber = async () => {
    try {
      const responseOfGeneratedBillNumber = await fetch(
        `${URI}/nextBillNumber`
      );
      if (!responseOfGeneratedBillNumber.ok) {
        throw new Error("Could not generateBillNumber");
      }
      const generatedBillNumber = await responseOfGeneratedBillNumber.json();
      return generatedBillNumber.billNumber;
    } catch (error) {
      throw new Error("Failed to fetch data from generateAPI ", error);
    }
  };
  const [shareUrl, setShareUrl] = useState(""); // State to hold the shareable URL
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
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
  const downloadPdfDocument = async () => {
    try {
      if (!billNo) {
        billNo = await generateBillNumber();
        // // console.log("billNo", billNo);
      }
      if (!billNo) {
        throw new Error("Failed to generate bill number");
      }
      const pdfBlob = await pdf(
        <PDfReport
          myCompany={myCompany}
          shipmentDetails={shipmentDetails}
          itemsInPiecesList={itemsInPiecesList}
          // image={image}
          billNo={billNo}
          customerInfo={customerInfo}
          shipmentInfo={shipmentInfo}
          gstList={gstList}
          gstTotalFInalListMap={gstTotalFInalListMap}
          gstCellContainerValueMap={gstCellContainerValueMap}
          gstTotalValues={gstTotalValues}
          gstTotalList={gstTotalList}
          paymentDetailsInfo={paymentDetailsInfo}
          orderedBulletPoints={orderedBulletPoints}
          customerDetails={customerDetails}
          items={items}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          discountAmount={discountAmount}
          formatDate={formatDate}
          invoiceType={invoiceType}
          paymentDetails={paymentDetails}
        />
      ).toBlob();
      // Create formData with the blob to upload
      const formData = new FormData();
      formData.append("pdf", pdfBlob, `${billNo}.pdf`);
      try {
        const response = await axios.post(`${URI}/pdf/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setShareUrl(response.data.shareUrl);
      } catch (error) {
        console.error("Error uploading PDF:", error);
      }
      const url = URL.createObjectURL(pdfBlob);
      // // console.log("url ", url);
      const link = document.createElement("a");
      link.href = url;
      link.download = billNo;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
    }
    try {
      await setCustShipItemBillDetails();
    } catch (error) {
      throw new Error("Error from setCustShipItemBillDetails");
    }
  };
  const DownloadPdf = () => {
    return (
      <StyledButton onClick={downloadPdfDocument}>Download PDF</StyledButton>
    );
  };
  const handlePaymentDetailsSubmit = async (e) => {
    // // console.log("paymentDetailshandlePaymentDetailsSubmit", paymentDetails);
    e.preventDefault();
    try {
      const response = await fetch(`${URI}/bankDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentDetails }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fetchedData = await response.json();
      // // console.log("Success", fetchedData);
      alert("Saved Succesfully");
      return fetchedData;
    } catch (error) {
      alert("Error Succesfully");
      console.error("Error ", error);
    }
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddBulletPoint = () => {
    if (inputText.trim()) {
      setBulletPoints([...bulletPoints, inputText.trim()]);
      setInputText(""); // Clear the input after adding
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddBulletPoint();
    }
  };
  const handleRemoveBulletPoint = (index) => {
    const newBulletPoints = bulletPoints.filter((_, i) => i !== index);
    setBulletPoints(newBulletPoints);
  };
  const handleEditBulletPoint = (index) => {
    setEditingIndex(index);
    setEditText(bulletPoints[index]);
  };

  const handleSaveEdit = (index) => {
    const updateBulletPoints = bulletPoints.map((point, i) =>
      i === index ? editText : point
    );
    setBulletPoints(updateBulletPoints);
    setEditingIndex(null);
  };
  // const handleClearAll = () => {
  //   setBulletPoints([]);
  // };
  // // console.log("beforebulletPoints", bulletPoints);
  const handleSave = () => {
    fetch(`${URI}/bulletPoints`, {
      method: "POST", // or 'PUT' if you are updating existing data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bulletPoints }),
    })
      .then((response) => response.json())
      .then((data) => {
        // // console.log("Bullet points saved:", data);
        // Optionally, you can update the UI or state based on the response
      })
      .catch((error) => console.error("Error saving bullet points:", error));
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      handleSaveEdit(index);
    } else if (event.key === "Escape") {
      setEditingIndex(null);
    }
  };
  const moveUp = (index) => {
    if (index === 0) return;
    const newOrderPoints = [...bulletPoints];
    [newOrderPoints[index - 1], newOrderPoints[index]] = [
      newOrderPoints[index],
      newOrderPoints[index - 1],
    ];
    setBulletPoints(newOrderPoints);
  };
  const moveDown = (index) => {
    if (index === BulletPoints.length - 1) return;
    const newOrderPoints = [...bulletPoints];
    [newOrderPoints[index + 1], newOrderPoints[index]] = [
      newOrderPoints[index],
      newOrderPoints[index + 1],
    ];
    setBulletPoints(newOrderPoints);
  };
  // const toggleBulletPoints = () => {
  //   setBulletPointsVisible(true);
  // };
  const closeBulletPoints = () => {
    setBulletPointsVisible([]);
    setBulletPointsVisible(false);
  };
  const orderedBulletPoints = orderBulletPoints(bulletPoints);
  /*
  useEffect(() => {
    // Fetch image URL from the API
    axios
      .get(`${URI}/getImageLogo`)
      .then((response) => {
        const fullImageUrl = `${noApi}${response.data.url}`;
        console.log("fullImageUrl ", fullImageUrl);
        setImage(fullImageUrl);
      })
      .catch((error) => {
        console.error("Error fetching the image URL:", error);
      });
  }, []);
  // console.log("myImage", image);
  */
  return (
    <div>
      <div className="bullet-points-main">
        <Button
          onClick={handleBulletPointsOpen}
          variant="contained"
          color="primary"
          style={{ textTransform: "none", fontSize: "16px" }}
          startIcon={<AddIcon />}
        >
          Add Terms & Conditions
        </Button>
        <Dialog
          open={isbulletPointsVisible}
          onClose={handleBulletPointsClose}
          maxWidth="md"
          fullWidth
        >
          <div>
            <button className="close-button" onClick={closeBulletPoints}>
              <CloseIcon />
            </button>

            <div>
              <BulletPoints
                inputText={inputText}
                handleInputChange={handleInputChange}
                handleKeyPress={handleKeyPress}
                bulletPoints={bulletPoints}
                editingIndex={editingIndex}
                editText={editText}
                setEditText={setEditText}
                handleKeyDown={handleKeyDown}
                handleSaveEdit={handleSaveEdit}
                handleEditBulletPoint={handleEditBulletPoint}
                handleRemoveBulletPoint={handleRemoveBulletPoint}
                moveUp={moveUp}
                moveDown={moveDown}
                handleSave={handleSave}
              />
            </div>
          </div>
        </Dialog>
      </div>
      <div className="payment-details-main">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentDetailsOpen}
          style={{ textTransform: "none", fontSize: "16px" }}
          startIcon={<AddIcon />}
        >
          Add Payment Details
        </Button>
        <Dialog
          open={paymentDetailsOpen}
          onClose={handlePaymentDetailsClose}
          maxWidth="md"
          fullWidth
        >
          <div>
            <button
              className="close-button"
              onClick={handlePaymentDetailsClose}
            >
              <CloseIcon />
            </button>

            <div>
              <PaymentDetails
                handlePaymentDetailsSubmit={handlePaymentDetailsSubmit}
                paymentDetails={paymentDetails}
                handlePaymentDetailsChange={handlePaymentDetailsChange}
              />
            </div>
          </div>
        </Dialog>
      </div>
      <DownloadPdf />
      {shareUrl && (
        <div className="share-container">
          <Button variant="contained" onClick={togglePopup}>
            <ShareIcon />
            share
          </Button>
          <Dialog open={isPopupVisible} onClose={togglePopup}>
            <div className="share-modal">
              <div className="share-modal-header">
                <h2>Share</h2>
                <button className="close-btn" onClick={togglePopup}>
                  <CloseIcon />
                </button>
              </div>
              <div className="share-modal-content">
                <div className="popup-content">
                  <button
                    onClick={() => sharePDF("whatsapp")}
                    className="share-button"
                  >
                    <WhatsAppIcon />
                  </button>
                  <button
                    onClick={() => sharePDF("gmail")}
                    className="share-button"
                  >
                    <GmailIcon />
                  </button>
                  <button
                    onClick={() => sharePDF("telegram")}
                    className="share-button"
                  >
                    <TelegramIcon />
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      )}
      <div className="invoice-report-view-button">
        <Button
          variant="contained"
          onClick={togglePdfVisibility}
          style={{ backgroundColor: "#6f42c1", color: "#fff" }} // Assuming you want white text
        >
          {isPdfVisible ? <FaEye /> : <FaEyeSlash />} View My Invoice Report
        </Button>
        <div style={{ marginTop: "20px" }}>
          {isPdfVisible && (
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
              <PDfReport
                myCompany={myCompany}
                shipmentDetails={shipmentDetails}
                itemsInPiecesList={itemsInPiecesList}
                // image={image}
                billNo={billNo}
                customerInfo={customerInfo}
                shipmentInfo={shipmentInfo}
                gstList={gstList}
                gstTotalFInalListMap={gstTotalFInalListMap}
                gstCellContainerValueMap={gstCellContainerValueMap}
                gstTotalValues={gstTotalValues}
                gstTotalList={gstTotalList}
                paymentDetailsInfo={paymentDetailsInfo}
                orderedBulletPoints={orderedBulletPoints}
                customerDetails={customerDetails}
                items={items}
                invoiceDate={invoiceDate}
                dueDate={dueDate}
                discountAmount={discountAmount}
                formatDate={formatDate}
                invoiceType={invoiceType}
                paymentDetails={paymentDetails}
              />
            </PDFViewer>
          )}
        </div>
      </div>
    </div>
  );
};
export default PdfReportData;
