import React ,{useState} from 'react'

export default function TextForm() {

    const handleOnChange=(e)=>{
      setUndoStack((prevUndoStack) => [...prevUndoStack, text]);
      setText(e.target.value); 
      setRedoStack([]);
    }

    const handleUp=()=>{
        const newText=text.toUpperCase()
        setText(newText)
    }
    const handleLow=()=>{
        const newText=text.toLowerCase()
        setText(newText)
    }
    const handleCopy = () => {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000); // Reset message after 2 seconds
        })
        .catch(() => {
          setCopySuccess('Failed to copy!');
        });
    };
    function handleSentenceCase(text) {
      if (!text) return ''; // Handle empty or null string
      const newText=text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setText(newText);
    }
    function handlebase64() {
      const bytes = new TextEncoder().encode(text);
      const binaryString = String.fromCharCode(...bytes);
      const base64String = btoa(binaryString);
      setText(base64String);      
    }
    function handleExtractNumbers() {
      const numbers = text.match(/\d+/g);
      setText(numbers ? numbers.join(', ') : '');
    }
    function handleExtractText(text) {
      setText(text.split(' ').join(''));
    }
    const handleClearClick = () => {
      setIsPopupVisible(true); // Show the popup when "Clear" button is clicked
    };
  
    const handleConfirmClear = () => {
        setText(''); // Clear the text if checkbox is checked
      setIsPopupVisible(false); // Hide the popup
    };
  
    const handleCancelClear = () => {
      setIsPopupVisible(false); // Hide the popup without clearing
    };

    const handleUndo = () => {
      if (undoStack.length > 0) {
        // Get the last state from undo stack
        const previousText = undoStack[undoStack.length - 1];
        // Add current text to redo stack before undoing
        setRedoStack((prevRedoStack) => [text, ...prevRedoStack]);
        // Update text and remove the last item from undo stack
        setText(previousText);
        setUndoStack(undoStack.slice(0, -1));
      }
    };
  
    const handleRedo = () => {
      if (redoStack.length > 0) {
        // Get the last state from redo stack
        const nextText = redoStack[0];
        // Add current text to undo stack before redoing
        setUndoStack((prevUndoStack) => [...prevUndoStack, text]);
        // Update text and remove the first item from redo stack
        setText(nextText);
        setRedoStack(redoStack.slice(1));
      }
    };

    const[text,setText]=useState("");
    const [copySuccess, setCopySuccess] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
    const [undoStack, setUndoStack] = useState([]); // Stack for undo history
    const [redoStack, setRedoStack] = useState([]); // Stack for redo history
  
    const popupStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '20px',
      zIndex: 1000,
    };

  return (
    <>
      {isPopupVisible && (
        <div style={popupStyle}>
          <p>Are you sure you want to clear the text?</p>
          <div>
            <button  className="btn btn-success m-2" onClick={handleConfirmClear}>Confirm</button>
            <button className="btn btn-success" onClick={handleCancelClear}>Cancel</button>
          </div>
        </div>
      )}
      {copySuccess && <div className="alert alert-info" role="alert"><p className='m-2'>{copySuccess}</p></div>}
    <div className="mb-3 mt-3 container"> 
    <h1 htmlFor="exampleFormControlTextarea1" className="form-label">Enter The Text To Analyze Below</h1>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleOnChange}></textarea>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleUp}>UpperCase</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleLow}>LowerCase</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleCopy}>Copy</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={() => handleSentenceCase(text)}>SentenceCase</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handlebase64}>Encode to Base64</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleExtractNumbers}>Extract Numbers</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={() =>handleExtractText(text)}>Extract Text</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleClearClick}>Clear Text</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleUndo}>Undo</button>
    <button type="button" className="btn btn-primary m-2 mt-3" onClick={handleRedo}>Redo</button>

    <h3 className='m-2'>Your Text Summary</h3>
    <p className='m-2'>{text.split(" ").length-1} Word(s) {text.length} Charachter(s)</p>
    <p className='m-2'>Average Read Time {text.split().length/100}min</p>
    <h3 className='m-2'>Preview</h3>
    <p className='m-2'>{text ? text:'Nothing Tto Preview!'} </p>
    </div>
    </>
  )
  
}