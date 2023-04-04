import React from 'react';

function Meme(){
    const [meme, setMeme]=React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const[allMemes,setAllMemes]=React.useState([])

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemes(data.data.memes))
    },[])

    function handleChange(event){
        const {name,value}=event.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
        }))
    }
    
    function getMemeImage(){
        const randomNumber=Math.floor(Math.random()*allMemes.length)
        const url=allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme, 
            randomImage:url
        }))
    }
    return(
        <main>
            <div className="form">
                <div className="input-section">
                    <input 
                        type="text" 
                        className="text-1" 
                        placeholder="Top Text"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        className="text-2" 
                        placeholder="Bottom Text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button className="get-meme" onClick={getMemeImage}><span>Get a new meme image </span><img src="img-gallery.png" className="img-gallery" alt="png"/></button>
                <div className='meme'>
                    <img src={meme.randomImage} className="memeImg" alt="memes"/>
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>  
                </div>
                
            </div>
        </main>
    )
}

export default Meme;