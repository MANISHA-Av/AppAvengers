import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import List from '@mui/material/List';
import ItemsCarousel from 'react-material-ui-carousel';
import ListSubheader from '@mui/material/ListSubheader';
import image1 from '../image/bookimg1.png';
import bookimg1 from '../image/book1.jpg';
import bookimg2 from '../image/book2.jpg';
import bookimg4 from '../image/book4.jpg';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [bookList, setBookList] = useState();
    useEffect(() => {
        axios.get('http://localhost:5000/fetch-booksDetail')
            .then(response => {
                setBookList(response.data.data)
            });
    }, [])
    return (
        <Container  >
            <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="stretch"

            >
                <Grid item xs={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography color='secondary' variant='h6'>Categories</Typography>

                            <List>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "Databases" }}>
                                    <ListSubheader>Databases</ListSubheader>
                                </Link>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "Java" }}>
                                    <ListSubheader>Java</ListSubheader>
                                </Link>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "Internet" }}>
                                    <ListSubheader>Internet</ListSubheader>
                                </Link>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "Microsoft" }}>
                                    <ListSubheader>Microsoft</ListSubheader>
                                </Link>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "PowerBuilder" }}>
                                    <ListSubheader>Power Builder</ListSubheader>
                                </Link>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "Software Engineering" }}>
                                    <ListSubheader>Software Engineering</ListSubheader>
                                </Link>
                                <Link
                                    style={{ textDecoration: 'none' }}
                                    to={"/book-list"}
                                    state={{ data: bookList, category: "Web Development" }}>
                                    <ListSubheader>Web Development</ListSubheader>
                                </Link>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid style={{ marginTop: '' }}>
                        <ItemsCarousel
                            infiniteLoop={false}
                            gutter={12}
                            activePosition={"center"}
                            alwaysShowChevrons={false}
                            numberOfCards={2}
                            slidesToScroll={2}
                            outsideChevron={true}
                            showSlither={false}
                            firstAndLastGutter={false}
                            rightChevron={">"}
                            leftChevron={"<"}
                        >
                            {Array.from(new Array(3)).map((_, i) => (
                                <div
                                    key={i}
                                    style={{ height: 300, }}>
                                    <img style={{ width: '100%', height: 300 }} src={image1} alt="BigCo Inc. logo" />
                                </div>
                            ))}
                        </ItemsCarousel>
                        <Grid container item xs={12} spacing={2} style={{ marginTop: '2%', width: '100%' }}>
                            <Grid item xs={4}>
                                <img src={bookimg1} alt="k" style={{ height: '50%', width: '60%' }} />
                                <Typography  >Lost Names</Typography>
                                <Typography variant='h6' >$20</Typography>

                            </Grid>
                            <Grid item xs={4}>
                                <img src={bookimg2} alt="k" style={{ height: '50%', width: '60%' }} />
                                <Typography >Yoga</Typography>
                                <Typography variant='h6' >$10</Typography>

                            </Grid>
                            <Grid item xs={4}>
                                <img src={bookimg4} alt="k" style={{ height: '50%', width: '60%' }} />
                                <Typography >Karma</Typography>
                                <Typography variant='h6' >$6</Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
}
