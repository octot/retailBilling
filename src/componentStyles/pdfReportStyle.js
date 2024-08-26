import { Font, StyleSheet } from '@react-pdf/renderer';
import roboto from '../fonts/Roboto-Bold.ttf'
Font.register(
    {
        family: 'Roboto',
        fonts: [
            { src: roboto }
        ]
    }
)
const styles = StyleSheet.create({
    boldRobotFont: {
        fontFamily: "Roboto"
    },
    customerAndShipmentDetailsAttributeKey: {
        fontFamily: "Roboto"
    },
    customerAndShipmentDetailsAttributeValue: {
    },
    detailSectionPaymentDetailsInfo: {
        // backgroundColor: 'black',
        marginLeft: '5',
        fontSize: '11px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        flex: '1.5'
    },

    customerAndShipmentDetailsAddress: {
        height: '45'
    },
    pageStyle: {
        height: '100vh',
        width: '100%',
        // border: '1 px solid black'
    },
    logoheaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoheader: {
        margin: '0',
        width: '50%',
    },
    sampleLogoheader: {
        margin: '0',
        width: '20%',
    },
    termsOfSalePaymentDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
    },
    termsOfSaleContainer: {
        borderTop: '1 px solid black',
        borderLeft: '1 px solid black',
        width: '90vw',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
        height: '90vh'
    },
    detailTermsOfSaleContainer: {
        // backgroundColor: 'black'
    },

    detailTermsOfSaleContainerAttributeKey: {
        // textAlign: 'center',
        fontSize: '18'
        // fontWeight:'bold'
    },
    paymentDetailsContainer: {
        borderTop: '1 px solid black',
        width: '80vw',
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        borderLeft: '1px solid black',
        height: '30vh'
    },
    paymentDetails: {
        width: '100%',
    },
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    section: {
        lineHeight: .5,
        fontSize: 13,
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: '90%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 10,
        marginLeft: 30,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    tableCell: {
        flex: 1,
        padding: 5,
        borderRightColor: 'black',
        borderRightWidth: 1,
        textAlign: 'center',
        fontSize: '10'
    },
    headerCell: {
        flex: 1,
        padding: 5,
        borderRightColor: 'black',
        borderRightWidth: 1,
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        fontSize: '10'
    },
    slnoCell: { flex: 1 },
    descriptionCell: {
        fontSize: 9,
        flex: 2.6
    },
    hsnCodeCell: { flex: 2 },
    qtyCell: { flex: 2 },
    rateCell: { flex: 2 },
    totalCell: { flex: 2.3 },
    descriptionTotalCell: {
        flex: 11.85
    },
    gstTotalCell: {
        flex: 52.6,
    },
    gstTotalLabelCell: { flex: 9.7 },
    gstTotalValueCell: { flex: 9.7 },
    gstCellContainer: {
        height: 35,
        flex: 4,
        flexDirection: 'column',
    },
    gstCellContainerValue: {
        height: 21,
        flex: 4,
        flexDirection: 'column',
    },
    gstCell: {
        flexDirection: 'row',
    },
    gstHeading: {
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        padding: 3,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRightColor: 'black',
        borderRightWidth: 1,
    },
    gstSubHeader: {
        backgroundColor: '#f0f0f0',
        flex: 0.77,
        borderRightColor: 'black',
        borderRightWidth: 1,
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    gstSubHeaderValue: {
        borderRightWidth: 1,
        borderRightColor: 'black', // Ensure color is set if needed
        flex: 0.6,
        paddingTop: 5,
        paddingBottom: 5, // Add padding to ensure border touches bottom
        textAlign: 'center',
        fontSize: 10,
    },
    gstSubHeaderLastValue: {
        borderRightWidth: 1,
        borderRightColor: 'black', // Ensure color is set if needed
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5, // Add padding to ensure border touches bottom
        textAlign: 'center',
        fontSize: 10,
    },



    gstSubHeaderLast: {
        backgroundColor: '#f0f0f0',
        borderRightColor: 'black',
        borderRightWidth: 1,
        flex: 1,
        padding: 5,
        textAlign: 'center',
        fontSize: 9,
    },
    customerAndShipmentDetails: {
        width: '90%',  // Adjust width as needed
        height: 200,   // Adjust height as needed
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 30,
        marginTop: 20,
    },
    customerInfoContainer: {
        flex: 1,
        paddingRight: 10,

    },
    shipmentInfoContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    detailSection: {
        fontSize: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    customerDetailsTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: '12',
    },
    sectionHeader: {
        fontSize: 14,
        textAlign: 'right',
        marginBottom: 10,
    },
    separator: {
        width: 1,
        backgroundColor: '#000',
        height: 199,
        marginTop: -10
    },
    billNoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        border: '1px solid black',
        height: '30',
        width: '90%',
        marginTop: '30',
        marginLeft: '30',
        fontSize: 13,
    }
});
export default styles;