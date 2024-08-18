import { useEffect, React, useState } from 'react';
import { Image, PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';
import paymentDetails from '../images/paymentDetails.jpg'
import termsOfSale from '../images/termsOfSale.jpg'
import styles from '../componentStyles/pdfReportStyle'
import { pdf } from '@react-pdf/renderer';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {
  itemsToParts,
  getCustomerInfo, getShipmentInfo, getGstList, getGstTotalList, getGstTotalFinalListMap, getGstCellContainerValueMap, getPaymentDetails
} from '../Utils/pdfUtil'
import { Box, Typography, Grid, Dialog, DialogContent } from '@mui/material';
import sampleLogo from '../images/sampleLogo.jpeg'
import BulletPoints from '../components/bulletPoints'
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
      const pdfBlob = await pdf(<Document>
        {itemsInPiecesList.map((itemsInPieces, index) => (
          <Page size="A4" style={styles.page}>
            <View style={styles.pageStyle}>
              <View style={styles.logoheaderContainer}>
                {image ? (<Image src={image} style={styles.logoheader} />) : (<Image src={sampleLogo} style={styles.sampleLogoheader} />)}
              </View>
              <View>
                <View style={styles.billNoContainer}>
                  <Text>BillNo: {billNo}</Text>
                </View>
              </View>
              <View style={styles.customerAndShipmentDetails}>
                <View style={styles.customerInfoContainer}>
                  <Text style={styles.customerDetailsTitle}>CustomerDetails</Text>
                  {customerInfo.map((info, index) => (
                    <View style={styles.detailSection} key={index}>
                      {info.label == 'Address' ? (
                        <View style={styles.customerAndShipmentDetailsAddress}>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </View>
                      ) : (
                        <>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </>
                      )
                      }
                    </View>
                  ))}
                </View>
                <View style={styles.separator} />
                <View style={styles.shipmentInfoContainer}>
                  <Text style={styles.customerDetailsTitle}>ShipmentDetails</Text>
                  {shipmentInfo.map((info, index) => (
                    <View style={styles.detailSection} key={index}>
                      {info.label == 'Address' ? (
                        <View style={styles.customerAndShipmentDetailsAddress}>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </View>
                      ) : (
                        <>
                          <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                          <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                        </>
                      )
                      }
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.headerCell, styles.slnoCell, styles.boldRobotFont]}>SL No</Text>
                  <Text style={[styles.headerCell, styles.descriptionCell, styles.boldRobotFont]}>Description</Text>
                  <Text style={[styles.headerCell, styles.hsnCodeCell, styles.boldRobotFont]}>HSN Code</Text>
                  <Text style={[styles.headerCell, styles.qtyCell, styles.boldRobotFont]}>Quantity</Text>
                  <Text style={[styles.headerCell, styles.rateCell, styles.boldRobotFont]}>Rate</Text>
                  <Text style={[styles.headerCell, styles.totalCell, styles.boldRobotFont]}>Total</Text>
                  {
                    gstList.map(tax => (
                      <View key={tax} style={styles.gstCellContainer}>
                        <Text style={[styles.gstHeading, styles.boldRobotFont]}>
                          {tax}
                        </Text>
                        <View style={styles.gstCell}>
                          <Text style={[styles.gstSubHeader, styles.boldRobotFont]}>Rate</Text>
                          <Text style={[styles.gstSubHeaderLast, styles.boldRobotFont]}>Amount</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
                {itemsInPieces.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.slnoCell]}>{item.slno}</Text>
                    <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                    <Text style={[styles.tableCell, styles.hsnCodeCell]}>{item.hsnCode}</Text>
                    <Text style={[styles.tableCell, styles.qtyCell]}>{item.qty}</Text>
                    <Text style={[styles.tableCell, styles.rateCell]}>{item.rate}</Text>
                    <Text style={[styles.tableCell, styles.totalCell]}>{item.total}</Text>
                    {
                      gstCellContainerValueMap.map((attribute) => (
                        <View style={styles.gstCellContainerValue}>
                          <View style={styles.gstCell}>
                            <Text style={styles.gstSubHeaderValue}>{item[attribute.key]}</Text>
                            <Text style={styles.gstSubHeaderLastValue}>{item[attribute.value]}</Text>
                          </View>
                        </View>
                      ))}
                  </View>
                ))}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.descriptionTotalCell]}>Total</Text>
                  <Text style={[styles.tableCell, styles.totalCell]}>{gstTotalValues.rateTotal}</Text>
                  {gstTotalList.map((gstTotalAttribute) => (
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={[styles.gstSubHeaderValue]}></Text>
                        <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues[gstTotalAttribute]}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                {gstTotalFInalListMap.map((column) => (
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                    <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>{column.columnName}</Text>
                    <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues[column.columnValue]}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.termsOfSalePaymentDetailsContainer}>
                <View style={styles.termsOfSaleContainer}>
                  <Image src={termsOfSale} style={styles.termsOfSale} />
                </View>
                <View style={styles.paymentDetailsContainer}>
                  <Text style={{ textAlign: 'center' }}>Payment Details</Text>
                  {paymentDetailsInfo.map((info, index) => (
                    <View style={styles.detailSectionPaymentDetailsInfo} key={index}>
                      <>
                        <Text style={styles.paymentDetailsInfoAttributeKey}>{info.label}:</Text>
                        <Text style={styles.paymentDetailsInfoAttributeValue} > {info.value} </Text>
                      </>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Page>
        ))}
      </Document>).toBlob()
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
      <h1>Terms & Conditons</h1>
      <BulletPoints />
      <Box sx={{ maxWidth: 800, marginLeft: '18rem', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <form onSubmit={handlePaymentDetailsSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
              <TextField
                label='A/C Number'
                name='accountName'
                value={paymentDetails.accountName}
                onChange={handlePaymentDetailsChange}
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
              <TextField
                label='A/C No'
                name='accountNumber'
                value={paymentDetails.accountNumber}
                onChange={handlePaymentDetailsChange}
                margin="none"

              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
              <TextField
                name='bankName'
                label='BankName'
                value={paymentDetails.bankName}
                onChange={handlePaymentDetailsChange}
                margin="none"
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '4px' }}>
              <TextField
                name='gpayNumber'
                label='G-payNumber'
                value={paymentDetails.gpayNumber}
                onChange={handlePaymentDetailsChange}
                margin="none"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Payment Submit
          </Button>
        </form>
      </Box>
      <DownloadPdf />
      <h1>Pdf report</h1>
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
          {itemsInPiecesList.map((itemsInPieces, index) => (
            <Page size="A4" style={styles.page}>
              <View style={styles.pageStyle}>
                <View style={styles.logoheaderContainer}>
                  {image ? (<Image src={image} style={styles.logoheader} />) : (<Image src={sampleLogo} style={styles.sampleLogoheader} />)}
                </View>
                <View>
                  <View style={styles.billNoContainer}>
                    <Text>BillNo: {billNo}</Text>
                  </View>
                </View>
                <View style={styles.customerAndShipmentDetails}>
                  <View style={styles.customerInfoContainer}>
                    <Text style={styles.customerDetailsTitle}>CustomerDetails</Text>
                    {customerInfo.map((info, index) => (
                      <View style={styles.detailSection} key={index}>
                        {info.label == 'Address' ? (
                          <View style={styles.customerAndShipmentDetailsAddress}>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </View>
                        ) : (
                          <>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </>
                        )
                        }
                      </View>
                    ))}
                  </View>
                  <View style={styles.separator} />
                  <View style={styles.shipmentInfoContainer}>
                    <Text style={styles.customerDetailsTitle}>ShipmentDetails</Text>
                    {shipmentInfo.map((info, index) => (
                      <View style={styles.detailSection} key={index}>
                        {info.label == 'Address' ? (
                          <View style={styles.customerAndShipmentDetailsAddress}>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </View>
                        ) : (
                          <>
                            <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                            <Text style={styles.customerAndShipmentDetailsAttributeValue} > {info.value} </Text>
                          </>
                        )
                        }
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.headerCell, styles.slnoCell, styles.boldRobotFont]}>SL No</Text>
                    <Text style={[styles.headerCell, styles.descriptionCell, styles.boldRobotFont]}>Description</Text>
                    <Text style={[styles.headerCell, styles.hsnCodeCell, styles.boldRobotFont]}>HSN Code</Text>
                    <Text style={[styles.headerCell, styles.qtyCell, styles.boldRobotFont]}>Quantity</Text>
                    <Text style={[styles.headerCell, styles.rateCell, styles.boldRobotFont]}>Rate</Text>
                    <Text style={[styles.headerCell, styles.totalCell, styles.boldRobotFont]}>Total</Text>
                    {
                      gstList.map(tax => (
                        <View key={tax} style={styles.gstCellContainer}>
                          <Text style={[styles.gstHeading, styles.boldRobotFont]}>
                            {tax}
                          </Text>
                          <View style={styles.gstCell}>
                            <Text style={[styles.gstSubHeader, styles.boldRobotFont]}>Rate</Text>
                            <Text style={[styles.gstSubHeaderLast, styles.boldRobotFont]}>Amount</Text>
                          </View>
                        </View>
                      ))
                    }
                  </View>
                  {itemsInPieces.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.slnoCell]}>{item.slno}</Text>
                      <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description}</Text>
                      <Text style={[styles.tableCell, styles.hsnCodeCell]}>{item.hsnCode}</Text>
                      <Text style={[styles.tableCell, styles.qtyCell]}>{item.qty}</Text>
                      <Text style={[styles.tableCell, styles.rateCell]}>{item.rate}</Text>
                      <Text style={[styles.tableCell, styles.totalCell]}>{item.total}</Text>
                      {
                        gstCellContainerValueMap.map((attribute) => (
                          <View style={styles.gstCellContainerValue}>
                            <View style={styles.gstCell}>
                              <Text style={styles.gstSubHeaderValue}>{item[attribute.key]}</Text>
                              <Text style={styles.gstSubHeaderLastValue}>{item[attribute.value]}</Text>
                            </View>
                          </View>
                        ))}
                    </View>
                  ))}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.descriptionTotalCell]}>Total</Text>
                    <Text style={[styles.tableCell, styles.totalCell]}>{gstTotalValues.rateTotal}</Text>
                    {gstTotalList.map((gstTotalAttribute) => (
                      <View style={styles.gstCellContainerValue}>
                        <View style={styles.gstCell}>
                          <Text style={[styles.gstSubHeaderValue]}></Text>
                          <Text style={styles.gstSubHeaderLastValue}>{gstTotalValues[gstTotalAttribute]}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  {gstTotalFInalListMap.map((column) => (
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                      <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>{column.columnName}</Text>
                      <Text style={[styles.tableCell, styles.gstTotalValueCell]}>{gstTotalValues[column.columnValue]}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.termsOfSalePaymentDetailsContainer}>
                  <View style={styles.termsOfSaleContainer}>
                    <Image src={termsOfSale} style={styles.termsOfSale} />
                  </View>
                  <View style={styles.paymentDetailsContainer}>
                    <Text style={{ textAlign: 'center' }}>Payment Details</Text>
                    {paymentDetailsInfo.map((info, index) => (
                      <View style={styles.detailSectionPaymentDetailsInfo} key={index}>
                        <>
                          <Text style={styles.paymentDetailsInfoAttributeKey}>{info.label}:</Text>
                          <Text style={styles.paymentDetailsInfoAttributeValue} > {info.value} </Text>
                        </>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </Page>
          ))}
        </Document>
      </PDFViewer>

    </div >
  );
};
export default PdfReportData;

