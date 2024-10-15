import { useEffect, React, useState } from "react";
import {
  WhatsAppIcon,
  GmailIcon,
  TelegramIcon,
  CloseIcon,
  ShareIcon,
} from "./icons";
import { PDFViewer } from "@react-pdf/renderer";
import termsOfSale from "../images/termsOfSale.jpg";
import { pdf } from "@react-pdf/renderer";
import { Button, TextField } from "@mui/material";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";
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
import { Box, Typography, Grid, Dialog, DialogContent } from "@mui/material";
import sampleLogo from "../images/sampleLogo.jpeg";
import BulletPoints from "../components/bulletPoints";
import PaymentDetails from "../components/PaymentDetails";
import "../componentStyles/PdfReportData.css";
import axios from "axios";
import { URI } from "./CONSTANTS";
import { StyledButton } from "./StyleButton";
import CloseButton from "./CloseButton";
const PdfReportData = ({
  items,
  customerDetails,
  date,
  shipmentDetails,
  gstTotalValues,
  billNo,
}) => {
  const itemsInPiecesList = itemsToParts(items, 10);
  const customerInfo = getCustomerInfo(customerDetails, date);
  const shipmentInfo = getShipmentInfo(shipmentDetails, date);
  const gstList = getGstList();
  const gstTotalList = getGstTotalList();
  const gstTotalFInalListMap = getGstTotalFinalListMap();
  const gstCellContainerValueMap = getGstCellContainerValueMap();
  const [paymentDetails, setPaymentDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    gpayNumber: "",
  });
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [scale, setScale] = useState(1);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogImagePreviewerOpen, setDialogImagePreviewerOpen] =
    useState(false);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [isbulletPointsVisible, setBulletPointsVisible] = useState(false);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);

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
  console.log("paymentDetails1111", paymentDetails);
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
      const custShipItemBillDetailsData = await fetch(
        `${URI}/setCustShipItemBillDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedDataOfCustShipItemBill),
        }
      );
      const data = await custShipItemBillDetailsData.json();
      // console.log("custShipItemBillDetailsData ", data)
    } catch (err) {
      console.error(
        "Failed to fetch data from setCustShipItemBillDetails ",
        err
      );
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
        console.log("billNo", billNo);
      }
      if (!billNo) {
        throw new Error("Failed to generate bill number");
      }
      const pdfBlob = await pdf(
        <PDfReport
          itemsInPiecesList={itemsInPiecesList}
          image={image}
          sampleLogo={sampleLogo}
          billNo={billNo}
          customerInfo={customerInfo}
          shipmentInfo={shipmentInfo}
          gstList={gstList}
          gstTotalFInalListMap={gstTotalFInalListMap}
          gstCellContainerValueMap={gstCellContainerValueMap}
          gstTotalValues={gstTotalValues}
          gstTotalList={gstTotalList}
          termsOfSale={termsOfSale}
          paymentDetailsInfo={paymentDetailsInfo}
          bulletPoints={bulletPoints}
        />
      ).toBlob();
      // Create formData with the blob to upload
      const formData = new FormData();
      formData.append("pdf", pdfBlob, `${billNo}.pdf`);
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
      const url = URL.createObjectURL(pdfBlob);
      console.log("url ", url);
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
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      window.alert("Upload only image files!");
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  const generatePreview = useCallback(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    canvas.width = crop.width * scale;
    canvas.height = crop.height * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop, scale]);
  useEffect(() => {
    generatePreview();
  }, [completedCrop, scale, generatePreview]);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogImagePreviewerOpen = () => {
    setDialogImagePreviewerOpen(true);
  };
  const handleDialogImagePreviewerClose = () => {
    setDialogImagePreviewerOpen(false);
  };
  const handleClearImage = () => {
    setImage(null);
    setCompletedCrop(null);
    setCrop({ aspect: 16 / 9 });
    setScale(1);
  };
  const handleSaveCrop = () => {
    if (!completedCrop || !imgRef.current) {
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width * scale;
    canvas.height = completedCrop.height * scale;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    const croppedImageUrl = canvas.toDataURL("image/jpeg");
    setImage(croppedImageUrl);
    handleDialogClose();
  };
  const handlePaymentDetailsSubmit = async (e) => {
    console.log("paymentDetailshandlePaymentDetailsSubmit", paymentDetails);

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
      console.log("Success", fetchedData);
      alert("Saved Succesfully");
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
  const handleClearAll = () => {
    setBulletPoints([]);
  };
  console.log("beforebulletPoints", bulletPoints);
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
        console.log("Bullet points saved:", data);
        // Optionally, you can update the UI or state based on the response
      })
      .catch((error) => console.error("Error saving bullet points:", error));
  };
  const handleSaveLogo = async () => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    console.log("handleSaveLogo ", image);
    formData.append("file", image);
    try {
      const response = axios.post(`${URI}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("handleSaveLogoresponse ", response);

      return response;
    } catch (error) {
      console.error("uploadFail", error);
    }
  };
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      handleSaveEdit(index);
    } else if (event.key === "Escape") {
      setEditingIndex(null);
    }
  };
  const moveUp = (index) => {
    if (index == 0) return;
    const newOrderPoints = [...bulletPoints];
    [newOrderPoints[index - 1], newOrderPoints[index]] = [
      newOrderPoints[index],
      newOrderPoints[index - 1],
    ];
    setBulletPoints(newOrderPoints);
  };
  const moveDown = (index) => {
    if (index == BulletPoints.length - 1) return;
    const newOrderPoints = [...bulletPoints];
    [newOrderPoints[index + 1], newOrderPoints[index]] = [
      newOrderPoints[index],
      newOrderPoints[index + 1],
    ];
    setBulletPoints(newOrderPoints);
  };
  const toggleBulletPoints = () => {
    setBulletPointsVisible(true);
  };
  const closeBulletPoints = () => {
    setBulletPointsVisible([]);
    setBulletPointsVisible(false);
  };
  const orderedBulletPoints = orderBulletPoints(bulletPoints);
  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogImagePreviewerOpen}
        >
          Open Image Editor
        </Button>

        <Dialog
          open={dialogImagePreviewerOpen}
          onClose={handleDialogImagePreviewerClose}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            <Box sx={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
              <CloseButton
                className="dialog-image-previewer-close-button"
                onClick={handleDialogImagePreviewerClose}
              />
              <Typography variant="h4" gutterBottom>
                Image Editor
              </Typography>
              {!image && (
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    padding: 4,
                    cursor: "pointer",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </Box>
              )}
              {image && (
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", cursor: "pointer" }}
                      onClick={handleDialogOpen}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveLogo}
                  >
                    SaveImage
                  </Button>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClearImage}
                    >
                      Clear Image
                    </Button>
                  </Grid>
                </Grid>
              )}

              <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="md"
                fullWidth
              >
                <DialogContent>
                  <Box sx={{ textAlign: "center" }}>
                    <ReactCrop
                      src={image}
                      crop={crop}
                      onChange={(newCrop) => setCrop(newCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      style={{ maxWidth: "100%", maxHeight: 400 }}
                    >
                      <img
                        ref={imgRef}
                        src={image}
                        alt="Crop me"
                        style={{ maxWidth: "100%" }}
                      />
                    </ReactCrop>
                  </Box>
                </DialogContent>
                <Button
                  onClick={handleSaveCrop}
                  color="primary"
                  variant="contained"
                >
                  Save changes
                </Button>
                <Button onClick={handleDialogClose} color="primary">
                  Close
                </Button>
              </Dialog>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Button onClick={handleBulletPointsOpen}>Terms & Conditons</Button>
        <Dialog
          open={isbulletPointsVisible}
          onClose={handleBulletPointsClose}
          maxWidth="md"
          fullScreen
        >
          <div className="bullet-points-box">
            <CloseButton className="close-button" onClick={closeBulletPoints} />
            <h1 style={{ width: "20vw" }}>Terms & Conditons</h1>
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
      <div>
        <Button onClick={handlePaymentDetailsOpen}>ShowPayment</Button>
        <Dialog
          open={paymentDetailsOpen}
          onClose={handlePaymentDetailsClose}
          maxWidth="md"
          fullWidth
        >
          <div className="payment-details-box">
            <CloseButton
              className="close-button"
              onClick={handlePaymentDetailsClose}
            />
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
                  {" "}
                  <GmailIcon />
                </button>
                <button onClick={() => sharePDF("telegram")}>
                  {" "}
                  <TelegramIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <DownloadPdf />
      <h1>Pdf report</h1>
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <PDfReport
          itemsInPiecesList={itemsInPiecesList}
          image={image}
          sampleLogo={sampleLogo}
          billNo={billNo}
          customerInfo={customerInfo}
          shipmentInfo={shipmentInfo}
          gstList={gstList}
          gstTotalFInalListMap={gstTotalFInalListMap}
          gstCellContainerValueMap={gstCellContainerValueMap}
          gstTotalValues={gstTotalValues}
          gstTotalList={gstTotalList}
          termsOfSale={termsOfSale}
          paymentDetailsInfo={paymentDetailsInfo}
          orderedBulletPoints={orderedBulletPoints}
        />
      </PDFViewer>
    </div>
  );
};
export default PdfReportData;
