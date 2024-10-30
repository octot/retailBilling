import {
  Font,
  // Image,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
// import styles from "../componentStyles/pdfReportStyle";
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  logoSection: {
    width: "30%",
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 10,
  },
  invoiceHeader: {
    width: "40%",
    textAlign: "center",
  },
  senderDetails: {
    width: "30%",
    textAlign: "right",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: "1 solid #e0e0e0",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1 solid #3498db",
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsGridBulletPoints: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  detailItem: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#7f8c8d",
  },
  table: {
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomStyle: "solid",
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  totals: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  totalItem: {
    marginVertical: 5,
    fontWeight: "bold",
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    borderTopWidth: 2,
    borderTopColor: "#3498db",
    borderTopStyle: "solid",
    paddingTop: 5,
  },
});

Font.register({
  family: "Roboto",
  src: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
});
const PdfReport = ({
  paymentDetails,
  myCompany,
  invoiceType,
  invoiceDate,
  dueDate,
  discountAmount,
  formatDate,
  items,
  itemsInPieces,
  shipmentDetails,
  itemsInPiecesList,
  // image,
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
  customerDetails,
}) => {
  // console.log(typeof paymentDetailsInfo);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.logoSection}>
            {/*
            {image && (
              <Image
                style={styles.logo}
                src={image} // Use the image URL here
              />
            )}
            */}
            <Text>{myCompany.companyName || "Company Name"}</Text>
            <Text>{myCompany.gstNumber || "GST: 27XXXXXXXXXXXXXX"}</Text>
          </View>
          <View style={styles.invoiceHeader}>
            <Text style={styles.title}>{invoiceType}</Text>
            <Text>Invoice No:{billNo}</Text>
            <Text>Date: {invoiceDate || ""}</Text>
            <Text>DueDate: {dueDate || ""}</Text>
          </View>
          <View style={styles.senderDetails}>
            <Text>{myCompany.companyName || "Company Name"}</Text>
            <Text>
              {myCompany.address || "123 Business Street City, State - PIN"}
            </Text>

            <Text>Phone: {myCompany.phone || "+91 1234567890"}</Text>
            <Text>Email: {myCompany.email || "contact@company.com"}</Text>
          </View>
        </View>
        {/* Customer Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.column}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Name:</Text>
                <Text>{customerDetails?.customerName || ""}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Address:</Text>
                <Text>{customerDetails?.address || ""}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>GST No:</Text>
                <Text>{customerDetails?.customerGst || ""}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Phone:</Text>
                <Text>{customerDetails?.phoneNumber || ""}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Shipment Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.column}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Shipping To:</Text>
                <Text>{shipmentDetails?.customerName || ""}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Address:</Text>
                <Text>
                  <Text>{shipmentDetails?.address || ""}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>GST No:</Text>
                <Text>{shipmentDetails?.customerGst || ""}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Phone:</Text>
                <Text>{shipmentDetails?.phoneNumber || ""}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Item Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Item Details</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Item Name</Text>
              <Text style={styles.tableCell}>Description</Text>
              <Text style={styles.tableCell}>HSN Code</Text>
              <Text style={styles.tableCell}>qty</Text>
              <Text style={styles.tableCell}>Rate</Text>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            {items.map((item, index) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.itemName}</Text>
                <Text style={styles.tableCell}>{item.description}</Text>
                <Text style={styles.tableCell}>{item.hsnCode}</Text>
                <Text style={styles.tableCell}>{item.qty}</Text>
                <Text style={styles.tableCell}>{item.rate}</Text>
                <Text style={styles.tableCell}>{item.total}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tax Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tax Details</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Tax Type</Text>
              <Text style={styles.tableCell}>Amount</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>CGST</Text>
              <Text style={styles.tableCell}>{gstTotalValues.cgstTotal}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>SGST</Text>
              <Text style={styles.tableCell}>{gstTotalValues.sgstTotal}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>IGST</Text>
              <Text style={styles.tableCell}>{gstTotalValues.igstTotal}</Text>
            </View>
          </View>
        </View>

        {/* Totals Section */}
        <View style={styles.totals}>
          <Text style={styles.totalItem}>
            GST Total: {gstTotalValues.gstTotalSum}
          </Text>
          <Text style={styles.totalItem}>
            Rate Total: {gstTotalValues.rateTotal}
          </Text>
          <Text style={[styles.totalItem, styles.grandTotal]}>
            Invoice Total: {gstTotalValues.invoiceTotalInr}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.column}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Account Name:</Text>
                <Text>{paymentDetails?.accountName || ""}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Account Number:</Text>
                <Text>{paymentDetails?.accountNumber || ""}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.detailItem}>
                <Text style={styles.label}>Bank Name:</Text>
                <Text>{paymentDetails?.bankName || ""}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.label}>GPay Number:</Text>
                <Text>{paymentDetails?.gpayNumber || ""}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms And Conditions</Text>
          <View style={styles.detailsGridBulletPoints}>
            {orderedBulletPoints.map((info, index) => (
              <View style={styles.detailTermsOfSaleContainer} key={index}>
                <Text style={styles.detailTermsOfSaleContainerAttributeKey}>
                  {info}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfReport;
