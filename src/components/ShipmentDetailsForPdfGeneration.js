import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from '../componentStyles/pdfReportStyle';

const ShipmentInfo = ({ shipmentDetails, date }) => {
    const shipmentInfo = [
        { label: 'Customer Name', value: shipmentDetails.customerName },
        { label: 'Address', value: shipmentDetails.address },
        { label: 'Customer GST', value: shipmentDetails.customerGst },
        { label: 'Phone Number', value: shipmentDetails.phoneNumber },
        { label: 'Date', value: date }
    ];

    return (
        <View style={styles.shipmentInfoContainer}>
            <Text style={styles.customerDetailsTitle}>Shipment Details</Text>
            {shipmentInfo.map((info, index) => (
                <View style={styles.detailSection} key={index}>
                    <Text style={styles.customerAndShipmentDetailsAttributeKey}>{info.label}:</Text>
                    <Text style={styles.customerAndShipmentDetailsAttributeValue}>{info.value}</Text>
                </View>
            ))}
        </View>
    );
};

export default ShipmentInfo;
