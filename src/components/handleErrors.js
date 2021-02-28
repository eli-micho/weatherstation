const errorMessage = document.querySelector('#error-message-container'); 

const renderError = () => {
    const errorMessage = document.querySelector('#error-message-container'); 
    errorMessage.style.display = 'block'; 
};

const validateInput = (city) => {
    const errorMessage = document.querySelector('#error-message-container'); 
    if(city == ''){
        renderError()
    }else{
        errorMessage.style.display = 'none';
        return false
    }
};

export { validateInput, renderError }