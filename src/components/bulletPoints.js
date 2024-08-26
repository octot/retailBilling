import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
const BulletPointInput = ({ inputText, handleInputChange, handleKeyPress, bulletPoints, editingIndex, editText, setEditText, handleKeyDown, handleSaveEdit, handleEditBulletPoint, handleRemoveBulletPoint }) => {
    return (
        <div>
            <TextField
                style={{ width: '25vw' }}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your Terms and Conditions..."
            />
            <div style={{ width: '35vw', marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Preview:</h3>
                <ul>
                    {bulletPoints.map((point, index) => (
                        <li key={index} style={{ display: 'flex' }}>
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onkeydown={(e) => handleKeyDown(e, index)}
                                    onBlur={() => handleSaveEdit(index)}
                                />
                            ) : (
                                <>
                                    {point}
                                    <Button onClick={() => handleEditBulletPoint(index)}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleRemoveBulletPoint(index)}>
                                        remove
                                    </Button>
                                </>
                            )
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BulletPointInput;
