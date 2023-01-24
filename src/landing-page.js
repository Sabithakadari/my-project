import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import HeaderComp from './headerComp';

class LandingPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            paperTitle: '',
            paperAbstract: ''
        }
    }

    handleTitle = (event) => {
        this.setState({paperTitle: event.target.value});
    }

    handleAbstract = (event) => {
        this.setState({paperAbstract: event.target.value});
    }

    render(){
        return (
            <div>
                <HeaderComp/>
                <hr/>
                <div className="subHeading">
                    <span>Find journals</span>
                    <p>Enter title and abstract of your paper to easily find journals that could be best suited for publishing</p>
                </div>
                <div className="container">
                    <label htmlFor="paperTitle">Paper title</label>
                    <input type="text" placeholder="Enter your paper title here" name="paperTitle" id="paperTitle" onChange={this.handleTitle} required/>

                    <label htmlFor="paperAbstract">Paper abstract</label>
                    <textarea cols="80" rows="5" placeholder="Enter your paper abstract here" name="paperAbstract" id="paperAbstract" onChange={this.handleAbstract}></textarea>
                    <hr/>

                    <Link to="resultsPage" state= {{title:this.state.paperTitle, abstract:this.state.paperAbstract}}>
                        <button type="submit" className="journalsBtn">Find journals &gt;</button>
                    </Link>
                   
                </div>
            </div>
          );
    }
}

export default LandingPage;