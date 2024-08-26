import { useEffect, React, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import termsOfSale from '../images/termsOfSale.jpg'
import { pdf } from '@react-pdf/renderer';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PDfReport from '../components/pdfReport'
import {
  orderBulletPoints,
  itemsToParts,
  getCustomerInfo, getShipmentInfo, getGstList, getGstTotalList, getGstTotalFinalListMap, getGstCellContainerValueMap, getPaymentDetails
} from '../Utils/pdfUtil'
import { Box, Typography, Grid, Dialog, DialogContent } from '@mui/material';
import sampleLogo from '../images/sampleLogo.jpeg'
import BulletPoints from '../components/bulletPoints'
import PaymentDetails from '../components/PaymentDetails'
import '../componentStyles/PdfReportData.css'
const PdfReportData = ({ items, customerDetails, date,
  shipmentDetails, gstTotalValues, billNo }) => {
  const URl = 'https://shiroenterprise.onrender.com/api'
  // const URl='http://localhost:3001/api'
  const StyledButton = styled(Button)({
    backgroundColor: '#4caf50',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#45a049',
    },
    padding: '10px 20px',
    fontSize: '16px',
    margin: '20px 0',
    textAlign: 'center  '
  });
  const itemsInPiecesList = itemsToParts(items, 10)
  const customerInfo = getCustomerInfo(customerDetails, date)
  const shipmentInfo = getShipmentInfo(shipmentDetails, date)
  const gstList = getGstList()
  const gstTotalList = getGstTotalList()
  const gstTotalFInalListMap = getGstTotalFinalListMap();
  const gstCellContainerValueMap = getGstCellContainerValueMap();
  const [paymentDetails, setPaymentDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    gpayNumber: ''
  })
  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(
      (prevDetails) => (
        {
          ...prevDetails, [name]: value,
        }
      )
    )
  }
  const paymentDetailsInfo = getPaymentDetails(paymentDetails);
  const combinedDataOfCustShipItemBill = {
    items: items, customerDetails: customerDetails, date: date,
    shipmentDetails: shipmentDetails, gstTotalValues: gstTotalValues, billNo: billNo
  }
  const setCustShipItemBillDetails = async () => {
    try {
      const custShipItemBillDetailsData = await fetch(`${URl}/setCustShipItemBillDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedDataOfCustShipItemBill)
      });
      const data = await custShipItemBillDetailsData.json();
      console.log("custShipItemBillDetailsData ", data)
    } catch (err) {
      console.error("Failed to fetch data from setCustShipItemBillDetails ", err);
    }
  };
  const generateBillNumber = async () => {
    try {
      const responseOfGeneratedBillNumber = await fetch(`${URl}/nextBillNumber`);
      if (!responseOfGeneratedBillNumber.ok) {
        throw new Error("Could not generateBillNumber")
      }
      const generatedBillNumber = await responseOfGeneratedBillNumber.json();
      return generatedBillNumber.billNumber
    }
    catch (error) {
      throw new Error("Failed to fetch data from generateAPI ", error)
    }
  }
  const downloadPdfDocument = async () => {
    try {
      if (!billNo) {
        billNo = await generateBillNumber()
      }
      if (!billNo) {
        throw new Error('Failed to generate bill number');
      }
      const pdfBlob = await pdf(
        <PDfReport itemsInPiecesList={itemsInPiecesList}
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
          bulletPoints={bulletPoints} />
      ).toBlob()
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url;
      link.download = billNo
      link.click()
      URL.revokeObjectURL(url)
    }
    catch (error) {
      console.error('Error generating or downloading PDF:', error);
    }
    try {
      await setCustShipItemBillDetails();
    }
    catch (error) {
      throw new Error('Error from setCustShipItemBillDetails');
    }
  };
  const DownloadPdf = () => {
    return <StyledButton onClick={downloadPdfDocument}>Download PDF</StyledButton>
  }
  //image resize
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [scale, setScale] = useState(1);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [bulletPoints, setBulletPoints] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null)
  const [editText, setEditText] = useState("")
  const [isPaymentDetailsVisible, setIsPaymentDetailsVisible] = useState(false);
  console.log("isPaymentDetailsVisible ", isPaymentDetailsVisible)
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file.type.startsWith('image/')) {
      window.alert('Upload only image files!')
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const generatePreview = useCallback(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    canvas.width = crop.width * scale;
    canvas.height = crop.height * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = 'high';
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
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width * scale;
    canvas.height = completedCrop.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = 'high';
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
    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    setImage(croppedImageUrl);
    handleDialogClose();
  }
  const handlePaymentDetailsSubmit = (e) => {
    e.preventDefault();
    console.log("paymentDetails ", paymentDetails)
  }
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddBulletPoint = () => {
    if (inputText.trim()) {
      setBulletPoints([...bulletPoints, inputText.trim()]);
      setInputText(''); // Clear the input after adding
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddBulletPoint();
    }
  }
  const handleRemoveBulletPoint = (index) => {
    const newBulletPoints = bulletPoints.filter(
      (_, i) => i !== index);
    setBulletPoints(newBulletPoints);
  }
  const handleEditBulletPoint = (index) => {
    setEditingIndex(index)
    setEditText(bulletPoints[index])
  }

  const handleSaveEdit = (index) => {
    const updateBulletPoints = bulletPoints.map((point, i) => (i === index ? editText : point))
    setBulletPoints(updateBulletPoints)
    setEditingIndex(null)
  }
  const handleClearAll = () => {
    setBulletPoints([]);
  }
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      handleSaveEdit(index)
    }
    else if (event.key === 'Escape') {
      setEditingIndex(null)
    }
  }
  const togglePaymentDetails = () => {
    setIsPaymentDetailsVisible(true)
  }
  const closePaymentDetails = () => {
    setPaymentDetails({
      accountName: '',
      accountNumber: '',
      bankName: '',
      gpayNumber: ''
    })
    setIsPaymentDetailsVisible(false)
  }
  const orderedBulletPoints = orderBulletPoints(bulletPoints);
  console.log("orderedBulletPoints ", orderedBulletPoints)
  return (
    <div>
      <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Image Editor
        </Typography>
        {!image && (
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              padding: 4,
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main' },
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>Drop the image here ...</Typography>
            ) : (
              <Typography>Drag 'n' drop an image here, or click to select</Typography>
            )}
          </Box>
        )}
        {image && (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <img
                src={image}
                alt="Uploaded"
                style={{ maxWidth: '100%', cursor: 'pointer' }}
                onClick={handleDialogOpen}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" onClick={handleClearImage}>
                Clear Image
              </Button>
            </Grid>
          </Grid>
        )}
        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
          <DialogContent>
            <Box sx={{ textAlign: 'center' }}>
              <ReactCrop
                src={image}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                style={{ maxWidth: '100%', maxHeight: 400 }}>
                <img ref={imgRef} src={image} alt="Crop me" style={{ maxWidth: '100%' }} />
              </ReactCrop>
            </Box>
          </DialogContent>
          <Button onClick={handleSaveCrop} color="primary" variant="contained">
            Save changes
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button></Dialog>
      </Box>
      <h1 style={{ width: '20vw' }}>Terms & Conditons</h1>
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
      />
      <div>
        <Button onClick={togglePaymentDetails}>ShowPayment</Button>
        {isPaymentDetailsVisible && (
          <div className='payment-details-box'>
            <Button className='close-button' onClick={closePaymentDetails}>
              &times;
            </Button>
            <div>
              <PaymentDetails
                handlePaymentDetailsSubmit={handlePaymentDetailsSubmit}
                paymentDetails={paymentDetails}
                handlePaymentDetailsChange={handlePaymentDetailsChange}
              />
            </div>
          </div>
        )}
      </div>
      <DownloadPdf />
      <h1>Pdf report</h1>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <PDfReport itemsInPiecesList={itemsInPiecesList}
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
          orderedBulletPoints={orderedBulletPoints} />
      </PDFViewer>
    </div >
  );
};
export default PdfReportData;

