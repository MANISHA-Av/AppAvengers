import { Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const MyOrder = () => {
    const [data, setData] = useState();
    const [books, setBooks] = useState();
    const user = JSON.parse(localStorage.getItem('user'))
    const email = user.data.email

    useEffect(() => {
        //fetched book-details api
        axios.get('http://localhost:5000/fetch-booksDetail')
            .then(response => {
                setBooks(response.data.data)
            });
        const orderData = {
            email: email,
        }
        axios.post('http://localhost:5000/fetch-order', orderData)
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.error(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //search book functionality to check id betwwen the booklist  and the cart data book id
    function searchBook(productId) {
        let book = null
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === productId) {
                book = books[i];
                break;
            }
        }
        return book;
    }

    return (
        <div>
            {(() => {
                if (data && books) {
                    return (
                        <>
                            <TableContainer component={Paper} style={{ paddingLeft: '15%', paddingTop: '1%', paddingRight: '15%', width: '70%' }}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} align='left'>Items description</StyledTableCell>
                                            <StyledTableCell align='right' style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} >Quantity</StyledTableCell>
                                            <StyledTableCell align='right' style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} >Price</StyledTableCell>
                                            <StyledTableCell align='right' style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} >Total Price</StyledTableCell>
                                            <StyledTableCell align='right' style={{ backgroundColor: '#fff', color: "#404040", fontSize: '1.2rem' }} >Ordered Date</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                            {data.map((item) => {
                                return (
                                    item.map((orderItem) => {
                                        console.log(orderItem)
                                        const productId = orderItem.productId;
                                        const book = searchBook(productId);
                                        return (
                                            <>
                                                <TableContainer component={Paper} style={{ paddingLeft: '15%', paddingTop: '1%', paddingRight: '15%', width: '70%' }}>
                                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableBody>
                                                            <StyledTableRow key={book.id}>
                                                                <StyledTableCell align="left" style={{ width: '10%' }} >{book.title}</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ width: '10%' }} ><img src={book.cover} style={{ width: '60%' }} alt={book.title} /></StyledTableCell>
                                                                <StyledTableCell align="left" style={{ width: '10%' }} >{orderItem.count}</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ width: '10%' }} >{book.price}</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ width: '10%' }} >{orderItem.price}</StyledTableCell>
                                                                <StyledTableCell align="left" style={{ width: '10%' }} >{orderItem.date}</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </>
                                        )
                                    })
                                )
                            })}
                        </>
                    )
                }
                else {
                    return (
                        <div>
                            Your have no order.
                        </div>
                    )
                }
            })()}
        </div>
    )
}

export default MyOrder
