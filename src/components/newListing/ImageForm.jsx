import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = ({ data, onUpdate, onPost }) => {
    const [logo, setLogo] = useState(data?.logo || null);
    const [name, setName] = useState(data?.name || '');
    const [date, setDate] = useState(data?.date || '');
    const [investors, setInvestors] = useState([]);
    const [category, setCategory] = useState(data?.category || '');
    const [network, setNetwork] = useState(data?.network || '');
    const [maxSupply, setMaxSupply] = useState(data?.maxSupply || '');

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleImagesChange = (e) => {
        setInvestors(e.target.files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (logo) formData.append('logo', logo);
        formData.append('name', name);
        formData.append('date', date);
        formData.append('category', category);
        formData.append('network', network);
        formData.append('maxSupply', maxSupply);
        for (let i = 0; i < investors.length; i++) {
            formData.append('investors', investors[i]);
        }

        const isUpdate = Boolean(data?.id);
        const apiMethod = isUpdate ? 'put' : 'post';
        const apiUrl = isUpdate ? `https://rankterminal.com/growney/public/index.php/api/new-listing/${data.id}` : 'https://rankterminal.com/growney/public/index.php/api/new-listing';

        // axios[apiMethod](apiUrl, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })
        //   .then(response => {
        //     if (isUpdate) {
        //       onUpdate(response.data);
        //     } else {
        //       onPost(response.data);
        //     }
        //   })
        //   .catch(error => {
        //     console.error(`Error ${isUpdate ? 'updating' : 'posting'} the data:`, error);
        //   });

        try {
            fetch(apiUrl, {
                method: [apiMethod],
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (isUpdate) {
                        onUpdate(data);
                    } else {
                        onPost(data);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        catch (err) {
            
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Logo:</label>
                <input type="file" onChange={handleLogoChange} />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <label>Network:</label>
                <input
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                />
            </div>
            <div>
                <label>Max Supply:</label>
                <input
                    value={maxSupply}
                    onChange={(e) => setMaxSupply(e.target.value)}
                />
            </div>
            <div>
                <label>Investors:</label>
                <input type="file" multiple onChange={handleImagesChange} />
            </div>
            <button type="submit">{data?.id ? 'Update' : 'Create'}</button>
        </form>
    );
}

export default ImageForm;
