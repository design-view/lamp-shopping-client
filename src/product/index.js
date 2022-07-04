import React,{ useState, useEffect } from 'react';
import "./product.scss";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
async function getProduct(id){
    const response = await axios.get(`http://localhost:3000/product/${id}`);
    return response.data;
}
const ProductPage = () => { 
    //product/1
    const { id } = useParams();
    const [state] = useAsync(()=>getProduct(id),[id]);
    const { loading, data:product, error } = state;
    if(loading) return <div>로딩중입니다.......</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!product) return null;
    return (
        <div className='inner'>
            <div id="image-box">
                <img src={product.imageUrl} alt=""/>
            </div>
            <div id="profile-box">
                <ul>
                    <li>
                        <div>
                            <img src="/images/icons/avatar.png" alt=""/>
                            <span>{product.seller}</span>
                        </div>
                    </li>
                    <li>
                        {product.name}
                    </li>
                    <li>
                        가격 {product.price}원
                    </li>
                    <li>등록일 2022년 6월 2일</li>
                    <li>상세설명 </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductPage;