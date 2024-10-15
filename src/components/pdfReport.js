import { Image, Document, Page, Text, View } from "@react-pdf/renderer";
import styles from "../componentStyles/pdfReportStyle";
const PdfReport = ({
  itemsInPiecesList,
  image,
  sampleLogo,
  billNo,
  customerInfo,
  shipmentInfo,
  gstList,
  gstTotalFInalListMap,
  gstCellContainerValueMap,
  gstTotalValues,
  gstTotalList,
  paymentDetailsInfo,
  orderedBulletPoints,
  
}) => {
  
  console.log("imageFROmPDF ", image)
  console.log("itemsInPiecesListFromPDF ", itemsInPiecesList)

  // console.log("orderedBulletPoints001 ", orderedBulletPoints)
  // console.log(" paymentDetailsInfo_value  ", paymentDetailsInfo)
  return (
    <Document>
      {itemsInPiecesList.map((itemsInPieces, index) => (
        <Page size="A4" style={styles.page}>
          <View style={styles.pageStyle}>
            <View style={styles.logoheaderContainer}>
              {image ? (
                <Image src={image} style={styles.logoheader} />
              ) : (
                <Image src={sampleLogo} style={styles.sampleLogoheader} />
              )}
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
                    {info.label == "Address" ? (
                      <View style={styles.customerAndShipmentDetailsAddress}>
                        <Text
                          style={styles.customerAndShipmentDetailsAttributeKey}
                        >
                          {info.label}:
                        </Text>
                        <Text
                          style={
                            styles.customerAndShipmentDetailsAttributeValue
                          }
                        >
                          {" "}
                          {info.value}{" "}
                        </Text>
                      </View>
                    ) : (
                      <>
                        <Text
                          style={styles.customerAndShipmentDetailsAttributeKey}
                        >
                          {info.label}:
                        </Text>
                        <Text
                          style={
                            styles.customerAndShipmentDetailsAttributeValue
                          }
                        >
                          {" "}
                          {info.value}{" "}
                        </Text>
                      </>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.separator} />
              <View style={styles.shipmentInfoContainer}>
                <Text style={styles.customerDetailsTitle}>ShipmentDetails</Text>
                {shipmentInfo.map((info, index) => (
                  <View style={styles.detailSection} key={index}>
                    {info.label == "Address" ? (
                      <View style={styles.customerAndShipmentDetailsAddress}>
                        <Text
                          style={styles.customerAndShipmentDetailsAttributeKey}
                        >
                          {info.label}:
                        </Text>
                        <Text
                          style={
                            styles.customerAndShipmentDetailsAttributeValue
                          }
                        >
                          {" "}
                          {info.value}{" "}
                        </Text>
                      </View>
                    ) : (
                      <>
                        <Text
                          style={styles.customerAndShipmentDetailsAttributeKey}
                        >
                          {info.label}:
                        </Text>
                        <Text
                          style={
                            styles.customerAndShipmentDetailsAttributeValue
                          }
                        >
                          {" "}
                          {info.value}{" "}
                        </Text>
                      </>
                    )}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={[
                    styles.headerCell,
                    styles.slnoCell,
                    styles.boldRobotFont,
                  ]}
                >
                  SL No
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    styles.descriptionCell,
                    styles.boldRobotFont,
                  ]}
                >
                  Description
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    styles.hsnCodeCell,
                    styles.boldRobotFont,
                  ]}
                >
                  HSN Code
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    styles.qtyCell,
                    styles.boldRobotFont,
                  ]}
                >
                  Quantity
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    styles.rateCell,
                    styles.boldRobotFont,
                  ]}
                >
                  Rate
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    styles.totalCell,
                    styles.boldRobotFont,
                  ]}
                >
                  Total
                </Text>
                {gstList.map((tax) => (
                  <View key={tax} style={styles.gstCellContainer}>
                    <Text style={[styles.gstHeading, styles.boldRobotFont]}>
                      {tax}
                    </Text>
                    <View style={styles.gstCell}>
                      <Text style={[styles.gstSubHeader, styles.boldRobotFont]}>
                        Rate
                      </Text>
                      <Text
                        style={[styles.gstSubHeaderLast, styles.boldRobotFont]}
                      >
                        Amount
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              {itemsInPieces.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.slnoCell]}>
                    {item.slno}
                  </Text>
                  <Text style={[styles.tableCell, styles.descriptionCell]}>
                    {item.description}
                  </Text>
                  <Text style={[styles.tableCell, styles.hsnCodeCell]}>
                    {item.hsnCode}
                  </Text>
                  <Text style={[styles.tableCell, styles.qtyCell]}>
                    {item.qty}
                  </Text>
                  <Text style={[styles.tableCell, styles.rateCell]}>
                    {item.rate}
                  </Text>
                  <Text style={[styles.tableCell, styles.totalCell]}>
                    {item.total}
                  </Text>
                  {gstCellContainerValueMap.map((attribute) => (
                    <View style={styles.gstCellContainerValue}>
                      <View style={styles.gstCell}>
                        <Text style={styles.gstSubHeaderValue}>
                          {item[attribute.key]}
                        </Text>
                        <Text style={styles.gstSubHeaderLastValue}>
                          {item[attribute.value]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.descriptionTotalCell]}>
                  Total
                </Text>
                <Text style={[styles.tableCell, styles.totalCell]}>
                  {gstTotalValues.rateTotal}
                </Text>
                {gstTotalList.map((gstTotalAttribute) => (
                  <View style={styles.gstCellContainerValue}>
                    <View style={styles.gstCell}>
                      <Text style={[styles.gstSubHeaderValue]}></Text>
                      <Text style={styles.gstSubHeaderLastValue}>
                        {gstTotalValues[gstTotalAttribute]}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              {gstTotalFInalListMap.map((column) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.gstTotalCell]}></Text>
                  <Text style={[styles.tableCell, styles.gstTotalLabelCell]}>
                    {column.columnName}
                  </Text>
                  <Text style={[styles.tableCell, styles.gstTotalValueCell]}>
                    {gstTotalValues[column.columnValue]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      ))}
      {paymentDetailsInfo[0].value && (
        <Page size="A4" style={styles.page}>
          <View style={styles.termsOfSalePaymentDetailsContainer}>
            <View style={styles.paymentDetailsContainer}>
              <Text style={{ textAlign: "center" }}>Payment Details</Text>
              {paymentDetailsInfo.map((info, index) => (
                <View
                  style={styles.detailSectionPaymentDetailsInfo}
                  key={index}
                >
                  <>
                    <Text style={styles.paymentDetailsInfoAttributeKey}>
                      {info.label}:
                    </Text>
                    <Text style={styles.paymentDetailsInfoAttributeValue}>
                      {" "}
                      {info.value}{" "}
                    </Text>
                  </>
                </View>
              ))}
            </View>
          </View>
        </Page>
      )}
      {orderedBulletPoints && orderedBulletPoints.length > 0 && (
        // console.log('orderedBulletPoints.length ', orderedBulletPoints.length),
        <Page size="A4" style={styles.page}>
          <View style={styles.termsOfSaleContainer}>
            <Text style={{ textAlign: "center", fontSize: "36" }}>
              Terms & Conditions
            </Text>
            {orderedBulletPoints.map((info, index) => (
              <View style={styles.detailTermsOfSaleContainer} key={index}>
                <Text style={styles.detailTermsOfSaleContainerAttributeKey}>
                  {info}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      )}
    </Document>
  );
};

export default PdfReport;
