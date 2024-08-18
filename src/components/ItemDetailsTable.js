import React from 'react';
import './ItemsTable.css'
const ItemDetailsTable = ({ items }) => {
    if (!items || items.length === 0) {
        return <p>No item details available</p>;
    }
    return (
        <div className="item-details-table-container">
        <table  className="item-details-table">
            <thead>
                <tr>
                    <th>SL No</th>
                    <th>Description</th>
                    <th>HSN Code</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total</th>
                    <th>GST Type</th>
                    <th>CGST Rate</th>
                    <th>SGST Rate</th>
                    <th>IGST Rate</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.slno}</td>
                        <td>{item.description}</td>
                        <td>{item.hsnCode}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td>{item.total}</td>
                        <td>{item.gstType}</td>
                        <td>{item.cgstRate}</td>
                        <td>{item.sgstRate}</td>
                        <td>{item.igstRate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default ItemDetailsTable;
