import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
const BulletPointInput = () => {
    const [inputText, setInputText] = useState('');
    const [bulletPoints, setBulletPoints] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null)
    const [editText, setEditText] = useState("")
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
    console.log("bulletPoints ", bulletPoints)
    return (
        <div>
            <TextField
                style={{ width: '35vw' }}
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
