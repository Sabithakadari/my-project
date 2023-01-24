import React, {useEffect, useState} from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import HeaderComp from './headerComp';
import journals from './data/journals.json'
import Card from 'react-bootstrap/Card';

const ResultsPage = (props) => {

    const location = useLocation();
    const paperTitle = location.state.title;
    const paperAbstract = location.state.abstract;

   const [journalsData, setJournalsData] = useState([]);

   useEffect(() => {

    loadJournalsData();
   },[]);

   const loadJournalsData = async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: paperTitle,abstract: paperAbstract })
    };
    fetch('https://journal-finder-assignment-api.cje.elsevier.systems/search-journals', requestOptions)
        .then(response => response.json())
        .then(data => setJournalsData(data.results));
    };

    return (
        <div>
            <HeaderComp/>
            <div className='resultsMainDiv'>
                <span style={{marginBottom:'20px',marginTop:'20px'}}>Showing {journalsData.length} journals matching your paper</span>
                {journalsData.map(function(element,index,arr){
                    let accRate = Math.round(element.acceptanceRate);
                    let decTime = Math.round(element.timeToFirstDecision);
                    let pubTime = Math.round(element.publicationTime);
                    return(
                        <form action={element.links.submission}>
                            <div style={{backgroundColor:'white',marginBottom:'20px'}}>
                            <Card style={{height:'150px',width:'700px',padding:'15px'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <div style={{float:'left'}}>
                                            <span><b>{element.journal}</b></span>
                                        </div>
                                        <div style={{float:'right'}}>
                                                <Card.Link href={element.links.journal} style={{paddingRight:'10px'}}>Journal website</Card.Link>
                                                <button type="submit" className="journalsBtn">Submit Paper &gt;</button>
                                        </div>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Body style={{marginTop:'40px',display:'flex'}}>
                                    <img height='100px' width='70px' src={element.cover}></img>
                                    <Card.Body style={{display:'inline-block', paddingLeft:'20px',marginBlockStart:'0px'}}>
                                        <Card.Text>ISSN: {element.issn}</Card.Text>
                                        <div style={{display:'flex',flexDirection:'row',marginTop:'20px'}}>
                                            <div className='journalcolData'>
                                                <span>CiteScore</span>
                                                <span>{element.citeScore}</span>
                                            </div>
                                            <div className='journalcolData'>
                                                <span>Impact Factor</span>
                                                <span>{element.impactFactor}</span>
                                            </div>
                                            <div className='journalcolData'>
                                                <span>Acceptance rate</span>
                                                <span>{accRate}%</span>
                                            </div>
                                            <div className='journalcolData'>
                                                <span>Time to 1st decision</span>
                                                <span>{decTime} Weeks</span>
                                            </div>
                                            <div className='journalcolData'>
                                                <span>Time to publication</span>
                                                <span>{pubTime} Weeks</span>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                            </div>
                        </form>
                    )
                })}
                
            </div>
        </div>
    )
}

export default ResultsPage;